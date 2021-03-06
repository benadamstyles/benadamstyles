import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react'
import type { ReactNode } from 'react'
import { List } from 'immutable'
import { debounce } from 'throttle-debounce'
import { array, create, number, object, string } from 'superstruct'
import type { Describe } from 'superstruct'

import { HSLRotation, getHSLColor, DEFAULT_HUE } from '../../util/hsl'

export interface Point {
  readonly x: number
  readonly y: number
  readonly r: number
  readonly c: string
}

export type Points = List<Point>

export interface Session {
  readonly points: Points
  readonly lastColor: string
}

interface SessionSerialized {
  readonly points: Array<Point>
  readonly lastColor: string
}

const validateSessionSerialized: Describe<SessionSerialized> = object({
  points: array(
    object({
      x: number(),
      y: number(),
      r: number(),
      c: string(),
    })
  ),
  lastColor: string(),
})

const retrieveSession = (index: number) =>
  window.localStorage.getItem(`session-${index}`) ?? ''

const storeSession = debounce(
  200,
  (index: number, session: SessionSerialized) =>
    window.localStorage.setItem(`session-${index}`, JSON.stringify(session))
)

const findLatestPointsIndex = (): number => {
  const loop = (latestIndex: number): number => {
    if (retrieveSession(latestIndex + 1)) {
      return loop(latestIndex + 1)
    }
    return latestIndex
  }

  return loop(-1)
}

const populatePrevPoints = (
  latestPointsIndex: number,
  prevSessions: List<Session>,
  index: number
): List<Session> => {
  try {
    const parsedSession = create(
      JSON.parse(retrieveSession(index)),
      validateSessionSerialized
    )

    const nextSessions = prevSessions.push({
      lastColor: parsedSession.lastColor,
      points: List(parsedSession.points),
    })

    if (index === latestPointsIndex) return nextSessions
    return populatePrevPoints(latestPointsIndex, nextSessions, index + 1)
  } catch (e: unknown) {
    console.error(e)
    if (index === latestPointsIndex) return prevSessions
    return populatePrevPoints(latestPointsIndex, prevSessions, index + 1)
  }
}

const getLastHue = (latestPointsIndex: number): string => {
  try {
    return (JSON.parse(retrieveSession(latestPointsIndex)) as SessionSerialized)
      .lastColor
  } catch (e: unknown) {
    console.error(e)
    return getHSLColor()
  }
}

const Context = createContext({
  points: List(),
  prevSessions: List(),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- useful for documentation
  addPoint: (pageX: number, pageY: number) => {
    // no-op
  },
  clearAll: () => {
    // no-op
  },
})

export const useMouseFlow = () => useContext(Context)

interface Props {
  readonly screenWidth: number
  readonly children: ReactNode
}

/* eslint-disable fp/no-mutation -- using refs requires mutation */
export const MouseFlowProvider: React.FC<Props> = props => {
  const hsl = useRef<HSLRotation>()

  const [latestIndex, setLatestIndex] = useState(findLatestPointsIndex)
  const [points, setPoints] = useState<List<Point>>(List())
  const [prevSessions, setPrevSessions] = useState(List())

  const addPoint = useCallback(
    (pageX: number, pageY: number) => {
      if (hsl.current) {
        const nextColor = hsl.current.next()
        setPoints(prevPoints =>
          prevPoints.push({
            x: pageX,
            y: pageY,
            r: Math.random() * Math.min(50, props.screenWidth / 12),
            c: nextColor,
          })
        )
      }
    },
    [props.screenWidth]
  )

  const clearAll = useCallback(() => {
    window.localStorage.clear()
    setLatestIndex(findLatestPointsIndex())
    setPoints(List())
    setPrevSessions(List())
  }, [])

  useEffect(() => {
    if (latestIndex > -1) {
      hsl.current = new HSLRotation(getLastHue(latestIndex))
      setPrevSessions(populatePrevPoints(latestIndex, List(), 0))
    } else if (!hsl.current) {
      hsl.current = new HSLRotation(DEFAULT_HUE)
    }
  }, [latestIndex])

  useEffect(() => {
    const lastPoint = points.last(undefined)
    if (lastPoint) {
      storeSession(latestIndex + 1, {
        points: points.toArray(),
        lastColor: lastPoint.c,
      })
    }
  }, [latestIndex, points])

  const contextValue = useMemo(
    () => ({ addPoint, clearAll, points, prevSessions }),
    [addPoint, clearAll, points, prevSessions]
  )

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  )
}
/* eslint-enable fp/no-mutation */
