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

### Type-aware

```bash
pnpm add -D oxlint-tsgolint
```

```ts
import { compose, typeAware } from '@macklinu/oxlint-config'

export default compose(typeAware)
```

### Effect

Install the Effect lint tooling and patch Oxlint:

```bash
pnpm add -D @effect/tsgo oxlint oxlint-tsgolint typescript
pnpm exec effect-tsgo patch --oxlint
```

```ts
import { compose } from '@macklinu/oxlint-config'
import { effect } from '@macklinu/oxlint-config/effect'

export default compose(effect)
```
