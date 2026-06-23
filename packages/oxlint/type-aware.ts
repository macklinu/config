import { defineConfig } from 'oxlint'

export const typeAware = defineConfig({
  options: {
    // Kept separate because this requires `oxlint-tsgolint` and TypeScript 7 compatibility.
    typeAware: true,
  },
  rules: {
    'typescript/await-thenable': 'error',
    'typescript/no-floating-promises': 'error',
    // Useful, but React/event-handler patterns can need project-specific tuning.
    'typescript/no-misused-promises': 'warn',
    // Depends on type quality, generated types, and defensive checks, so start as a warning.
    'typescript/no-unnecessary-condition': 'warn',
    'typescript/prefer-nullish-coalescing': 'error',
    'typescript/switch-exhaustiveness-check': 'error',
  },
})
