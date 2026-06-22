import { defineConfig } from 'oxlint'

export const vitest = defineConfig({
  plugins: ['eslint', 'typescript', 'unicorn', 'oxc', 'import', 'promise', 'vitest'],
  rules: {
    'vitest/consistent-test-it': ['error', { fn: 'test' }],
    'vitest/consistent-vitest-vi': 'error',
    'vitest/expect-expect': 'error',
    'vitest/max-expects': 'off',
    'vitest/no-conditional-expect': 'error',
    'vitest/no-conditional-tests': 'error',
    'vitest/no-disabled-tests': 'warn',
    'vitest/no-focused-tests': 'error',
    'vitest/prefer-expect-assertions': 'off',
    'vitest/valid-expect': 'error',
  },
})
