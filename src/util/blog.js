import { struct } from 'superstruct'

/**
 * @typedef {import('../pages/blog').BlogPost} BlogPost
 */

/**
 * @type {{ [Key in keyof Required<BlogPost>]: string }}
 */
const blogPostStructure = {
  slug: 'string',
  title: 'string',
  createdDate: 'date?',
  publishedDate: 'date?',
  updatedDate: 'date?',
}

/**
 * @type {(data: unknown) => BlogPost}
 */
export const validateBlogPostFrontMatter = struct(blogPostStructure)
