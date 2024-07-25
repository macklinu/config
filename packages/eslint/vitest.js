import vitest from 'eslint-plugin-vitest'

/** @type {import('eslint').Linter.Config[]} */
const config = [
  {
    files: ['**/*.test.{ts,tsx,js,jsx}'],
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.rules,
    },
  },
]

export default config
