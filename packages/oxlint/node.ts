import { defineConfig } from 'oxlint'

export const node = defineConfig({
  plugins: ['eslint', 'typescript', 'unicorn', 'oxc', 'import', 'promise', 'node'],
  env: {
    // Node globals are environment-specific and should not leak into browser/react configs.
    node: true,
  },
  rules: {
    // Prefer explicit built-in imports and avoid ambiguity with userland packages.
    'unicorn/prefer-node-protocol': 'error',
  },
})
