// @flow

export default {
  getSiteData: () => ({
    title: 'Ben Styles',
  }),

  getRoutes: () => [
    {
      path: '/',
      component: 'src/pages/Home',
    },
    {
      is404: true,
      component: 'src/pages/404',
    },
  ],
}
