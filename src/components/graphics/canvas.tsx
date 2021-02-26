import * as React from 'react'
import { Stage, FastLayer, Circle } from 'react-konva'
import { Spring, animated } from 'react-spring/dist/konva'
import type { List } from 'immutable'
import type { Session, Points, Point } from '../context/mouse-flow'
import { cachePointMapper } from '../../util/memo'

const endScale = 2
const endOpacity = 0.4

const start = {
  scale: 1,
  opacity: 0.8,
}

const end = {
  scale: 2,
  opacity: endOpacity,
}

const AnimatedCircleDeOpt: React.FC<Point> = props => (
  <Spring native from={start} to={end}>
    {({ scale, opacity }: { scale: number; opacity: number }) => (
      <animated.Circle
        /* eslint-disable react/prop-types -- bug with rule */
        x={props.x}
        y={props.y}
        radius={props.r}
        fill={props.c}
        /* eslint-enable react/prop-types */
        opacity={opacity}
        scaleX={scale}
        scaleY={scale}
      />
    )}
  </Spring>
)

const AnimatedCircle = React.memo(AnimatedCircleDeOpt, () => true)

interface PrevSessionsProps {
  readonly prevSessions: List<Session>
}

const PrevSessionsDeOpt: React.FC<PrevSessionsProps> = props => (
  <>
    {props.prevSessions.map((session, i) => (
      <FastLayer key={String(i)}>
        {session.points.map(({ x, y, r, c }, j) => (
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

const PrevSessions = React.memo(
  PrevSessionsDeOpt,
  // NOTE: if both prev/next props.prevSessions are populated, don't rerender,
  // because we only want to rerender when initialising or clearing prevSessions
  (prev, next) => prev.prevSessions.size > 0 && next.prevSessions.size > 0
)

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
