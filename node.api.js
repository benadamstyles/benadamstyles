export default () => ({
  /**
   * @param {import('webpack').Configuration} webpackConfig
   * @returns {import('webpack').Configuration}
   */
  webpack: webpackConfig => {
    if (process.env.DEBUG === 'true' && webpackConfig.optimization) {
      // eslint-disable-next-line fp/no-mutation -- no other way
      webpackConfig.optimization.minimize = false
    }
    return webpackConfig
  },
})
