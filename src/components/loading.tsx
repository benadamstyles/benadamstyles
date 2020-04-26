import * as React from 'react'
import { css, keyframes } from '@emotion/core'
import { highlightColor } from '../css/colors'

const rotate = keyframes`
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
`

const style = css`
  position: fixed;
  top: 50vh;
  left: 50vw;
  width: 3px;
  height: 100px;

  border-top: 3px solid ${highlightColor};
  filter: blur(0.2px);

  transform: translate(-50%, -50%);
  animation: ${rotate} 1.25s infinite;
  transition: transform 0.5s linear;
`

const Loading = () => <div css={style} role="progressbar" />

export default Loading
