# @macklinu/oxlint-config

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
