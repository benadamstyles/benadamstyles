// @flow

import {Component, type Node} from 'react'

type Props = $ReadOnly<{|
  addPoint: (number, number) => void,
  children: ((MouseEvent) => void) => Node,
|}>

export class MouseTracker extends Component<Props> {
  onMouseMove = (event: MouseEvent) =>
    this.props.addPoint(event.pageX, event.pageY)

  render() {
    return this.props.children(this.onMouseMove)
  }
}
