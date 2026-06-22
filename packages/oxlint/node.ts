import { defineConfig } from 'oxlint'

export const node = defineConfig({
  plugins: ['eslint', 'typescript', 'unicorn', 'oxc', 'import', 'promise', 'node'],
  env: {
    node: true,
  },
  rules: {
    'unicorn/prefer-node-protocol': 'error',
  },
})
