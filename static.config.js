import { join, basename, extname } from 'path'
import { readFile } from 'fs/promises'
import { runInThisContext } from 'vm'

import globby from 'globby'
import mdx from '@mdx-js/mdx'
import remarkSmartypants from '@silvenon/remark-smartypants'
import rehypeSlug from 'rehype-slug'
import rehypeToc from 'rehype-toc'

import { validateBlogPostExports } from './src/util/blog'

/**
 * @typedef {Object} SiteData
 * @property {string} title
 */

/**
 * @param {...string} paths
 */
export const src = (...paths) => join(__dirname, 'src', ...paths)

/**
 * @type {import('react-static').ReactStaticConfig}
 */
const config = {
  // Attempt to fix flaky build failures on Netlify, which provides up to 32 cores.
  maxThreads: 8,

  entry: src('index.tsx'),

  plugins: [
    'react-static-plugin-typescript',
    ['react-static-plugin-source-filesystem', { location: src('pages') }],

    // TODO: Needs upgrade to use latest emotion package names
    // 'react-static-plugin-emotion',

    [
      'react-static-plugin-mdx',
      {
        mdxOptions: {
          remarkPlugins: [[remarkSmartypants, { dashes: 'oldschool' }]],
          rehypePlugins: [rehypeSlug, rehypeToc],
        },
      },
    ],
    'react-static-plugin-sitemap',
  ],

  siteRoot: 'https://www.benadamstyles.com',

  /**
   * @returns {SiteData}
   */
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

          const posts = await Promise.all(
            files.map(async path => {
              const rawMdx = await readFile(path, 'utf-8')
              const mdxModule = await mdx(rawMdx)

              const exports = Object.fromEntries(
                Array.from(
                  mdxModule.matchAll(/^export const (\w+) = ([^\n;]+)/gmu)
                ).map(([, name, value]) => [name, runInThisContext(value)])
              )

              return validateBlogPostExports({
                slug: basename(path, extname(path)),
                ...exports,
              })
            })
          )

          return { posts }
        },
      },
    ]),
}

export default config
