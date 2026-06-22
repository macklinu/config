import { defineConfig } from 'oxlint'

export const typeAware = defineConfig({
  options: {
    typeAware: true,
  },
  rules: {
    'typescript/await-thenable': 'error',
    'typescript/no-floating-promises': 'error',
    'typescript/no-misused-promises': 'warn',
    'typescript/no-unnecessary-condition': 'warn',
    'typescript/prefer-nullish-coalescing': 'error',
    'typescript/switch-exhaustiveness-check': 'error',
  },
})
