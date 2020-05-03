export const nodeSafe = <T>(fallback: T, fn: (...args: unknown[]) => T) => (
  ...args: Parameters<typeof fn>
): T => (typeof window === 'undefined' ? fallback : fn(...args))
