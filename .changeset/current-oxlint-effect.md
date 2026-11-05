---
'@macklinu/oxlint-config': major
---

Update the tested toolchain to Oxlint 1.91.0, oxlint-tsgolint 7.0.2005, @effect/tsgo 0.67.3, and Effect 4.1.2. Raise the lint integration peer minimums and limit peers to the supported major or minor lines.

Enable the new nullish-coalescing, redundant Error.captureStackTrace, and Effect Schema class object-literal checks. Enable unsafe enum assignment checks only in the Effect layer because the stock oxlint-tsgolint 7.0.2005 engine does not implement the rule. Keep short-form Effect.try and Effect.tryPromise constructors allowed.

Document the Effect lint command that does not patch node_modules, the tested version combination, and the editor-only patching alternative.
