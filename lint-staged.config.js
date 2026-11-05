const config = {
  '*.{js,jsx,ts,tsx}': ['pnpm lint --fix', 'prettier --write'],
  '*.{md,yml,yaml,json}': ['prettier --write'],
}

export default config
