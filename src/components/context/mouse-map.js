// @flow

import React, {createContext, Component, type Node} from 'react'
import {List} from 'immutable'
import {getColor} from 'random-material-color'

export type Point = $ReadOnly<{|
  x: number,
  y: number,
  r: number,
|}>

export type Points = List<Point>

export type Session = $ReadOnly<{|
  points: Points,
  color: string,
|}>

type SessionSerialized = $ReadOnly<{|
  points: $ReadOnlyArray<Point>,
  color: string,
|}>

const findLatestPointsIndex = (): number => {
  const loop = latestPointsIndex => {
    if (window.localStorage.getItem(`session-${latestPointsIndex + 1}`)) {
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
    const parsedSession: SessionSerialized = JSON.parse(
      window.localStorage.getItem(`session-${index}`)
    )

    const nextSessions = prevSessions.push({
      color: parsedSession.color,
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
  currentColor: string,
  points: Points,
  prevSessions: List<Session>,
  addPoint: (number, number) => void,
|}

export class MouseMapProvider extends Component<Props, State> {
  latestPointsIndex: number | null = null

  /* eslint-disable react/no-unused-state */
  state = {
    currentColor: getColor(),
    points: List(),
    prevSessions: List(),
    addPoint: (pageX: number, pageY: number) =>
      this.setState(({points}) => ({
        points: points.push({x: pageX, y: pageY, r: Math.random() * 50}),
      })),
  }

  componentDidMount() {
    this.latestPointsIndex = findLatestPointsIndex()

    if (this.latestPointsIndex > -1) {
      this.setState({
        prevSessions: populatePrevPoints(this.latestPointsIndex, List(), 0),
      })
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
              color: this.state.currentColor,
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
