import { defineConfig } from 'oxlint'

export const typeAware = defineConfig({
  options: {
    // This layer requires `oxlint-tsgolint`; it must be enabled from the consumer root config.
    typeAware: true,
  },
  rules: {
    'typescript/no-misused-promises': 'error',
    'typescript/no-unnecessary-condition': 'error',
    'typescript/prefer-nullish-coalescing': 'error',
    'typescript/switch-exhaustiveness-check': 'error',
  },
})
