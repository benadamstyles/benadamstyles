export const nodeSafe = <Args extends unknown[], T>(
  fallback: T,
  fn: (...args: Args) => T
) => (...args: Args): T =>
  typeof window === 'undefined' ? fallback : fn(...args)
