import { bigNumberify } from '~/utils/bigNumberify'
import { ethers } from 'ethers'

export function estimateReturn(durationS, supplyRateMantissa, amount) {
  var amount = bigNumberify(amount)
  var secondsPerBlock = bigNumberify(14)
  var numBlocks = bigNumberify(durationS).div(secondsPerBlock)
  var rate = numBlocks.mul(supplyRateMantissa)
  var interest = rate.mul(amount)
  return interest.div(ethers.utils.parseUnits('1', 'szabo'))
}

// 1000000000000000
// 5354554757160
// 1000000000000
