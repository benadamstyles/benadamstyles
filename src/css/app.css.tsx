import { css } from '@emotion/core'
import { backgroundColor, linkColor } from './colors'
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
