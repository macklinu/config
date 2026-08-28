# Agent guidance

## Keep early work small

For a scaffold, bootstrap, placeholder, or initial integration, implement the smallest local path that demonstrates the requested interface. Keep new packages private unless the user explicitly asks to publish or release them.

Do not infer release work from a package scaffold. Changesets, publish configuration, package-license packaging, release metadata, artifact CI checks, and registry smoke tests belong to the release request or the first complete feature request.

Treat examples of possible command interfaces as options, not commitments. Select the smallest interface consistent with the user's latest direction. Do not add compatibility commands, command trees, or future integrations without a stated need.

## CLI packages

Use `tsdown` for Node CLI builds. Keep build options in `tsdown.config.ts` and keep the package script simple. Let the bundler embed static package metadata such as the version instead of adding runtime `require` workarounds.

An unimplemented command must fail clearly. Do not add a test that only proves a known placeholder fails; add contract tests when the command has observable supported behavior.

## Scope and delivery

Open a PR only after the requested scope is stable. A PR for a private scaffold should contain only the package, its executable entry, required workspace wiring, and checks for real behavior.

Read-only design or review handoffs return a report. They do not edit files, create branches, open PRs, or add documentation unless the user explicitly requests that output.

After changing worktrees, verify the actual target before editing. Use the intended worktree path explicitly when tool state is uncertain.
