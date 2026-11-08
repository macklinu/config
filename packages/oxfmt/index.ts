import { defineConfig } from 'oxfmt'

export default defineConfig({
  singleQuote: true,
  semi: false,
  sortPackageJson: true,
  sortTailwindcss: true,
  ignorePatterns: ['repos/**'],
})
