import {
  Component,
  ReactNode,
  MouseEventHandler,
  TouchEventHandler,
} from 'react'

interface Props {
  readonly addPoint: (x: number, y: number) => void
  readonly children: (args: {
    readonly onMouseMove: MouseEventHandler<HTMLDivElement>
    readonly onTouchMove: TouchEventHandler<HTMLDivElement>
  }) => ReactNode
}

export class MouseTracker extends Component<Props> {
  onMouseMove: MouseEventHandler = event =>
    this.props.addPoint(event.clientX, event.clientY)

  onTouchMove: TouchEventHandler = event =>
    event.changedTouches &&
    Array.from(event.changedTouches).forEach(touch =>
      this.props.addPoint(touch.clientX, touch.clientY)
    )

  render() {
    return this.props.children({
      onMouseMove: this.onMouseMove,
      onTouchMove: this.onTouchMove,
    })
  }
}
