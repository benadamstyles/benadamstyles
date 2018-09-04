// @flow

import React from 'react'
import {Router, Link} from 'react-static'
import {hot} from 'react-hot-loader'
import {injectGlobal} from 'emotion'

// eslint-disable-next-line import/no-unresolved
import Routes from 'react-static-routes'

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  body {
    font-family: 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial,
      'Lucida Grande', sans-serif;
    font-weight: 300;
    font-size: 16px;
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
    background: #108db8;
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
        <Link to="/about">About</Link>
        <Link to="/blog">Blog</Link>
      </nav>
      <div className="content">
        <Routes />
      </div>
    </div>
  </Router>
)

export default hot(module)(App)
