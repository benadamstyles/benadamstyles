import React from 'react'
import styled from '@emotion/styled'

import type { BlogPost } from '../../pages/blog'
import { phone, smallPhone } from '../../css/Breakpoints.gen'
import { hintColor } from '../../css/colors'

const Main = styled.main`
  padding: 5rem;
  margin: 0 auto;
  max-width: calc(70ch + 10rem);

  @media (max-width: ${phone}) {
    padding: 2rem;
  }

  @media (max-width: ${smallPhone}) {
    padding: 2rem 1rem;
  }

  /* NOTE: typography */
  line-height: 1.5;
  font-kerning: normal;
  letter-spacing: 0.03rem;

  p + p {
    margin-top: 1rem;
  }

  nav {
    background-color: ${hintColor};
    padding: 0.2rem;
    margin: 2rem 0;

    ol {
      list-style-type: '–  ';
    }
  }
`

interface PostProps extends Omit<BlogPost, 'slug'> {
  is404: boolean
  children: React.ReactNode
}

const PostWrapper: React.FC<PostProps> = props => (
  <Main>
    <h1>{props.title}</h1>
    {props.children}
  </Main>
)

export default PostWrapper
