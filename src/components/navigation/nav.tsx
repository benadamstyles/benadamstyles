import * as React from 'react'
import styled from '@emotion/styled'
import NavLink from './nav-link'

const Nav = styled.nav`
  position: fixed;
  top: 0;
  pointer-events: none;

  a {
    padding: 1rem;
    display: inline-block;
    pointer-events: auto;
  }
`

const NavMenu = () => (
  <Nav>
    <NavLink href="/">Home</NavLink>
    <NavLink href="/blog">Blog</NavLink>
  </Nav>
)

export default NavMenu
