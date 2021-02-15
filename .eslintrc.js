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
    project: ['./tsconfig.json', './tsconfig.eslint.json'],
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
        'object-shorthand': 'off',
        'prefer-destructuring': 'off',
        'import/no-mutable-exports': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  ],
}

module.exports = config
