import eslint from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'

import importConfig from './import.js'

const config = tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...importConfig,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  }
)

export default config
