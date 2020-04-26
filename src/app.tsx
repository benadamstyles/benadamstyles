import * as React from 'react'
import { Root, Routes } from 'react-static'
import { css } from '@emotion/core'
import { Sources } from './components/sources'
import { highlightColor } from './css/colors'
import { nodeSafe } from './util/node-safe'
import CSS from './css'
import Loading from './components/loading'

const activeLinkStyle = css`
  color: ${highlightColor};
`

const trimSlashes = (pathname: string) =>
  pathname.trim().replace(/^\//, '').replace(/\/$/, '')

const linkIsActive = nodeSafe(
  (href: string) =>
    typeof window !== 'undefined' &&
    trimSlashes(window.location.pathname) ===
      trimSlashes(new URL(href, window.location.origin).pathname)
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
        <CSS />

        <div className="content">
          <React.Suspense fallback={<Loading />}>
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
