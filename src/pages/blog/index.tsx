import * as React from 'react'
import { useRouteData } from 'react-static'
import styled from '@emotion/styled'
import { format } from 'date-fns'
import { getHSLColor } from '../../util/hsl'
import { phone, smallPhone } from '../../css/media'

export interface BlogPost {
  readonly slug: string
  readonly title: string
  readonly createdDate?: Date
  readonly publishedDate?: Date
  readonly updatedDate?: Date
}

type SerializedBlogPost = Serialized<BlogPost, Date | undefined>

export interface BlogPostData {
  readonly posts: readonly SerializedBlogPost[]
}

const useBlogPosts = () => useRouteData<BlogPostData>().posts

const List = styled.ol`
  list-style: none;

  padding: 10rem;

  li::before {
    position: absolute;
    border-radius: 50%;
    z-index: -1;
    transform: translate(-35%, -25%);
    content: '';
    width: 10rem;
    height: 10rem;
    background-color: ${getHSLColor()};
    opacity: 0.4;
  }

  li + li {
    margin-top: 7rem;
  }

  @media (max-width: ${phone}) {
    padding: 7rem;
  }

  @media (max-width: ${smallPhone}) {
    padding: 4rem;
  }
`

const Title = styled.h2``

const DateText = styled.p``

const formatDate = (date: string) => format(new Date(date), 'yyyy, MMM do')

const publishedOnly = (
  post: SerializedBlogPost
): post is Require<SerializedBlogPost, 'publishedDate'> =>
  (post.publishedDate && new Date(post.publishedDate) < new Date()) || false

const BlogIndex = () => {
  const publishedPosts = useBlogPosts().filter(publishedOnly)

  return (
    <List>
      {publishedPosts.map(post => (
        <li key={post.publishedDate}>
          <a href={`/blog/${post.slug}`}>
            <Title>{post.title}</Title>
            <DateText>{formatDate(post.publishedDate)}</DateText>
          </a>
        </li>
      ))}
    </List>
  )
}

export default BlogIndex
