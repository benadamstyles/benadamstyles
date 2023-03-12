import * as React from 'react'
import styled from '@emotion/styled'

import { Main } from '../../components/layout/main'
import { List, mainCssOverride } from '../../components/layout/list'
import Meta from '../../components/Meta.gen'

export interface Experiment {
  readonly slug: string
  readonly title: string
}

const Title = styled.h2({ margin: 0 })

const ExperimentsIndex = () => (
  <Main css={mainCssOverride}>
    <Meta title="Experiments index" />

    <List>
      {[{ slug: 'docsgpt-rescript', title: 'DocsGPT Rescript' }].map(
        experiment => (
          <li key={experiment.slug}>
            <a href={`/experiments/${experiment.slug}`}>
              <Title>{experiment.title}</Title>
            </a>
          </li>
        )
      )}
    </List>
  </Main>
)

export default ExperimentsIndex
