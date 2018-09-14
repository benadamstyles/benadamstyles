// @flow

import React, {Component} from 'react'
import styled from 'react-emotion'

const Button = styled.button`
  position: absolute;
  top: 1rem;
  left: auto;
  right: 1rem;
  border: none;
  background: transparent;
  font-size: 1.8em;

  &:hover {
    opacity: 0.3;
  }
`

type Props = $ReadOnly<{|
  clearAll: () => void,
|}>

export class ClearMouseMap extends Component<Props> {
  shouldComponentUpdate() {
    return false
  }

  render() {
    return (
      <Button type="button" onClick={this.props.clearAll}>
        clear
      </Button>
    )
  }
}
