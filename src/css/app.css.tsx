import { css } from '@emotion/core'
import { backgroundColor, textColor, linkColor } from './colors'
import { phone } from './media'

export default css`
  html {
    margin: 0;
    padding: 0;
    background-color: ${backgroundColor};
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  body {
    font-family: 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue',
      Helvetica, Arial, 'Lucida Grande', sans-serif;
    font-weight: 300;
    font-size: 16px;
    margin: 0;
    padding: 0;
  }

  @media (max-width: ${phone}) {
    body {
      font-size: 14px;
    }
  }

  p {
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
    color: ${linkColor};
    font-weight: bold;
  }

  img {
    max-width: 100%;
  }

  nav {
    position: fixed;
    top: 0;
    pointer-events: none;
  }

  nav a {
    color: ${textColor};
    padding: 1rem;
    display: inline-block;
    pointer-events: auto;
  }

  .footer {
    box-sizing: border-box;
    position: fixed;
    top: auto;
    bottom: 0;
    width: 100%;
    padding: 1rem;
    pointer-events: none;
  }

  .footer a {
    pointer-events: auto;
  }

  main,
  .content {
    position: fixed;
    width: 100%;
    height: 100%;
  }
`
