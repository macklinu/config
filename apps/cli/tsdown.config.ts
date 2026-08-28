import { defineConfig } from 'tsdown'

export default defineConfig({
  clean: true,
  entry: ['src/index.ts'],
  fixedExtension: false,
  target: 'node22',
  tsconfig: 'tsconfig.build.json',
})
