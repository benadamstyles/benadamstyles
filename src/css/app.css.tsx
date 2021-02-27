import { css } from '@emotion/react'

import { backgroundColor, linkColor, textColor, heavyTextColor } from './Colors.gen'
import { phone } from './Breakpoints.gen'

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

    color: ${textColor};
  }

  @media (max-width: ${phone}) {
    body {
      font-size: 14px;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${heavyTextColor};
  }

  p {
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
    color: ${linkColor};
    font-weight: bold;

    transition: opacity 0.1s ease-out;

    :hover,
    :focus {
      opacity: 0.6;
    }
  }

  img {
    max-width: 100%;
  }
`
