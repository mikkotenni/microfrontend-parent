module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  // Shareable ESLint configurations
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
  },
}
