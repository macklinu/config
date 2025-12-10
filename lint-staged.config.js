export default {
  '*.{js,jsx,ts,tsx}': ['oxlint --fix', 'prettier --write'],
  '*.{md,yml,yaml,json}': ['prettier --write'],
}
