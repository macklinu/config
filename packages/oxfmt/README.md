# @macklinu/oxfmt-config

My [Oxfmt](https://oxc.rs/docs/guide/usage/formatter) configuration for TypeScript projects.

## Setup

Requires Oxfmt 0.77 and Node 22.18+ (22.x) or 24+ to load TypeScript configuration files.

```sh
pnpm add -D @macklinu/oxfmt-config oxfmt@^0.77.0
```

Create `oxfmt.config.ts` in your project root:

```ts
import config from '@macklinu/oxfmt-config'

export default config
```

Run `pnpm exec oxfmt --write .` to format your project, or `pnpm exec oxfmt --check .` to check formatting.

## Style

- Use single quotes.
- Omit semicolons.
- Sort `package.json` fields using Oxfmt's default order.
- Sort Tailwind CSS classes.
- Ignore `repos/**`, relative to your `oxfmt.config.ts`.

All other options use Oxfmt defaults, including import order and JSX double quotes. Tailwind sorting uses Oxfmt's default Tailwind setup; see [Oxfmt's sorting documentation](https://oxc.rs/docs/guide/usage/formatter/sorting#sort-tailwind-css-classes) for project-specific Tailwind configuration.
