import { defineConfig } from 'oxlint'

export const typeAware = defineConfig({
  options: {
    // This layer requires `oxlint-tsgolint`; it must be enabled from the consumer root config.
    typeAware: true,
  },
  rules: {
    'typescript/no-misused-promises': 'error',
    'typescript/no-unnecessary-condition': 'error',
    'typescript/no-unsafe-argument': 'error',
    'typescript/no-unsafe-assignment': 'error',
    'typescript/no-unsafe-call': 'error',
    'typescript/no-unsafe-member-access': 'error',
    'typescript/no-unsafe-return': 'error',
    'typescript/prefer-nullish-coalescing': 'error',
    'typescript/switch-exhaustiveness-check': 'error',
  },
})
