import { bigNumberify } from '~/utils/bigNumberify'

export function calculateAPR(supplyRateMantissa) {
  const blocksPerYear = bigNumberify(210000)
  return bigNumberify(supplyRateMantissa).mul(blocksPerYear)
}
