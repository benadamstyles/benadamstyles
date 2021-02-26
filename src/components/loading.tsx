import * as React from 'react'
import { css, keyframes } from '@emotion/react'
import { highlightColor } from '../css/colors'

const rotate = keyframes`
  to {
    transform: rotate(360deg);
  }
`

const DURATION = 0.8

const style = css`
  position: fixed;
  width: 10px;
  height: 100px;

  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);

  opacity: 0.5;

  > div {
    position: absolute;
    width: 100%;
    height: 100%;

    animation: ${rotate} ${DURATION}s infinite;

    :nth-of-type(2) {
      animation-delay: ${DURATION * 0.18}s;
    }
    :nth-of-type(3) {
      animation-delay: ${DURATION * 0.36}s;
    }

    > div {
      width: 10px;
      height: 10px;
      background-color: ${highlightColor};
      border-radius: 50%;
    }
  }
`

const Loading = () => (
  <div css={style} role="progressbar">
    <div>
      <div />
    </div>
    <div>
      <div />
    </div>
    <div>
      <div />
    </div>
  </div>
)

export default Loading
