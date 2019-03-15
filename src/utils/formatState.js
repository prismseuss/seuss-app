export function formatState(state) {
  switch (state) {
    case 0:
      return 'Open'
    case 1:
      return 'Locked'
    case 2:
      return 'Complete'
    default:
      console.warn(`Unknown state: ${state}`)
      return 'Unknown'
  }
}
