// @flow

import React, {PureComponent, Component, Fragment} from 'react'
import {Stage, Layer, Circle} from 'react-konva'
import {Spring, animated} from 'react-spring/dist/konva'
import type {List} from 'immutable'
import type {Session, Points, Point} from '../context/mouse-map'

const endScale = 2
const endOpacity = 0.4

const start = {
  scale: 1,
  opacity: 0.8,
}

const end = {
  scale: endScale,
  opacity: endOpacity,
}

class AnimatedCircle extends Component<Point> {
  shouldComponentUpdate() {
    return false
  }

  render() {
    return (
      <Spring native from={start} to={end}>
        {({scale, opacity}) => (
          <animated.Circle
            x={this.props.x}
            y={this.props.y}
            radius={this.props.r}
            fill={this.props.c}
            opacity={opacity}
            scaleX={scale}
            scaleY={scale}
          />
        )}
      </Spring>
    )
  }
}

type PrevSessionsProps = $ReadOnly<{|
  prevSessions: List<Session>,
|}>

class PrevSessions extends Component<PrevSessionsProps> {
  shouldComponentUpdate() {
    return this.props.prevSessions.size === 0
  }

  render() {
    return (
      <Fragment>
        {this.props.prevSessions.map((session, i) => (
          <Layer key={String(i)}>
            {session.points.map(({x, y, r, c}, j) => (
              <Circle
                key={String(j)}
                x={x}
                y={y}
                radius={r}
                fill={c}
                opacity={endOpacity}
                scaleX={endScale}
                scaleY={endScale}
              />
            ))}
          </Layer>
        ))}
      </Fragment>
    )
  }
}

type Props = $ReadOnly<{|
  points: Points,
  prevSessions: List<Session>,
|}>

type State = {|
  window: ?typeof window,
|}

export class Canvas extends PureComponent<Props, State> {
  state = {
    window: null,
  }

  componentDidMount() {
    this.setState({window})
  }

  render() {
    return (
      this.state.window && (
        <Stage width={window.innerWidth} height={window.innerHeight}>
          <PrevSessions prevSessions={this.props.prevSessions} />

          <Layer>
            {this.props.points.map((point, i) => (
              <AnimatedCircle key={String(i)} {...point} />
            ))}
          </Layer>
        </Stage>
      )
    )
  }
}
