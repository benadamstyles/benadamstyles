import * as React from 'react'
import { useRouteData } from 'react-static'
import styled from '@emotion/styled'
import { format } from 'date-fns'
import { getHSLColor } from '../../util/hsl'
import { phone, smallPhone } from '../../css/Breakpoints.gen'
import { textColor } from '../../css/colors'

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

  li {
    a {
      display: block;
      position: relative;
      padding: 5rem 0;

      ::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 1rem;
        z-index: -1;
        width: 10rem;
        height: 10rem;
        border-radius: 50%;

        opacity: 0.4;
        background-color: ${getHSLColor()};

        transition: transform 0.1s ease-in-out;
        transform: translate(-50%, -50%);
      }

      :hover,
      :focus {
        ::before {
          transform: translate(-50%, -50%) scale(1.2);
        }
      }
    }
  }

  padding: 5rem 10rem;

  @media (max-width: ${phone}) {
    padding: 3rem 7rem;
  }

  @media (max-width: ${smallPhone}) {
    padding: 3rem 4rem;
  }
`

const Title = styled.h2({ margin: 0 })

const DateText = styled.p({ color: textColor })

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
