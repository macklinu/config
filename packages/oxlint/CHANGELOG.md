# @macklinu/oxlint-config

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
