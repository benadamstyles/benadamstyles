import {
  object,
  string,
  optional,
  date,
  array,
  create,
  enums,
} from 'superstruct'

/**
 * @typedef {import('../pages/blog').BlogPost} BlogPost
 */

export const tags = new Set([
  'accessibility',
  'design',
  'front end',
  'react',
  'rescript',
  'resources',
  'typescript',
])

/**
 * @type {import('superstruct').Describe<BlogPost>}
 */
const blogPostStructure = object({
  slug: string(),
  title: string(),
  tags: array(enums(Array.from(tags))),
  createdDate: optional(date()),
  publishedDate: optional(date()),
  updatedDate: optional(date()),
})

/**
 * @type {(data: unknown) => BlogPost}
 */
export const validateBlogPostExports = data => create(data, blogPostStructure)
