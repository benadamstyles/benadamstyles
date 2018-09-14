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
    width: 100%;
    position: fixed;
  }

  nav a {
    color: white;
    padding: 1rem;
    display: inline-block;
  }

  .content {
    padding: 1rem;
  }
`

const App = () => (
  <Router>
    <div>
      <nav>
        <Link exact to="/">
          Home
        </Link>
        <Link to="https://medium.com/@benadamstyles">Blog</Link>
      </nav>
      <div>
        <Routes />
      </div>
      <div className="content">
        <Sources />
      </div>
    </div>
  </Router>
)

export default App
