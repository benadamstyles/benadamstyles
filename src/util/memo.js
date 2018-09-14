// @flow

export const cachePointMapper = <O: {}, A, R>(
  fn: (O, A) => R
): ((O, A) => R) => {
  const cache: WeakMap<O, R> = new WeakMap()

  return (key: O, arg: A) => {
    const cached = cache.get(key)

    // flowlint-next-line sketchy-null-mixed:off
    if (cached) {
      return cached
    } else {
      const val = fn(key, arg)
      cache.set(key, val)
      return val
    }
  }
}
