# @macklinu/oxlint-config

> My personal Oxlint configuration

## Installation

```bash
pnpm add -D @macklinu/oxlint-config oxlint
```

Install `oxlint-tsgolint` only in projects that use the type-aware config:

```bash
pnpm add -D oxlint-tsgolint
```

## Usage

TypeScript Oxlint config files require a Node version that can execute TypeScript directly. Use Node `24` or Node `>=22.18.0`.

Create an `oxlint.config.ts` file in the root of your project:

```ts
import { defineConfig } from 'oxlint'
import { base } from '@macklinu/oxlint-config'

export default defineConfig({
  extends: [base],
})
```

Compose variants for React, Vitest, Node, or type-aware linting:

```ts
import { defineConfig } from 'oxlint'
import { base, react, typeAware, vitest } from '@macklinu/oxlint-config'

export default defineConfig({
  extends: [base, react, vitest, typeAware],
})
```

The Vitest config intentionally does not enable Vitest globals. Import test APIs explicitly:

```ts
import { expect, test, vi } from 'vitest'
```
