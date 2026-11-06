# @macklinu/oxlint-config

## 3.0.0

### Major Changes

- ad2ba31: - Require Oxlint `^1.91.0` and TypeScript 7.
  - Update optional integrations to `@effect/tsgo@^0.67.3` and `oxlint-tsgolint@^7.0.2005`. The presets are tested with Effect `4.1.2` and TypeScript `7.0.2`.
  - Report redundant non-null assertions before `??` and redundant `Error.captureStackTrace` calls as errors.
  - Reject plain objects used as Effect Schema class instances because they lack the class prototype.
  - Check unsafe enum assignments in the Effect layer only. The stock `oxlint-tsgolint` engine does not support this rule yet.
  - Keep short-form `Effect.try` and `Effect.tryPromise` constructors allowed.
  - Use `effect-tsgo oxlint` to lint Effect projects without patching `node_modules`. Editors that launch stock Oxlint can still use the patch setup.
- 502d084: Replace the named `effect` export from `@macklinu/oxlint-config/effect` with `recommended` and `strict` presets.

  To preserve the previous rules, update your configuration as follows.

  Before:

  ```ts
  import { compose } from '@macklinu/oxlint-config'
  import { effect } from '@macklinu/oxlint-config/effect'

  export default compose(effect)
  ```

  After:

  ```ts
  import { compose } from '@macklinu/oxlint-config'
  import * as effect from '@macklinu/oxlint-config/effect'

  export default compose(effect.recommended)
  ```

  Use `compose(effect.strict)` to add upstream strict refactoring and style checks as errors. Both presets retain local policies, including allowing unstable APIs.

## 2.2.0

### Minor Changes

- 0b4cce0: Require bracket notation for mutable and readonly array annotations, including complex element types. Use one syntax without changing array mutability.

### Patch Changes

- e51796c: Allow Effect subpath namespace imports and namespaced data-first or curried calls. Disable `unicorn/no-array-callback-reference` and `unicorn/no-array-method-this-argument` because neither rule can distinguish these APIs from native Array methods. This also removes their native Array callback-reference and `thisArg` checks.
- f568bf1: Disable `oxc/no-map-spread`. Per-item copies do not establish a functional defect or a measured performance problem. Keep `oxc/no-accumulating-spread` enabled for growing accumulator copies.

## 2.1.1

### Patch Changes

- 7deb934: Disable `eslint/no-underscore-dangle` to allow provider and framework identifiers.

## 2.1.0

### Minor Changes

- 6dfcbc7: Allow inline React prop allocations and unstable Effect APIs. Require nominal schema class brands with `@effect/tsgo` 0.53.1 or later.

## 2.0.0

### Major Changes

- 2984e66: Require TypeScript `>=7.0.0` as a non-optional peer. Consumers on TypeScript 6 or earlier must upgrade.

  Ship JavaScript and declarations for every preset.

  Support automatic JSX and assertions inside `it.effect`, `it.effect.each`, and `it.prop` without allowing standalone assertions.

## 1.0.0

### Major Changes

- 414d7f9: Make guardrail policies the default, preserve selected layers' root-only Oxlint settings, and test the optional Effect layer with a current compatible toolchain.

## 0.1.0

### Minor Changes

- bbbf14d: Create @macklinu/oxlint-config
