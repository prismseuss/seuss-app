import { ethers } from 'ethers'

export function displayReturn(interest) {
  return ethers.utils.formatUnits(interest, 'ether')
}
