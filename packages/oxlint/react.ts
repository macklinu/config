import { defineConfig } from 'oxlint'

export const react = defineConfig({
  plugins: ['eslint', 'typescript', 'unicorn', 'oxc', 'import', 'promise', 'react', 'jsx-a11y'],
  env: {
    // Browser globals live in the React variant, not the base config.
    browser: true,
    serviceworker: true,
  },
  settings: {
    react: {
      version: 'detect',
      linkComponents: [
        { name: 'Link', attribute: 'to' },
        { name: 'NavLink', attribute: 'to' },
      ],
    },
    'jsx-a11y': {
      polymorphicPropName: 'as',
    },
  },
  rules: {
    // Treat accessibility as correctness, not style. These give agents useful UI feedback early.
    'jsx-a11y/alt-text': 'error',
    'jsx-a11y/anchor-has-content': 'error',
    'jsx-a11y/anchor-is-valid': 'error',
    'jsx-a11y/aria-activedescendant-has-tabindex': 'error',
    'jsx-a11y/aria-props': 'error',
    'jsx-a11y/aria-proptypes': 'error',
    'jsx-a11y/aria-role': 'error',
    'jsx-a11y/aria-unsupported-elements': 'error',
    'jsx-a11y/click-events-have-key-events': 'error',
    'jsx-a11y/control-has-associated-label': 'error',
    'jsx-a11y/heading-has-content': 'error',
    'jsx-a11y/html-has-lang': 'error',
    'jsx-a11y/iframe-has-title': 'error',
    'jsx-a11y/img-redundant-alt': 'error',
    'jsx-a11y/interactive-supports-focus': 'error',
    'jsx-a11y/label-has-associated-control': 'error',
    'jsx-a11y/lang': 'error',
    'jsx-a11y/media-has-caption': 'error',
    // Autofocus can be valid in command palettes/dialogs, but it should be an intentional choice.
    'jsx-a11y/no-autofocus': 'warn',
    'jsx-a11y/no-static-element-interactions': 'error',
    'react/button-has-type': 'error',
    // Modern named const components make this less useful, and it creates noise around wrappers.
    'react/display-name': 'off',
    // Dependency fixes can change behavior, so keep this visible without making every case blocking.
    'react/exhaustive-deps': 'warn',
    'react/jsx-boolean-value': ['error', 'never'],
    'react/jsx-curly-brace-presence': [
      'error',
      {
        props: 'never',
        children: 'never',
      },
    ],
    'react/jsx-filename-extension': 'off',
    'react/jsx-fragments': ['error', 'syntax'],
    'react/jsx-key': 'error',
    // React Compiler should handle many identity/memoization concerns; avoid pushing manual `useMemo`.
    'react/jsx-no-constructed-context-values': 'off',
    'react/jsx-no-target-blank': 'error',
    'react/jsx-no-useless-fragment': 'error',
    'react/jsx-pascal-case': 'error',
    // Prop spreading is a normal part of React composition, forms, slots, and wrapper components.
    'react/jsx-props-no-spreading': 'off',
    // TypeScript owns prop typing in these projects.
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'react/rules-of-hooks': 'error',
  },
})
