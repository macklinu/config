# @macklinu/config

> A monorepo containing configuration packages for TypeScript projects

See the individual packages for more information:

- [@macklinu/oxlint-config](./packages/oxlint)
- ~~[@macklinu/eslint-config](./packages/eslint)~~ deprecated in favor of [Oxlint](https://oxc.rs/docs/guide/usage/linter.html)
- [@macklinu/prettier-config](./packages/prettier)

## Development

Use Node 26, as specified in `.nvmrc`.

Run `pnpm install` to install dependencies and Lefthook's Git hooks. The prepare script
resets Git's `core.hooksPath` so existing Husky installations use Lefthook.

Before each commit, Lefthook runs Oxlint fixes on staged JavaScript and TypeScript
files, then formats supported staged files with Prettier. It stages the fixes and
preserves unstaged changes in partially staged files.
