import { defineConfig } from 'oxlint'

export const base = defineConfig({
  plugins: ['eslint', 'typescript', 'unicorn', 'oxc', 'import', 'promise'],
  categories: {
    // Start from Oxlint's high-signal defaults, then cherry-pick style rules below.
    // Broad style/pedantic/restriction categories get noisy fast and often overlap with Oxfmt.
    correctness: 'error',
    suspicious: 'warn',
    perf: 'warn',
    pedantic: 'off',
    restriction: 'off',
    style: 'off',
    nursery: 'off',
  },
  rules: {
    'array-callback-return': 'error',
    curly: ['error', 'all'],
    'default-case': 'off',
    'default-case-last': 'error',
    // Keep the concise nullish check idiom while requiring strict equality everywhere else.
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    // This matches my preference, but Oxlint does not currently fix it.
    'func-style': 'off',
    // Oxfmt owns import sorting and grouping; Oxlint only handles semantic import issues here.
    'import/consistent-type-specifier-style': 'off',
    'import/exports-last': 'off',
    'import/extensions': 'off',
    'import/first': 'off',
    'import/group-exports': 'off',
    'import/no-anonymous-default-export': 'error',
    'import/no-commonjs': 'error',
    // Import cycles are worth surfacing, but not worth blocking every refactor in existing code.
    'import/no-cycle': ['warn', { ignoreTypes: true }],
    'import/no-default-export': 'off',
    // Separate `import type` statements are preferred for readability and runtime/type clarity.
    'import/no-duplicates': ['error', { preferInline: false }],
    // Path aliases and package boundaries vary too much by project.
    'import/no-relative-parent-imports': 'off',
    'no-alert': 'error',
    'no-array-constructor': 'error',
    'no-async-promise-executor': 'error',
    'no-await-in-loop': 'off',
    'no-console': 'error',
    'no-debugger': 'error',
    'no-duplicate-imports': ['error', { allowSeparateTypeImports: true }],
    'no-else-return': 'error',
    'no-empty': 'error',
    // Empty functions are common enough for callbacks, noops, and tests to allow globally.
    'no-empty-function': 'off',
    'no-fallthrough': 'error',
    'no-implicit-coercion': 'off',
    'no-labels': 'error',
    'no-lone-blocks': 'error',
    'no-magic-numbers': 'off',
    'no-nested-ternary': 'error',
    'no-new-object': 'error',
    'no-new-wrappers': 'error',
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    'no-promise-executor-return': 'error',
    // Modern engines removed the old performance reason to ban `return await`, and it helps try/catch.
    'no-return-await': 'off',
    'no-sequences': 'error',
    'no-throw-literal': 'error',
    'no-unneeded-ternary': 'error',
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: false,
        allowTaggedTemplates: false,
        allowTernary: false,
      },
    ],
    'no-useless-catch': 'error',
    'no-useless-computed-key': 'error',
    'no-useless-concat': 'error',
    'no-useless-constructor': 'error',
    'no-useless-rename': 'error',
    'no-useless-return': 'error',
    'no-var': 'error',
    // `void promise()` is the explicit fire-and-forget marker used by type-aware promise rules.
    'no-void': 'off',
    // Prefer `{ foo }`, but do not force object method shorthand over arrow properties.
    'object-shorthand': ['error', 'properties'],
    'prefer-arrow-callback': 'error',
    'prefer-const': 'error',
    'prefer-destructuring': 'off',
    'prefer-object-spread': 'error',
    'prefer-promise-reject-errors': 'error',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'prefer-template': 'error',
    radix: 'error',
    // Async function shape is often required by framework contracts and test doubles.
    'require-await': 'off',
    'sort-keys': 'off',
    // Use `T[]` for simple arrays and `Array<T | U>` for complex element types.
    'typescript/array-type': ['error', { default: 'array-simple' }],
    'typescript/ban-ts-comment': [
      'error',
      {
        // `@ts-expect-error` self-invalidates when fixed; `@ts-ignore` hides forever.
        'ts-expect-error': 'allow-with-description',
        'ts-ignore': true,
        'ts-nocheck': true,
        'ts-check': false,
        minimumDescriptionLength: 3,
      },
    ],
    'typescript/consistent-indexed-object-style': ['error', 'record'],
    'typescript/consistent-type-assertions': [
      'error',
      {
        // Object literal assertions hide useful excess/missing property checks; prefer annotations or `satisfies`.
        assertionStyle: 'as',
        objectLiteralTypeAssertions: 'never',
      },
    ],
    // Object shapes use `type` for one mental model across aliases, unions, mapped types, and props.
    'typescript/consistent-type-definitions': ['warn', 'type'],
    'typescript/consistent-type-exports': 'warn',
    'typescript/consistent-type-imports': [
      'error',
      {
        // Separate type imports make erased imports obvious to humans and agents.
        prefer: 'type-imports',
        fixStyle: 'separate-type-imports',
      },
    ],
    // Let TypeScript infer local implementation details; require explicitness through API design, not lint noise.
    'typescript/explicit-function-return-type': 'off',
    'typescript/explicit-module-boundary-types': 'off',
    // Type members should mirror the preferred arrow-property runtime style.
    'typescript/method-signature-style': ['error', 'property'],
    'typescript/no-empty-function': 'off',
    'typescript/no-empty-object-type': 'error',
    'typescript/no-explicit-any': 'error',
    'typescript/no-inferrable-types': 'off',
    // Namespaces are legacy organization syntax; `.d.ts` ambient declarations still need them sometimes.
    'typescript/no-namespace': ['error', { allowDefinitionFiles: true }],
    'typescript/no-non-null-assertion': 'error',
    'typescript/no-require-imports': 'error',
    'typescript/no-restricted-types': [
      'error',
      {
        // These wrapper/global types are almost always less precise than the primitive or a real signature.
        types: {
          Object: {
            message: 'Use object, unknown, or a more specific type instead.',
          },
          Function: {
            message: 'Use a specific function signature instead.',
          },
          Boolean: {
            message: 'Use boolean instead.',
            fixWith: 'boolean',
          },
          Number: {
            message: 'Use number instead.',
            fixWith: 'number',
          },
          String: {
            message: 'Use string instead.',
            fixWith: 'string',
          },
          Symbol: {
            message: 'Use symbol instead.',
            fixWith: 'symbol',
          },
        },
      },
    ],
    'typescript/no-useless-constructor': 'error',
    'typescript/prefer-as-const': 'error',
    'typescript/prefer-optional-chain': 'error',
    'unicorn/catch-error-name': ['error', { name: 'error' }],
    'unicorn/error-message': 'error',
    // Naming and file layout conventions are project/framework-specific.
    'unicorn/filename-case': 'off',
    // These are readable enough in moderation; ban the async pitfalls elsewhere instead.
    'unicorn/no-array-for-each': 'off',
    'unicorn/no-array-reduce': 'off',
    // `null` and explicit `undefined` are legitimate API signals in TypeScript/React code.
    'unicorn/no-null': 'off',
    'unicorn/no-useless-undefined': 'off',
    'unicorn/prefer-export-from': 'off',
    'unicorn/prefer-includes': 'error',
    'unicorn/prefer-module': 'error',
    'unicorn/prefer-string-starts-ends-with': 'error',
    'unicorn/prefer-top-level-await': 'error',
  },
})
