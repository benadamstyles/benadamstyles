declare module 'react-spring/dist/konva'
declare module '@silvenon/remark-smartypants'

declare type Require<T, Keys extends keyof T> = Omit<T, Keys> &
  Required<Pick<T, Keys>>

type ExtractOfType<Base, Condition> = Pick<
  Base,
  {
    [Key in keyof Base]: Base[Key] extends Condition ? Key : never
  }[keyof Base]
>

type ExcludeOfType<Base, Condition> = Pick<
  Base,
  {
    [Key in keyof Base]: Base[Key] extends Condition ? never : Key
  }[keyof Base]
>

declare type Serialized<
  T,
  Serializable,
  Serialization = string
> = ExcludeOfType<T, Serializable> &
  {
    [key in keyof ExtractOfType<T, Serializable>]: Serialization
  }
