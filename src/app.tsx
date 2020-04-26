import * as React from 'react'
import { Root, Routes } from 'react-static'
import { css } from '@emotion/core'
import { Sources } from './components/sources'
import AppStyles from './styles/app.css'
import { highlightColor } from './constants/styles/colors'
import { nodeSafe } from './util/node-safe'

const activeLinkStyle = css`
  color: ${highlightColor};
`

const linkIsActive = nodeSafe(
  (href: string) =>
    typeof window !== 'undefined' && window.location.pathname === href
)

const Link: React.FC<Require<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  'href'
>> = ({ href, children }) => (
  <a css={linkIsActive(href) && activeLinkStyle} href={href}>
    {children}
  </a>
)

class App extends React.Component<{}, { error: Error | null }> {
  state = { error: null }

  static getDerivedStateFromError(error: Error) {
    console.error(error)
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <>
          <p>... an error has occurred!</p>
          <p>{String(this.state.error)}</p>
        </>
      )
    }

    return (
      <Root>
        <AppStyles />

        <div className="content">
          <React.Suspense fallback="loading...">
            <Routes />
          </React.Suspense>
        </div>

        <nav>
          <Link href="/">Home</Link>
          <Link href="/blog">Blog</Link>
        </nav>

        <div className="footer">
          <Sources />
        </div>
      </Root>
    )
  }
}

export default App
