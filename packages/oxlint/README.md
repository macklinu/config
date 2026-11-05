# @macklinu/oxlint-config

> My personal Oxlint configuration

## Installation

TypeScript `>=7.0.0` is required.

```bash
pnpm add -D @macklinu/oxlint-config oxlint typescript@^7.0.0
```

The current tested toolchain is:

| Package           | Tested version |
| ----------------- | -------------- |
| `oxlint`          | `1.91.0`       |
| `oxlint-tsgolint` | `7.0.2005`     |
| `@effect/tsgo`    | `0.67.3`       |
| `effect`          | `4.1.2`        |
| `typescript`      | `7.0.2`        |

Peer ranges describe supported version lines, not every compatible combination. For the optional Effect layer, use the tested combination below or check [@effect/tsgo's supported versions](https://github.com/Effect-TS/tsgo#supported-package-versions) before updating the lint tools together.

## Usage

TypeScript Oxlint config files require Node `>=22.18.0` on the Node 22 line, or Node `>=24.0.0`.

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

`typescript/no-unsafe-enum-assignment` is disabled in the base layer because the stock `oxlint-tsgolint@7.0.2005` engine does not implement it and panics if it is explicitly enabled. The Effect layer enables it with the patched engine shipped by `@effect/tsgo@0.67.3`.

### Effect

For Effect v4, install the tested lint integration:

```bash
pnpm add -D --save-exact @effect/tsgo@0.67.3 oxlint@1.91.0 oxlint-tsgolint@7.0.2005
```

The integration is tested with `effect@4.1.2`. Keep `effect` as an application dependency.

Use the Effect wrapper in your project's scripts:

```json
{
  "scripts": {
    "lint": "effect-tsgo oxlint",
    "typecheck": "tsc --noEmit"
  }
}
```

The wrapper runs the installed Oxlint CLI with the Effect-patched native tools without modifying `node_modules`. The Effect layer enables type-aware mode.

```ts
import { compose } from '@macklinu/oxlint-config'
import { effect } from '@macklinu/oxlint-config/effect'

export default compose(effect)
```

If your editor must launch stock Oxlint, use `effect-tsgo patch --no-typescript --oxlint` in your existing `prepare` script instead. Preserve other prepare commands. Patching modifies `node_modules` and is not suitable for shared or read-only package stores. Oxlint config type augmentation is available only through patching.

The base correctness and suspicious categories also enable matching Effect rules beyond the imported correctness preset. Short-form `Effect.try` and `Effect.tryPromise` constructors remain allowed; projects can enable `effecttsgo/effect-try-without-catch` to require custom error mapping. Schema class object literals are errors because they lack the class prototype.

## Array policy

Effect subpath namespace imports and data-first or curried calls are supported. The two Unicorn rules that misidentify these calls are disabled, so native Array callback references and `thisArg` arguments are not checked by those rules.
