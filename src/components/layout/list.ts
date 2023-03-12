import styled from '@emotion/styled'
import { css } from '@emotion/react'

import { phone, smallPhone } from '../../css/Breakpoints.gen'
import { getHSLColor } from '../../util/hsl'

const TAG_COLOR = getHSLColor()

export const mainCssOverride = css`
  max-width: 100%;

  padding: 5rem 10rem;

  @media (max-width: ${phone}) {
    padding: 5rem 7rem;
  }

  @media (max-width: ${smallPhone}) {
    padding: 5rem 3rem;
  }
`

export const List = styled.ol`
  list-style: none;
  padding: 0;

  li {
    a {
      display: block;
      position: relative;
      padding: 5rem 0;

      ::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 1rem;
        z-index: -1;
        width: 10rem;
        height: 10rem;
        border-radius: 50%;

        opacity: 0.4;
        background-color: ${TAG_COLOR};

        transition: transform 0.1s ease-in-out;
        transform: translate(-50%, -50%);
      }

      :hover,
      :focus {
        ::before {
          transform: translate(-50%, -50%) scale(1.2);
        }
      }
    }
  }
`
