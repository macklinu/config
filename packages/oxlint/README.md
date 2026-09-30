# @macklinu/oxlint-config

> My personal Oxlint configuration

## Installation

```bash
pnpm add -D @macklinu/oxlint-config oxlint
```

## Usage

TypeScript Oxlint config files require Node `24` or Node `>=22.18.0`.

Create an `oxlint.config.ts` file in the root of your project:

```ts
import { compose } from '@macklinu/oxlint-config'

export default compose()
```

## Layers

- `base`: default correctness, security, module, Promise, TypeScript, Unicorn, and OXC guardrails.
- `react`: browser, React, React performance, and JSX accessibility rules.
- `node`: Node globals and `node:` protocol imports.
- `vitest`: Vitest rules without global test APIs.
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

### Effect

For Effect v4, install `effect@rc` alongside the lint tooling:

```bash
pnpm add effect@rc
pnpm add -D @effect/tsgo oxlint oxlint-tsgolint typescript
```

Add `"prepare": "effect-tsgo patch --oxlint --force"` to the consuming project's scripts so installs reapply the patch. The tested CLI requires `--force`, although its help marks the flag deprecated. Use `--no-typescript --oxlint --force` if TypeScript must stay unpatched.

Peer ranges cannot express the cross-package version matrix. Check [@effect/tsgo's supported versions](https://github.com/Effect-TS/tsgo#supported-package-versions) for your installed tools before patching.

```ts
import { compose } from '@macklinu/oxlint-config'
import { effect } from '@macklinu/oxlint-config/effect'

export default compose(effect)
```
