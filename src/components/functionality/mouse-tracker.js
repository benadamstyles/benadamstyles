// @flow

import {Component, type Node} from 'react'

type Props = $ReadOnly<{|
  addPoint: (number, number) => void,
  children: (
    $ReadOnly<{|
      onMouseMove: MouseEvent => void,
      onTouchMove: TouchEvent => void,
    |}>
  ) => Node,
|}>

export class MouseTracker extends Component<Props> {
  onMouseMove = (event: MouseEvent) =>
    this.props.addPoint(event.clientX, event.clientY)

  onTouchMove = (event: TouchEvent) =>
    event.changedTouches &&
    [...event.changedTouches].forEach(touch =>
      this.props.addPoint(touch.clientX, touch.clientY)
    )

  render() {
    return this.props.children({
      onMouseMove: this.onMouseMove,
      onTouchMove: this.onTouchMove,
    })
  }
}
