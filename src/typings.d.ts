declare module 'react-spring/dist/konva'

declare type Require<T, Keys extends keyof T> = Omit<T, Keys> &
  Required<Pick<T, Keys>>
