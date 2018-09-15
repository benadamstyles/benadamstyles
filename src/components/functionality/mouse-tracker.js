// @flow

import {Component, type Node} from 'react'

type Props = $ReadOnly<{|
  addPoint: (number, number) => void,
  children: ((MouseEvent) => void) => Node,
|}>

export class MouseTracker extends Component<Props> {
  onMouseMove = (event: MouseEvent | TouchEvent) =>
    event instanceof MouseEvent
      ? this.props.addPoint(event.pageX, event.pageY)
      : event.changedTouches &&
        [...event.changedTouches].forEach(touch =>
          this.props.addPoint(touch.pageX, touch.pageY)
        )

  render() {
    return this.props.children(this.onMouseMove)
  }
}
