import * as React from 'react'
import styled from '@emotion/styled'
import { sources } from '../sources'

const Footer = styled.footer({
  boxSizing: 'border-box',
  position: 'fixed',
  top: 'auto',
  bottom: 0,
  width: '100%',
  padding: '1rem',
  pointerEvents: 'none',

  a: {
    pointerEvents: 'auto',
  },
})

export const homeFooter = <Footer>{sources}</Footer>
