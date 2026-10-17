# @macklinu/oxlint-config

> My personal Oxlint configuration

## Installation

TypeScript `>=7.0.0` is required.

```bash
pnpm add -D @macklinu/oxlint-config oxlint typescript@^7.0.0
```

## Usage

TypeScript Oxlint config files require Node `24` or Node `>=22.18.0`.

Create an `oxlint.config.ts` file in the root of your project:

```ts
import { compose } from '@macklinu/oxlint-config'

export default compose()
```

Run `pnpm exec tsc --noEmit` separately in your project and CI.

## Layers

- `base`: default correctness, security, module, Promise, TypeScript, Unicorn, and OXC guardrails.
- `react`: automatic JSX, browser, React, and JSX accessibility rules.
- `node`: Node globals and `node:` protocol imports.
- `vitest`: Vitest rules without global test APIs.
- `typeAware`: TypeScript type-aware rules. Requires `oxlint-tsgolint`.
- `effect`: optional Effect v4 integration from `@effect/tsgo`.

Use only the layers that match the project:

```ts
import { compose, node, react, vitest } from '@macklinu/oxlint-config'

export default compose(react, vitest, node)
```

### Type-aware

```bash
pnpm add -D oxlint-tsgolint
```

```ts
import { compose, typeAware } from '@macklinu/oxlint-config'

export default compose(typeAware)
```

Your source and `tsconfig` must meet Oxlint's [TypeScript compatibility requirements](https://oxc.rs/docs/guide/usage/linter/type-aware.html#typescript-compatibility).

### Effect

For Effect v4, add the optional lint integration:

```bash
pnpm add -D @effect/tsgo oxlint oxlint-tsgolint
```

Add `"prepare": "effect-tsgo patch --no-typescript --oxlint --force"` to your project's scripts to patch Oxlint without changing your TypeScript compiler. Check [@effect/tsgo's supported versions](https://github.com/Effect-TS/tsgo#supported-package-versions) before patching.

```ts
import { compose } from '@macklinu/oxlint-config'
import { effect } from '@macklinu/oxlint-config/effect'

export default compose(effect)
```

## Array policy

Effect subpath namespace imports and data-first or curried calls are supported. The two Unicorn rules that misidentify these calls are disabled, so native Array callback references and `thisArg` arguments are not checked by those rules.
