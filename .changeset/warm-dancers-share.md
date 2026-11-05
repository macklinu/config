---
'@macklinu/oxlint-config': major
---

Replace the named `effect` export from `@macklinu/oxlint-config/effect` with `recommended` and `strict` presets.

To preserve the previous rules, update your configuration as follows.

Before:

```ts
import { compose } from '@macklinu/oxlint-config'
import { effect } from '@macklinu/oxlint-config/effect'

export default compose(effect)
```

After:

```ts
import { compose } from '@macklinu/oxlint-config'
import * as effect from '@macklinu/oxlint-config/effect'

export default compose(effect.recommended)
```

Use `compose(effect.strict)` to add upstream strict refactoring and style checks as errors. Both presets retain local policies, including allowing unstable APIs.
