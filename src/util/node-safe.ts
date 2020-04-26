export const nodeSafe = <Args extends unknown[], Return>(
  fn: (...args: Args) => Return
) => (...args: Args) =>
  typeof window === 'undefined' ? undefined : fn(...args)
