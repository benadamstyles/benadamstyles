import { join } from 'path'
import { promises } from 'fs'
// eslint-disable-next-line import/default
import globby from 'globby'
import fm from 'front-matter'

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
    'react-static-plugin-mdx',
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
         * @returns {Promise<import('./src/types/blog').BlogPostData>}
         */
        async getData() {
          const files = await globby(src('pages', 'blog', '!(index.tsx)'))
          const contents = await Promise.all(
            files.map(path => promises.readFile(path, 'utf-8'))
          )

          return {
            posts: contents.map(content => fm(content).attributes),
          }
        },
      },
    ]),
}

export default config
