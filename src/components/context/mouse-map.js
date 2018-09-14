// @flow

import React, {createContext, Component, type Node} from 'react'
import {List} from 'immutable'
import {HSLRotation, type HSL, getHSLColor, DEFAULT_HUE} from '../../util/hsl'

export type Point = $ReadOnly<{|
  x: number,
  y: number,
  r: number,
  c: HSL,
|}>

export type Points = List<Point>

export type Session = $ReadOnly<{|
  points: Points,
  lastColor: HSL,
|}>

type SessionSerialized = $ReadOnly<{|
  points: $ReadOnlyArray<Point>,
  lastColor: HSL,
|}>

const retrieveSession = (index: number) =>
  window.localStorage.getItem(`session-${index}`)

const findLatestPointsIndex = (): number => {
  const loop = latestPointsIndex => {
    if (retrieveSession(latestPointsIndex + 1)) {
      return loop(latestPointsIndex + 1)
    } else {
      return latestPointsIndex
    }
  }

  return loop(-1)
}

const populatePrevPoints = (
  latestPointsIndex: number,
  prevSessions: List<Session>,
  index: number
): List<Session> => {
  try {
    const parsedSession: SessionSerialized = JSON.parse(retrieveSession(index))

    const nextSessions = prevSessions.push({
      lastColor: parsedSession.lastColor,
      points: List(parsedSession.points),
    })

    if (index === latestPointsIndex) {
      return nextSessions
    } else {
      return populatePrevPoints(latestPointsIndex, nextSessions, index + 1)
    }
  } catch (e) {
    console.error(e)
    if (index === latestPointsIndex) {
      return prevSessions
    } else {
      return populatePrevPoints(latestPointsIndex, prevSessions, index + 1)
    }
  }
}

const getLastHue = (latestPointsIndex: number): HSL => {
  try {
    return (JSON.parse(retrieveSession(latestPointsIndex)): SessionSerialized)
      .lastColor
  } catch (e) {
    console.error(e)
    return getHSLColor()
  }
}

const {Consumer, Provider} = createContext({
  currentColor: '',
  points: List(),
  prevSessions: List(),
  // eslint-disable-next-line no-unused-vars
  addPoint: (x: number, y: number) => void 0,
})

export const MouseMap = Consumer

type Props = $ReadOnly<{|
  children: Node,
|}>

type State = {|
  points: Points,
  prevSessions: List<Session>,
  addPoint: (number, number) => void,
|}

export class MouseMapProvider extends Component<Props, State> {
  latestPointsIndex: number | null = null
  hsl: HSLRotation | void

  /* eslint-disable react/no-unused-state */
  state = {
    points: List(),
    prevSessions: List(),
    addPoint: (pageX: number, pageY: number) => {
      const {hsl} = this
      if (hsl) {
        this.setState(({points}) => ({
          points: points.push({
            x: pageX,
            y: pageY,
            r: Math.random() * 50,
            c: hsl.next(),
          }),
        }))
      }
    },
  }

  componentDidMount() {
    const latestPointsIndex = findLatestPointsIndex()
    this.latestPointsIndex = latestPointsIndex

    if (latestPointsIndex > -1) {
      this.hsl = new HSLRotation(getLastHue(latestPointsIndex))
      this.setState({
        prevSessions: populatePrevPoints(latestPointsIndex, List(), 0),
      })
    } else {
      this.hsl = new HSLRotation(DEFAULT_HUE)
    }
  }
  /* eslint-enable react/no-unused-state */

  componentDidUpdate(p: Props, prevState: State) {
    if (
      typeof this.latestPointsIndex === 'number' &&
      prevState.points !== this.state.points
    ) {
      // TODO: debounce
      window.requestIdleCallback(() =>
        window.localStorage.setItem(
          `session-${this.latestPointsIndex + 1}`,
          JSON.stringify(
            ({
              points: this.state.points.toArray(),
              lastColor: this.state.points.last().c,
            }: SessionSerialized)
          )
        )
      )
    }
  }

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>
  }
}
