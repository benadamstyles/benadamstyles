// @flow

import React, {PureComponent, Component, Fragment} from 'react'
import {Stage, FastLayer, Circle} from 'react-konva'
import {Spring, animated} from 'react-spring/dist/konva'
import type {List} from 'immutable'
import type {Session, Points, Point} from '../context/mouse-map'
import {cachePointMapper} from '../../util/memo'

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
  shouldComponentUpdate(nextProps: PrevSessionsProps) {
    return (
      this.props.prevSessions.size === 0 || nextProps.prevSessions.size === 0
    )
  }

  render() {
    return (
      <Fragment>
        {this.props.prevSessions.map((session, i) => (
          <FastLayer key={String(i)}>
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
          </FastLayer>
        ))}
      </Fragment>
    )
  }
}

const pointMapper = cachePointMapper((point, i) => (
  <AnimatedCircle key={String(i)} {...point} />
))

type Props = $ReadOnly<{|
  points: Points,
  prevSessions: List<Session>,
|}>

type State = {|
  width: number,
  height: number,
|}

export class Canvas extends PureComponent<Props, State> {
  state = {
    width: 1024,
    height: 768,
  }

  componentDidMount() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }

  render() {
    return (
      <Stage width={this.state.width} height={this.state.height}>
        <PrevSessions prevSessions={this.props.prevSessions} />
        <FastLayer>{this.props.points.map(pointMapper)}</FastLayer>
      </Stage>
    )
  }
}
