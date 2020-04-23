import * as React from 'react'
import { Root, Routes } from 'react-static'
import { Sources } from './components/sources'
import './css/app.css'

class App extends React.Component<{}, { error: Error | null }> {
  state = { error: null }

  static getDerivedStateFromError(error: Error) {
    console.error(error)
    return { error }
  }

  render() {
    if (this.state.error) {
      return <p>... an error has occurred!</p>
    }

    return (
      <React.Suspense fallback="loading...">
        <Root>
          <div className="content">
            <Routes />
          </div>

          <nav>
            <a href="/">Home</a>
            <a href="https://medium.com/@benadamstyles">Blog</a>
          </nav>

          <div className="footer">
            <Sources />
          </div>
        </Root>
      </React.Suspense>
    )
  }
}

export default App
