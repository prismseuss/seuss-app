import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { allTransactionsQuery } from 'apollo-link-ethereum-mutations-ethersjs'
import { DepositButton } from '~/components/DepositButton'
import { getSystemInfo } from '~/utils/getSystemInfo'
import { getMetamaskPermissions } from '~/web3/getMetamaskPermissions'
import MetaMaskLogoOutlines from '~/assets/images/metamask-logo-fill5.svg'

export const ConnectWalletButton = graphql(allTransactionsQuery)(
  class _ConnectWalletButton extends Component {
    state = {}

    handleMetaMaskClick = async (e) => {
      this.setState({
        isAuthorizing: true
      })
      await getMetamaskPermissions()

      // refresh systemInfo object
      const systemInfo = await getSystemInfo()
      this.setState({
        systemInfo,
        isAuthorizing: false
      })
    }

    async componentDidMount () {
      const systemInfo = await getSystemInfo()
      this.setState({
        systemInfo
      })
    }

    render () {
      const showDepositButton = (this.state.systemInfo && this.state.systemInfo.hasWeb3Permission)

      // default:
      let content = (
        <button
          className='button is-info'
          onClick={this.handleMetaMaskClick}
        >
          <MetaMaskLogoOutlines /> Connect MetaMask
        </button>
      )

      // is authorizing:
      if (this.state.isAuthorizing) {
        content = (
          <span>Waiting on authorization to access your wallet ...</span>
        )
      }

      // can deposit:
      if (showDepositButton) {
        content = <DepositButton systemInfo={this.state.systemInfo} />
      }

      return content
    }
  }
)
