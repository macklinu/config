import { fixupPluginRules } from '@eslint/compat'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'

/** @type {import('eslint').Linter.Config[]} */
const config = [
  {
    files: ['**/*.test.{ts,tsx,js,jsx}'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.serviceworker,
      },
    },
    plugins: {
      'jsx-a11y': jsxA11y,
      react,
      'react-hooks': fixupPluginRules(reactHooks),
    },
    settings: {
      react: {
        version: 'detect',
        formComponents: ['Form'],
        linkComponents: [
          {
            name: 'Link',
            linkAttribute: 'to',
          },
          {
            name: 'NavLink',
            linkAttribute: 'to',
          },
        ],
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,

      // Taken from @remix-run/eslint-config
      'react/display-name': 'warn',
      'react/forbid-foreign-prop-types': ['warn', { allowInPropTypes: true }],
      'react/jsx-key': 'warn',
      'react/jsx-no-comment-textnodes': 'warn',
      'react/jsx-no-target-blank': 'warn',
      'react/jsx-no-undef': 'error',
      'react/jsx-pascal-case': ['warn', { allowAllCaps: true, ignore: [] }],
      'react/jsx-uses-vars': 'warn',
      'react/jsx-uses-react': 'warn',
      'react/no-danger-with-children': 'warn',
      'react/no-direct-mutation-state': 'warn',
      'react/no-find-dom-node': 'warn',
      'react/no-is-mounted': 'warn',
      'react/no-render-return-value': 'error',
      'react/no-string-refs': 'warn',
      'react/no-typos': 'warn',
      'react/react-in-jsx-scope': 'off',
      'react/require-render-return': 'error',
      'react/style-prop-object': 'warn',

      // Taken from @remix-run/eslint-config
      'jsx-a11y/alt-text': 'warn',
      'jsx-a11y/anchor-has-content': [
        'warn',
        { components: ['Link', 'NavLink'] },
      ],
      'jsx-a11y/anchor-is-valid': [
        'warn',
        { aspects: ['noHref', 'invalidHref'] },
      ],
      'jsx-a11y/aria-activedescendant-has-tabindex': 'warn',
      'jsx-a11y/aria-props': 'warn',
      'jsx-a11y/aria-proptypes': 'warn',
      'jsx-a11y/aria-role': ['warn', { ignoreNonDOM: true }],
      'jsx-a11y/aria-unsupported-elements': 'warn',
      'jsx-a11y/iframe-has-title': 'warn',
      'jsx-a11y/img-redundant-alt': 'warn',
      'jsx-a11y/lang': 'warn',
      'jsx-a11y/no-access-key': 'warn',
      'jsx-a11y/no-redundant-roles': 'warn',
      'jsx-a11y/role-has-required-aria-props': 'warn',
      'jsx-a11y/role-supports-aria-props': 'warn',
    },
  },
]

export default config
