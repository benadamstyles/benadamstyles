/**
 * @type {import('eslint').Linter.Config}
 */
const config = {
  extends: [
    '@benadamstyles/eslint-config/react',
    '@benadamstyles/eslint-config/typescript',
  ],

  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },

  env: {
    node: true,
  },

  overrides: [
    {
      files: 'src/**/*',
      env: {
        browser: true,
        node: false,
      },
    },
  ],
}

module.exports = config
