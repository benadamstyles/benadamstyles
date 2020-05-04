import { useState, useEffect } from 'react'
import { debounce } from 'throttle-debounce'

export const useScreenSize = () => {
  const [width, setWidth] = useState(320)
  const [height, setHeight] = useState(640)

  useEffect(() => {
    const update = debounce(50, true, () => {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
    })

    window.addEventListener('resize', update)
    window.addEventListener('orientationchange', update)

    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('orientationchange', update)
    }
  }, [])

  return { width, height }
}

export const useOnHydrate = <T>(fn: () => T) => {
  const [value, setValue] = useState<T>()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setValue(fn()), [])
  return value
}
