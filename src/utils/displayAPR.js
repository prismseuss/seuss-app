import { ethers } from 'ethers'

export function displayAPR(apr) {
  var percentage = parseFloat(ethers.utils.formatUnits(apr, 'finney'))

  return Math.round(100 * percentage) / 100
}
