import * as React from 'react'
import { Root, Routes } from 'react-static'
import { MDXProvider } from '@mdx-js/react'

import CSS from './css/CSS.gen'
import Catch from './components/catch'
import Loading from './components/loading'
import wrapper from './components/mdx/post-wrapper'
import blockquote from './components/mdx/blockquote'
import Nav from './components/navigation/nav'

const components = { wrapper, blockquote }

const loading = <Loading />

const App = () => (
  <Catch>
    <MDXProvider components={components}>
      <Root>
        <CSS />

        <React.Suspense fallback={loading}>
          <Routes />
        </React.Suspense>

        <Nav />
      </Root>
    </MDXProvider>
  </Catch>
)

export default App
