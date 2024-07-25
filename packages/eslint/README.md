# @macklinu/eslint-config

> My personal ESLint configuration

## Installation

```bash
pnpm add -D @macklinu/eslint-config eslint
```

## Usage

Use the new ESLint v9 flat configuration format and create a `eslint.config.js` file in the root of your project:

```js
import config from '@macklinu/eslint-config'

export default [...config]
```

If you are using React and Vitest, you can add those configurations as well:

```js
import config from '@macklinu/eslint-config'
import react from '@macklinu/eslint-config/react'
import vitest from '@macklinu/eslint-config/vitest'

export default [...config, ...react, ...vitest]
```

### VSCode

I recommend enabling auto-fix on save by adding the following to your VSCode settings:

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll": "explicit"
  }
}
```
