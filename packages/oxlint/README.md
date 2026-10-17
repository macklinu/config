# @macklinu/oxlint-config

> My personal Oxlint configuration

## Installation

```bash
pnpm add -D @macklinu/oxlint-config oxlint
```

## Usage

TypeScript Oxlint config files require Node `24` or Node `>=22.18.0`.

The package ships ESM JavaScript and declarations for all seven entrypoints. The root export does not load the optional Effect integration.

Create an `oxlint.config.ts` file in the root of your project:

```ts
import { compose } from '@macklinu/oxlint-config'

export default compose()
```

Run TypeScript typechecking in your project and CI (for example, `pnpm exec tsc --noEmit` with your project `tsconfig.json`). Oxlint's `base` and `typeAware` layers do not run the TypeScript compiler; `oxlint --type-check` is a separate opt-in mode.

## Layers

- `base`: default correctness, security, module, Promise, TypeScript, Unicorn, and OXC guardrails.
- `react`: automatic JSX, browser, React, React performance, and JSX accessibility rules.
- `node`: Node globals and `node:` protocol imports.
- `vitest`: Vitest rules without global test APIs. Assertions inside `it.effect`, `it.effect.each`, and `it.prop` are recognized as test assertions; assertions outside test blocks remain errors.
- `typeAware`: TypeScript type-aware rules. Requires `oxlint-tsgolint`.
- `effect`: optional Effect v4 integration from `@effect/tsgo`.

Use only the layers that match the project:

```ts
import { compose, node, react, vitest } from '@macklinu/oxlint-config'

export default compose(react, vitest, node)
```

`compose` keeps selected layers' environment, settings, and globals at the root. Later layers override earlier ones on the same environment/global key or settings namespace.

### Type-aware

```bash
pnpm add -D oxlint-tsgolint
```

```ts
import { compose, typeAware } from '@macklinu/oxlint-config'

export default compose(typeAware)
```

Typed analysis uses the TS7-based native engine in `oxlint-tsgolint`, not the consumer's installed `typescript` package. You can keep TypeScript 6 for compilation and compiler-API tools. Your source and `tsconfig` must still work with the native engine's [TypeScript 7 compatibility limits](https://oxc.rs/docs/guide/usage/linter/type-aware.html#typescript-compatibility), including removed options such as `baseUrl`. This does not make TS6-only options supported.

### Effect

For Effect v4, keep your existing compatible Effect version and add the optional lint integration:

```bash
pnpm add -D @effect/tsgo oxlint oxlint-tsgolint
```

To patch only the lint engines, add `"prepare": "effect-tsgo patch --no-typescript --oxlint --force"` to your project's scripts. This leaves the TypeScript compiler unchanged. Patching the compiler is a separate opt-in integration that requires a supported native TypeScript 7 package.

Peer ranges cannot express the cross-package version matrix. Check [@effect/tsgo's supported versions](https://github.com/Effect-TS/tsgo#supported-package-versions) for your installed tools before patching.

```ts
import { compose } from '@macklinu/oxlint-config'
import { effect } from '@macklinu/oxlint-config/effect'

export default compose(effect)
```

## Compatibility

| Preset                          | Required tools                                                                 | Effect requirement | Compiler requirement                                                |
| ------------------------------- | ------------------------------------------------------------------------------ | ------------------ | ------------------------------------------------------------------- |
| Root, base, React, Node, Vitest | `oxlint >=1.86.0`                                                              | None               | No compiler package is loaded                                       |
| `typeAware`                     | Oxlint plus `oxlint-tsgolint >=7.0.2003`                                       | None               | TS7-compatible analysis; a TS6 compiler can remain installed        |
| `effect`                        | Oxlint, tsgolint, and `@effect/tsgo >=0.47.0` with compatible patched binaries | `>=4.0.0-0 <5.0.0` | Oxlint-only patching does not require a native TS7 compiler package |

The typed engine, Effect, and Effect integration are optional peers at package level, but are required when you select the corresponding preset. Peer ranges are policy bounds, not proof that every future combination works. Effect patching must also satisfy its version-specific binary matrix.

Packed-consumer verification used Node `24.13.1`, Oxlint `1.86.0`, tsgolint `7.0.2003`, and TypeScript `6.0.3`. All seven exports loaded through Oxlint. TypeScript 6 checked the declarations. Effect rules ran with `@effect/tsgo 0.47.0`, Effect `4.0.0-rc.117`, and an Oxlint-only patch. Package builds use TypeScript `7.0.2`.

Keep legacy compiler-API tools on a compatible compiler resolution. For example, `react-docgen-typescript 2.4.0` cannot load against TypeScript `7.0.2` because that package does not expose `ts.JsxEmit`. Generic typed lint does not require that compiler migration.

### Known upstream limit

Oxlint `1.86.0` exempts imports from `"effect"` in `unicorn/no-array-callback-reference`, but misses namespace imports from `"effect/Option"` and other subpaths. This is an [upstream receiver-recognition gap](https://github.com/oxc-project/oxc/blob/oxlint_v1.86.0/crates/oxc_linter/src/rules/unicorn/no_array_callback_reference.rs), not evidence that `Option.some(value)` is an array callback. Do not rewrite value constructors as callbacks. The preset keeps the rule enabled for real arrays; review affected diagnostics individually.

## Package development

Run `pnpm --filter @macklinu/oxlint-config build` before workspace tests that load this package. Packing and publishing run the same declaration and ESM build automatically.
