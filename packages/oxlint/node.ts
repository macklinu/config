import { defineConfig } from 'oxlint'

export const node = defineConfig({
  plugins: ['eslint', 'typescript', 'unicorn', 'oxc', 'import', 'promise', 'node'],
  env: {
    // Node globals belong only to consumers that explicitly select this layer.
    node: true,
  },
  rules: {
    'unicorn/prefer-node-protocol': 'error',
  },
})
