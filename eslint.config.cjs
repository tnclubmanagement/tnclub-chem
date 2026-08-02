module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint','react'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  env: { browser: true, es2022: true, node: true },
  rules: {},
  settings: { react: { version: 'detect' } },
};
