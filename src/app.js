// @flow

import React from 'react'
import {Router, Link} from 'react-static'
import {injectGlobal} from 'emotion'
/* eslint-disable import/no-unresolved */
// $FlowIgnore
import Routes from 'react-static-routes'
/* eslint-enable import/no-unresolved */
import {Sources} from './components/sources'
import {backgroundColor} from './constants/styles/colors'
import {phone} from './constants/styles/media'

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  html {
    margin: 0;
    padding: 0;
    background-color: ${backgroundColor};
  }

  body {
    font-family: 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial,
      'Lucida Grande', sans-serif;
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
    color: #108db8;
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
    color: white;
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

  .content {
    position: fixed;
  }
`

const App = () => (
  <Router>
    <div>
      <div className="content">
        <Routes />
      </div>

      <nav>
        <Link exact to="/">
          Home
        </Link>
        <Link to="https://medium.com/@benadamstyles">Blog</Link>
      </nav>

      <div className="footer">
        <Sources />
      </div>
    </div>
  </Router>
)

export default App
