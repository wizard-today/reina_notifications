export const safe = async (p: Promise<unknown> | (() => void | Promise<unknown>)) => {
  try {
    if (typeof p === 'function') {
      await p()
    } else {
      await p
    }
  } catch (error) {
    console.error(error)
  }
}
