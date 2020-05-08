import * as React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './app'

type ModuleWithHot = NodeModule & { hot?: { accept: Function } }

// Export your top level component as JSX (for static rendering)
export default App

// Render your app
if (typeof document !== 'undefined') {
  const target = document.getElementById('root')

  const renderMethod = target?.hasChildNodes()
    ? ReactDOM.hydrate
    : ReactDOM.render

  const render = (Comp: React.ComponentType) => {
    renderMethod(
      <AppContainer>
        <Comp />
      </AppContainer>,
      target
    )
  }

  // Render!
  render(App)

  // Hot Module Replacement
  const mod = module as ModuleWithHot
  if (mod.hot) {
    mod.hot.accept('./app', () => render(require('./app').default))
  }
}
