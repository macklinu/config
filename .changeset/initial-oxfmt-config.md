---
'@macklinu/oxfmt-config': major
---

Add the initial Oxfmt configuration for use from `oxfmt.config.ts`.

Use single quotes, including JSX attributes, and omit semicolons. Sort imports, `package.json` fields, and Tailwind CSS classes, and ignore `repos/**`. Keep Oxfmt's default `trailingComma: 'all'` and all other defaults.

Group imports in this order, with blank lines between groups:

1. Side effects, preserving their original order.
2. Node.js built-ins.
3. Packages, including type imports.
4. Internal aliases, subpath imports, and otherwise unclassified imports.
5. Relative imports.

Type imports stay with their source group rather than moving to a separate types-first section. This follows the broad grouping of `simple-import-sort`, not every comparison rule. Oxfmt also recognizes bare built-ins such as `fs`, not only `node:` imports.

### Before

```ts
import { Button } from './button'
import { theme } from '@/theme'
import type { User } from 'user-kit'
import { join } from 'node:path'
import './z-polyfill'
import { loadUser } from 'user-kit'
import { readFile } from 'node:fs/promises'
import { settings } from '../settings'
import './a-reset.css'
import { createApp } from 'app-kit'
import { home } from '.'
```

### After

```ts
import './z-polyfill'
import './a-reset.css'

import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

import { createApp } from 'app-kit'
import type { User } from 'user-kit'
import { loadUser } from 'user-kit'

import { theme } from '@/theme'

import { home } from '.'
import { settings } from '../settings'
import { Button } from './button'
```
