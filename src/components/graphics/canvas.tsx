import * as React from 'react'
import { Stage, FastLayer, Circle } from 'react-konva'
import { Spring, animated } from 'react-spring/dist/konva'
import { List } from 'immutable'
import { Session, Points, Point } from '../context/mouse-map'
import { cachePointMapper } from '../../util/memo'

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

class AnimatedCircle extends React.Component<Point> {
  shouldComponentUpdate() {
    return false
  }

  render() {
    return (
      <Spring native from={start} to={end}>
        {({ scale, opacity }: { scale: number; opacity: number }) => (
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

interface PrevSessionsProps {
  readonly prevSessions: List<Session>
}

class PrevSessions extends React.Component<PrevSessionsProps> {
  shouldComponentUpdate(nextProps: PrevSessionsProps) {
    return (
      this.props.prevSessions.size === 0 || nextProps.prevSessions.size === 0
    )
  }

  render() {
    return (
      <>
        {this.props.prevSessions.map((session, i) => (
          <FastLayer key={String(i)}>
            {session?.points.map(({ x, y, r, c }, j) => (
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
      </>
    )
  }
}

const pointMapper = cachePointMapper((point, i) => (
  <AnimatedCircle key={String(i)} {...point} />
))

interface Props {
  readonly points: Points
  readonly prevSessions: List<Session>
  readonly width: number
  readonly height: number
}

export const Canvas: React.FC<Props> = props => (
  <Stage width={props.width} height={props.height}>
    <PrevSessions prevSessions={props.prevSessions} />
    <FastLayer>{props.points.map(pointMapper)}</FastLayer>
  </Stage>
)
