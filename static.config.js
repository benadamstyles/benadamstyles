import { join } from 'path'

const getSrcPath = (...paths) => join(__dirname, 'src', ...paths)

export default {
  entry: getSrcPath('index.tsx'),

  plugins: [
    ['react-static-plugin-typescript', { typeCheck: false }],
    [
      'react-static-plugin-source-filesystem',
      { location: getSrcPath('pages') },
    ],
    'react-static-plugin-emotion',
    'react-static-plugin-sitemap',
  ],

  siteRoot: 'https://www.benadamstyles.com',

  getSiteData: () => ({
    title: 'Ben Styles',
  }),
}
