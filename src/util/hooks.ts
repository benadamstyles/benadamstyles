import { useState, useEffect } from 'react'

export const useOnHydrate = <T>(fn: () => T) => {
  const [value, setValue] = useState<T>()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setValue(fn()), [])
  return value
}
