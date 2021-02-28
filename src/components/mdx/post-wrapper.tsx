import React from 'react'

import type { BlogPost } from '../../pages/blog'
import { Main } from '../layout/main'
import Meta from '../Meta.gen'

interface PostProps extends Omit<BlogPost, 'slug'> {
  is404: boolean
  children: React.ReactNode
}

const PostWrapper: React.FC<PostProps> = props => (
  <Main>
    <Meta
      title={props.title}
      blogPostData={{
        publishedDate: props.publishedDate,
      }}
    />

    <h1>{props.title}</h1>

    {props.children}
  </Main>
)

export default PostWrapper
