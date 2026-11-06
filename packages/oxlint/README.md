# @macklinu/oxlint-config

My Oxlint presets for TypeScript projects.

## Setup

Requires Oxlint 1.91+, TypeScript 7, and Node 22.18+ (22.x) or 24+.

```sh
pnpm add -D @macklinu/oxlint-config oxlint@^1.91.0 typescript@^7.0.0
```

Create `oxlint.config.ts` and select the layers you need:

```ts
import { compose, node, vitest } from '@macklinu/oxlint-config'

export default compose(node, vitest)
```

`compose()` always includes the base guardrails. Optional layers:

- `node`: Node globals and `node:` imports.
- `react`: browser globals, React, and accessibility rules.
- `vitest`: Vitest rules with explicit imports, not globals.
- `typeAware`: type-aware rules. Install `oxlint-tsgolint` and follow [Oxlint's TypeScript requirements](https://oxc.rs/docs/guide/usage/linter/type-aware.html#typescript-compatibility).
- `effect.recommended` and `effect.strict`: Effect v4 rules, imported separately below.

Run `pnpm exec oxlint` and `pnpm exec tsc --noEmit` separately.

## Effect

Install this tested combination, or check [supported versions](https://github.com/Effect-TS/tsgo#supported-package-versions) before upgrading the tools together:

```sh
pnpm add -D --save-exact @effect/tsgo@0.67.3 oxlint@1.91.0 oxlint-tsgolint@7.0.2005
```

Tested with `effect@4.1.2` and `typescript@7.0.2`. Keep Effect as an application dependency.

```ts
import { compose } from '@macklinu/oxlint-config'
import * as effect from '@macklinu/oxlint-config/effect'

export default compose(effect.recommended)
```

Choose one Effect preset:

- `effect.recommended` enables correctness rules as errors and requires schema class brands, deterministic service keys, and class-based services.
- `effect.strict` includes `recommended` and adds upstream strict refactoring and style checks as errors.

Set your lint script to `effect-tsgo oxlint`. The Effect layer enables type-aware mode; the wrapper runs patched tools without modifying `node_modules`. Editors that require stock Oxlint can use the [patch setup](https://github.com/Effect-TS/tsgo/blob/main/docs/README.md) instead.

## Policy notes

- Unsafe enum assignment checks require the Effect-patched engine. The stock `oxlint-tsgolint@7.0.2005` engine crashes on that rule.
- Base correctness and suspicious categories also enable matching Effect rules. Unstable APIs and short-form `Effect.try` and `Effect.tryPromise` constructors remain allowed.
- Unicorn's `no-array-callback-reference` and `no-array-method-this-argument` rules are disabled to allow Effect namespace calls.
