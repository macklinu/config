---
'@macklinu/oxlint-config': major
---

Replace the named `effect` export from `@macklinu/oxlint-config/effect` with `recommended` and `strict` presets.

To preserve the previous rules, replace `import { effect } from '@macklinu/oxlint-config/effect'` with `import * as effect from '@macklinu/oxlint-config/effect'` and use `compose(effect.recommended)` instead of `compose(effect)`.

Use `compose(effect.strict)` to add upstream strict refactoring and style checks as errors. Both presets retain local policies, including allowing unstable APIs.
