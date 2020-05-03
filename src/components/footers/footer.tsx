import * as React from 'react'
import styled from '@emotion/styled'
import { Sources } from '../sources'

const Footer = styled.footer`
  box-sizing: border-box;
  position: fixed;
  top: auto;
  bottom: 0;
  width: 100%;
  padding: 1rem;
  pointer-events: none;

  a {
    pointer-events: auto;
  }
`

const HomeFooter = () => (
  <Footer>
    <Sources />
  </Footer>
)

export default HomeFooter
