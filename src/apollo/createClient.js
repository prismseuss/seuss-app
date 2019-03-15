import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { EthereumLink } from 'apollo-link-ethereum'
import { EthersResolver } from 'apollo-link-ethereum-resolver-ethersjs'
import { abiMapping } from './abiMapping'
import { merge } from 'lodash'
import { web3Resolvers } from './resolvers/web3Resolvers'
import { mutations } from './resolvers/mutations'
import { subscribeAndRefetch } from '~/apollo/subscribeAndRefetch'
import { ethers } from 'ethers'

/**
 * Configures and returns the Apollo client using all of it's mutations,
 * resolvers and contract addresses
 *
 * @returns {Object}
 */
export const createClient = function (provider, defaultFromBlock) {
  window.provider = provider
  window.ethers = ethers

  const ethersResolver = new EthersResolver({
    abiMapping,
    provider,
    defaultFromBlock
  })
  const ethereumLink = new EthereumLink(ethersResolver)

  const cache = new InMemoryCache()

  cache.writeData({
    data: {
      transactions: []
    }
  })

  const resolvers = merge(
    {},
    web3Resolvers,
    mutations
  )

  const client = new ApolloClient({
    cache,
    resolvers,
    link: ethereumLink
  })

  subscribeAndRefetch(client)
  window.client = client

  return client
}
