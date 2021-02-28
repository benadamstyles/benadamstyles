import React, { Suspense } from 'react'
import { Root, Routes } from 'react-static'
import { MDXProvider } from '@mdx-js/react'

import CSS from './css/CSS.gen'
import Meta from './components/Meta.gen'
import Catch from './components/catch'
import Loading from './components/loading'
import wrapper from './components/mdx/post-wrapper'
import blockquote from './components/mdx/blockquote'
import code, { Inline } from './components/mdx/Code.gen'
import Nav from './components/navigation/nav'

const components = { wrapper, blockquote, code, inlineCode: Inline.make }

const loading = <Loading />

const App = () => (
  <Catch>
    <Suspense fallback={null}>
      <Meta />
    </Suspense>

    <MDXProvider components={components}>
      <Root>
        <CSS />

        <Suspense fallback={loading}>
          <Routes />
        </Suspense>

        <Nav />
      </Root>
    </MDXProvider>
  </Catch>
)

export default App
