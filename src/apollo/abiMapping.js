/**
 * Registers contract addresses (coming in via Truffle artifacts)
 * specific to this DApp and stores them in the abiMapping object.
 */

import { AbiMapping } from 'apollo-link-ethereum'
import SeussAbi from './abi/SeussAbi'
import Seuss from '#/Seuss.json'

export const abiMapping = new AbiMapping()

window.abiMapping = abiMapping

function addTruffleArtifact (name, abi, truffleJsonArtifact) {
  abiMapping.addAbi(name, abi)
  Object.keys(truffleJsonArtifact.networks).forEach(networkId => {
    abiMapping.addAddress(name, parseInt(networkId), truffleJsonArtifact.networks[networkId].address)
  })
}

addTruffleArtifact('Seuss', SeussAbi, Seuss)
