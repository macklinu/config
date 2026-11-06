---
'@macklinu/oxlint-config': major
---

- Require Oxlint `^1.91.0` and TypeScript 7.
- Update optional integrations to `@effect/tsgo@^0.67.3` and `oxlint-tsgolint@^7.0.2005`. The presets are tested with Effect `4.1.2` and TypeScript `7.0.2`.
- Report redundant non-null assertions before `??` and redundant `Error.captureStackTrace` calls as errors.
- Reject plain objects used as Effect Schema class instances because they lack the class prototype.
- Check unsafe enum assignments in the Effect layer only. The stock `oxlint-tsgolint` engine does not support this rule yet.
- Keep short-form `Effect.try` and `Effect.tryPromise` constructors allowed.
- Use `effect-tsgo oxlint` to lint Effect projects without patching `node_modules`. Editors that launch stock Oxlint can still use the patch setup.
