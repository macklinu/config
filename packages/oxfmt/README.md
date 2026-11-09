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

- Use single quotes, including JSX attributes.
- Omit semicolons.
- Use Oxfmt's default `trailingComma: 'all'`.
- Sort imports into side effects, Node.js built-ins, packages, internal aliases, and relative imports.
- Sort `package.json` fields using Oxfmt's default order.
- Sort Tailwind CSS classes.
- Ignore `repos/**`, relative to your `oxfmt.config.ts`.

All other options use Oxfmt defaults. Tailwind sorting uses Oxfmt's default Tailwind setup; see [Oxfmt's sorting documentation](https://oxc.rs/docs/guide/usage/formatter/sorting#sort-tailwind-css-classes) for project-specific Tailwind configuration.

## Import sorting

Separate import groups with blank lines and sort case-insensitively within each group. Preserve the relative order of side-effect imports, including CSS imports. Type imports stay in their source group rather than a separate types-first group.

The grouping follows `simple-import-sort` broadly, but uses Oxfmt's module classification and comparison rules. Node.js built-ins include both `node:` and bare imports such as `fs`.

Internal aliases use Oxfmt's default prefixes: `~/`, `@/`, and `#`. Unclassified imports share the internal group; parent, sibling, and index imports share the relative group.
