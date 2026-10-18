---
'@macklinu/oxlint-config': patch
---

Allow Effect subpath namespace imports and namespaced data-first or curried calls. Disable `unicorn/no-array-callback-reference` and `unicorn/no-array-method-this-argument` because neither rule can distinguish these APIs from native Array methods. This also removes their native Array callback-reference and `thisArg` checks.
