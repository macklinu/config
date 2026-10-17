import { defineConfig } from 'oxlint'

export const vitest = defineConfig({
  plugins: ['eslint', 'typescript', 'unicorn', 'oxc', 'import', 'promise', 'vitest'],
  // Do not enable Vitest globals; tests should import `test`, `expect`, and `vi` explicitly.
  rules: {
    'vitest/consistent-test-it': ['error', { fn: 'test' }],
    'vitest/consistent-vitest-vi': 'error',
    'vitest/max-expects': 'off',
    'vitest/no-standalone-expect': [
      'error',
      { additionalTestBlockFunctions: ['it.effect', 'it.effect.each', 'it.prop'] },
    ],
    // Assertion-count rules tend to make tests noisier without much confidence gain.
    'vitest/prefer-expect-assertions': 'off',
  },
})
