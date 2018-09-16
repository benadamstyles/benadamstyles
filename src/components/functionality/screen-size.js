// @flow

import {Component, type Node} from 'react'
import {debounce} from 'throttle-debounce'

type State = {|
  width: number,
  height: number,
|}

type Props = $ReadOnly<{|
  children: State => Node,
|}>

export class ScreenSize extends Component<Props, State> {
  state = {
    width: 320,
    height: 640,
  }

  update = debounce(50, true, () =>
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  )

  componentDidMount() {
    this.update()
    window.addEventListener('resize', this.update)
    window.addEventListener('orientationchange', this.update)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.update)
    window.removeEventListener('orientationchange', this.update)
  }

  render() {
    return this.props.children(this.state)
  }
}
