---
'@macklinu/oxlint-config': patch
---

Ship compiled ESM and declarations for every preset, and build before packing or publishing. Remove the compiler peer requirement so consumers can keep TypeScript 6 while typed lint uses its native TS7-based engine.

Use automatic JSX without a React-scope error, and recognize assertions inside `it.effect`, `it.effect.each`, and `it.prop` without permitting standalone assertions elsewhere.
