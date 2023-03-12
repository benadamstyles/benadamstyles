import * as React from 'react'
import styled from '@emotion/styled'
import NavLink from './nav-link'

const Nav = styled.nav({
  position: 'absolute',
  top: 0,
  pointerEvents: 'none',

  a: {
    padding: '1rem',
    display: 'inline-block',
    pointerEvents: 'auto',
  },
})

const NavMenu = () => (
  <Nav>
    <NavLink href="/">Home</NavLink>
    <NavLink href="/blog">Blog</NavLink>
    <NavLink href="/experiments">Experiments</NavLink>
  </Nav>
)

export default NavMenu
