import { defineConfig } from 'oxlint'

export const vitest = defineConfig({
  plugins: ['eslint', 'typescript', 'unicorn', 'oxc', 'import', 'promise', 'vitest'],
  // Do not enable Vitest globals; tests should import `test`, `expect`, and `vi` explicitly.
  rules: {
    'vitest/consistent-test-it': ['error', { fn: 'test' }],
    'vitest/consistent-vitest-vi': 'error',
    'vitest/expect-expect': 'error',
    'vitest/max-expects': 'off',
    'vitest/no-conditional-expect': 'error',
    'vitest/no-conditional-tests': 'error',
    // Skips are sometimes intentional during migrations/flaky-test work, but should stay visible.
    'vitest/no-disabled-tests': 'warn',
    'vitest/no-focused-tests': 'error',
    // Assertion-count rules tend to make tests noisier without much confidence gain.
    'vitest/prefer-expect-assertions': 'off',
    'vitest/valid-expect': 'error',
  },
})
