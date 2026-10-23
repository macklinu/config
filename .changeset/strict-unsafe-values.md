---
'@macklinu/oxlint-config': minor
---

Reject unsafe `any` flows in the type-aware layer, including parsed JSON returned through a typed API without validation. Consumers should narrow `unknown` values before using them.

Allow mergeable interfaces in declaration files without relaxing the type-alias preference for ordinary source. Keep Effect correctness and service checks unchanged.
