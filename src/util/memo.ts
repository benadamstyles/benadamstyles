import { Point } from '../components/context/mouse-map'

export const cachePointMapper = <Obj extends Point, Arg, Return>(
  fn: (obj: Obj, arg: Arg) => Return
): ((obj: Obj, arg: Arg) => Return) => {
  const cache: WeakMap<Obj, Return> = new WeakMap()

  return (key: Obj, arg: Arg) => {
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
