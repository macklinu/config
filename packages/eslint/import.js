import simpleImportSort from 'eslint-plugin-simple-import-sort'

/** @type {import('eslint').Linter.Config[]} */
const config = [
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
]

export default config
