import { defineConfig, type OxlintConfig } from 'oxlint'

export const base = defineConfig({
  plugins: ['eslint', 'typescript', 'unicorn', 'oxc', 'import', 'promise'],
  categories: {
    // Guardrails cover code that is wrong or likely wrong.
    // Perf is optimization; pedantic/style are style; restriction is project policy; nursery is unstable.
    correctness: 'error',
    suspicious: 'error',
    perf: 'off',
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
    'import/no-cycle': ['error', { ignoreTypes: true }],
    'import/no-default-export': 'off',
    // Separate `import type` statements are preferred for readability and runtime/type clarity.
    'import/no-duplicates': ['error', { preferInline: false }],
    // Namespace imports are valid for module-shaped APIs; do not ban a sound import form.
    'import/no-namespace': 'off',
    'oxc/no-accumulating-spread': 'error',
    'oxc/no-map-spread': 'error',
    'promise/catch-or-return': 'error',
    'promise/no-nesting': 'error',
    'promise/no-return-in-finally': 'error',
    'promise/no-return-wrap': 'error',
    'promise/param-names': 'error',
    'promise/prefer-await-to-callbacks': 'error',
    // Path aliases and package boundaries vary too much by project.
    'import/no-relative-parent-imports': 'off',
    'no-alert': 'error',
    'no-array-constructor': 'error',
    'no-await-in-loop': 'off',
    // Agent output must use an injected logger or an explicit application boundary.
    'no-console': 'error',
    'no-new-func': 'error',
    'no-script-url': 'error',
    'no-self-compare': 'error',
    'no-template-curly-in-string': 'error',
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
    'no-new-wrappers': 'error',
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    'no-promise-executor-return': 'error',
    'no-sequences': 'error',
    'no-throw-literal': 'error',
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: false,
        allowTaggedTemplates: false,
        allowTernary: false,
      },
    ],
    'no-useless-computed-key': 'error',
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
    'typescript/consistent-type-definitions': ['error', 'type'],
    'typescript/consistent-type-exports': 'error',
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
    'typescript/no-unsafe-function-type': 'error',
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
    'typescript/prefer-optional-chain': 'error',
    'unicorn/catch-error-name': ['error', { name: 'error' }],
    'unicorn/no-array-callback-reference': 'error',
    'unicorn/no-array-method-this-argument': 'error',
    'unicorn/no-new-buffer': 'error',
    'unicorn/no-unreadable-array-destructuring': 'error',
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
    'unicorn/prefer-string-raw': 'off',
    // Top-level await changes module evaluation and deployment behavior; require a project decision.
    'unicorn/prefer-top-level-await': 'off',
  },
})

export type ConfigLayer = Omit<OxlintConfig, 'extends' | 'options' | 'plugins' | 'settings'> & {
  extends?: ConfigLayer[]
  options?: {
    typeAware?: true
  }
  plugins?: Array<NonNullable<OxlintConfig['plugins']>[number] | 'effecttsgo'>
  // Oxlint documents `linkAttribute`, but the v1.70 generic component type exposes only `attribute`.
  settings?: Omit<NonNullable<OxlintConfig['settings']>, 'react'> & {
    react?: {
      linkComponents?: Array<string | { name: string; linkAttribute: string | string[] }>
      [key: string]: unknown
    }
  }
}

export function compose(...layers: ConfigLayer[]): ConfigLayer {
  const configs: ConfigLayer[] = [base, ...layers]
  const plugins = new Set<NonNullable<ConfigLayer['plugins']>[number]>()
  let typeAware = false

  for (const config of configs) {
    if (config.options?.typeAware === true) {
      typeAware = true
    }

    for (const plugin of config.plugins ?? []) {
      plugins.add(plugin)
    }
  }

  // Oxlint replaces `plugins` in extended configs, so the root declares their union.
  const composed: ConfigLayer = {
    extends: configs,
    plugins: [...plugins],
  }

  if (typeAware) {
    composed.options = { typeAware: true }
  }

  return composed
}
