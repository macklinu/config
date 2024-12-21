import vitest from '@vitest/eslint-plugin'

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
