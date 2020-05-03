import * as React from 'react'
import { Root, Routes } from 'react-static'
import { MDXProvider } from '@mdx-js/react'
import { highlightColor } from './css/colors'
import CSS from './css'
import Loading from './components/loading'
import wrapper from './components/mdx/wrapper'
import { useOnHydrate } from './util/hooks'
import { linkIsActive } from './util/path'

const Link: React.FC<Require<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  'href'
>> = props => {
  const color = useOnHydrate(() =>
    linkIsActive(props.href) ? highlightColor : 'currentColor'
  )

  return <a {...props} style={{ color }} />
}

const components = { wrapper }

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
      <MDXProvider components={components}>
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
        </Root>
      </MDXProvider>
    )
  }
}

export default App
