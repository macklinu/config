import eslint from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'

import importConfig from './import.js'

const config = tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      // I don't really care.
      '@typescript-eslint/no-namespace': 'off',

      // This allows variables prefixed with `_` to be ignored by this rule.
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],

      // I don't really care.
      'prefer-const': 'off',
      '@typescript-eslint/prefer-const': 'off',
    },
  },
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
