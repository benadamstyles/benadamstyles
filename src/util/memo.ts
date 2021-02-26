import type { Point } from '../components/context/mouse-flow'

export const cachePointMapper = <Obj extends Point, Arg, Return>(
  fn: (obj: Obj, arg: Arg) => Return
): ((obj: Obj, arg: Arg) => Return) => {
  const cache: WeakMap<Obj, Return> = new WeakMap()

  return (key: Obj, arg: Arg) => {
    const cached = cache.get(key)

    if (cached) return cached

    const val = fn(key, arg)
    cache.set(key, val)
    return val
  }
}
