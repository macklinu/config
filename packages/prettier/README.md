# @macklinu/prettier-config

> My personal [Prettier](https://prettier.io) configuration

## Installation

```bash
pnpm install -D @macklinu/prettier-config prettier
```

## Usage

This package requires ES Modules, so make sure to add `"type": "module"` to your `package.json`.

To use the configuration, add a `.prettierrc` file with the following content:

```json
"@macklinu/prettier-config"
```

If you need to override specific options or add `plugins`, use a `prettier.config.js` file instead.

```js
// prettier.config.js
import config from '@macklinu/prettier-config'

export default {
  ...config,
  plugins: ['prettier-plugin-tailwindcss'],
}
```
