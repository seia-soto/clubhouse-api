module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'standard'
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {
  },
  overrides: [{
    files: ['*.d.ts'],
    extends: [
      'standard-with-typescript'
    ],
    parserOptions: {
      project: 'tsconfig.json'
    }
  }]
}
