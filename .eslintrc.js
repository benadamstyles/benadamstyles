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
    es2020: true,
  },

  overrides: [
    {
      files: 'src/**/*',
      env: {
        browser: true,
        node: false,
      },
    },

    {
      files: '*.bs.js',
      rules: {
        'no-var': 'off',
        'import/no-mutable-exports': 'off',
      },
    },
  ],
}

module.exports = config
