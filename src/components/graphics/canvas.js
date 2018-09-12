// @flow

import React, {PureComponent, Component, Fragment} from 'react'
import {Stage, Layer, Circle} from 'react-konva'
import {Spring} from 'react-spring'
import type {List} from 'immutable'
import type {Session, Points} from '../context/mouse-map'

const endScale = 2

const start = {scale: 1}
const end = {scale: endScale}

type AnimatedCircleProps = $ReadOnly<{|
  x: number,
  y: number,
  r: number,
  color: string,
|}>

class AnimatedCircle extends Component<AnimatedCircleProps> {
  shouldComponentUpdate() {
    return false
  }

  render() {
    return (
      <Spring from={start} to={end}>
        {({scale}) => (
          <Circle
            x={this.props.x}
            y={this.props.y}
            radius={this.props.r}
            fill={this.props.color}
            opacity={0.5}
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
            {session.points.map(({x, y, r}, j) => (
              <Circle
                key={String(j)}
                x={x}
                y={y}
                radius={r}
                fill={session.color}
                opacity={0.5}
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
  currentColor: string,
  prevSessions: List<Session>,
|}>

export class Canvas extends PureComponent<Props> {
  render() {
    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <PrevSessions prevSessions={this.props.prevSessions} />

        <Layer>
          {this.props.points.map(({x, y, r}, i) => (
            <AnimatedCircle
              key={String(i)}
              color={this.props.currentColor}
              x={x}
              y={y}
              r={r}
            />
          ))}
        </Layer>
      </Stage>
    )
  }
}
