import { join, basename, extname } from 'path'
import { promises } from 'fs'
// eslint-disable-next-line import/default
import globby from 'globby'
import fm from 'front-matter'
import remarkFrontMatter from 'remark-frontmatter'
import remarkSmartypants from '@silvenon/remark-smartypants'
import { ValidateBlogPostFrontMatter } from './src/util/blog'

/**
 * @param {...string} paths
 */
export const src = (...paths) => join(__dirname, 'src', ...paths)

/**
 * @type {import('react-static').ReactStaticConfig}
 */
const config = {
  entry: src('index.tsx'),

  plugins: [
    'react-static-plugin-typescript',
    ['react-static-plugin-source-filesystem', { location: src('pages') }],
    [
      'react-static-plugin-mdx',
      {
        mdxOptions: {
          remarkPlugins: [
            remarkFrontMatter,
            [remarkSmartypants, { dashes: 'oldschool' }],
          ],
        },
      },
    ],
    'react-static-plugin-emotion',
    'react-static-plugin-sitemap',
  ],

  siteRoot: 'https://www.benadamstyles.com',

  getSiteData: () => ({
    title: 'Ben Styles',
  }),

  getRoutes: () =>
    Promise.resolve([
      {
        path: 'blog',
        template: src('pages', 'blog', 'index.tsx'),

        /**
         * @returns {Promise<{ posts: import('./src/pages/blog').BlogPost[] }>}
         */
        async getData() {
          const files = await globby(src('pages', 'blog', '!(index.tsx)'))

          const contents = await Promise.all(
            files.map(async path => ({
              path,
              content: await promises.readFile(path, 'utf-8'),
            }))
          )

          const posts = contents
            .map(({ path, content }) => ({
              ...fm(content).attributes,
              slug: basename(path, extname(path)),
            }))
            .map(ValidateBlogPostFrontMatter)

          return { posts }
        },
      },
    ]),
}

export default config
