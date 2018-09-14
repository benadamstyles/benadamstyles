// @flow

import React from 'react'
import ReactDOM from 'react-dom'
import {AppContainer} from 'react-hot-loader'

// Your top level component
import App from './app'

// Export your top level component as JSX (for static rendering)
export default App

// Render your app
if (typeof document !== 'undefined') {
  // $FlowFixMe
  const renderMethod = module.hot
    ? ReactDOM.render
    : ReactDOM.hydrate || ReactDOM.render
  const render = Comp => {
    renderMethod(
      <AppContainer>
        <Comp />
      </AppContainer>,
      // $FlowFixMe
      document.getElementById('root')
    )
  }

  // Render!
  render(App)
  // Hot Module Replacement
  // $FlowFixMe
  if (module.hot) {
    // $FlowFixMe
    module.hot.accept('./app', () => render(require('./app').default))
  }
}
