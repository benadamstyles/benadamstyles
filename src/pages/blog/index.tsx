import * as React from 'react'
import { useRouteData } from 'react-static'
import styled from '@emotion/styled'
import { format } from 'date-fns'
import { transparentize } from 'polished'

import { getHSLColor } from '../../util/hsl'
import { textColor } from '../../css/Colors.gen'
import { tags } from '../../util/blog'
import { Main } from '../../components/layout/main'
import { List, mainCssOverride } from '../../components/layout/list'
import Meta from '../../components/Meta.gen'

export interface BlogPost {
  readonly slug: string
  readonly title: string
  readonly tags: string[]
  readonly createdDate?: Date
  readonly publishedDate?: Date
  readonly updatedDate?: Date
}

type SerializedBlogPost = Serialized<BlogPost, Date | undefined>

export interface BlogPostData {
  readonly posts: readonly SerializedBlogPost[]
}

const TAG_COLOR = getHSLColor()

const useBlogPosts = () => useRouteData<BlogPostData>().posts

const Title = styled.h2({ margin: 0 })

const DateText = styled.p({ color: textColor })

const formatDate = (date: string) => format(new Date(date), 'yyyy, MMM do')

type PublishedSerializedBlogPost = Require<SerializedBlogPost, 'publishedDate'>

const publishedOnly = (
  post: SerializedBlogPost
): post is PublishedSerializedBlogPost =>
  (post.publishedDate && new Date(post.publishedDate) < new Date()) || false

const sortByDateDescending = (
  a: PublishedSerializedBlogPost,
  b: PublishedSerializedBlogPost
) => new Date(b.publishedDate).valueOf() - new Date(a.publishedDate).valueOf()

const TagList = styled.ul`
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  margin: -0.3rem;
`

const TagListItem = styled.li`
  list-style: none;
  margin: 0.3rem;
`

const HiddenCheckbox = styled.input`
  width: 1px;
  height: 1px;
  position: absolute;
  opacity: 0;
`

const Label = styled.label`
  display: block;
  user-select: none;
  border: 1px solid ${TAG_COLOR};
  padding: 0.2rem 0.6rem;

  :hover {
    background-color: ${transparentize(0.8, TAG_COLOR)};
  }

  input:checked + & {
    background-color: ${TAG_COLOR};
  }
`

const TagFilter: React.FC<{
  selectedTags: typeof tags
  setSelectedTags: (selectedTags: typeof tags) => void
}> = ({ selectedTags, setSelectedTags }) => (
  <TagList>
    {Array.from(tags).map(tag => (
      <TagListItem key={tag}>
        <HiddenCheckbox
          id={`tag-${tag}`}
          type="checkbox"
          checked={selectedTags.has(tag)}
          onChange={({ currentTarget: { checked } }) => {
            const clone = new Set(selectedTags)
            clone[checked ? 'add' : 'delete'](tag)
            setSelectedTags(clone)
          }}
        />

        <Label htmlFor={`tag-${tag}`}>{tag}</Label>
      </TagListItem>
    ))}
  </TagList>
)

const filterByTags = (selectedTags: typeof tags) => (
  post: PublishedSerializedBlogPost
) => post.tags.some(tag => selectedTags.has(tag))

const keepAll = () => true

const BlogIndex = () => {
  const [selectedTags, setSelectedTags] = React.useState(
    (): Set<string> => new Set()
  )

  return (
    <Main css={mainCssOverride}>
      <Meta title="Blog index" />

      <TagFilter
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
      />

      <List>
        {useBlogPosts()
          .filter(publishedOnly)
          .filter(selectedTags.size > 0 ? filterByTags(selectedTags) : keepAll)
          .sort(sortByDateDescending)
          .map(post => (
            <li key={post.slug}>
              <a href={`/blog/${post.slug}`}>
                <Title>{post.title}</Title>
                <DateText>{formatDate(post.publishedDate)}</DateText>
              </a>
            </li>
          ))}
      </List>
    </Main>
  )
}

export default BlogIndex
