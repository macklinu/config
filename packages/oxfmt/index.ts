import { defineConfig } from 'oxfmt'

export default defineConfig({
  singleQuote: true,
  semi: false,
  sortImports: {
    groups: [
      ['side_effect', 'side_effect_style'],
      'builtin',
      'external',
      ['internal', 'subpath', 'unknown'],
      ['parent', 'sibling', 'index'],
    ],
    newlinesBetween: true,
    ignoreCase: true,
    sortSideEffects: false,
  },
  sortPackageJson: true,
  sortTailwindcss: true,
  ignorePatterns: ['repos/**'],
})
