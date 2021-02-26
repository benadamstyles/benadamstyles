import * as React from 'react'
import { Global, css } from '@emotion/react'

export const NavFixed = () => (
  <Global
    styles={css`
      nav {
        position: fixed !important;
      }
    `}
  />
)
