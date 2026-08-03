module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2022,
  },
  extends: ['eslint:recommended', 'prettier'],
  ignorePatterns: ['dist', '.next', 'node_modules', '*.js'],
};
