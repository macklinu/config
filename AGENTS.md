# Agent guidance

## Scope before implementation

Treat alternatives, examples, and future ideas as options. Select the smallest behavior that satisfies the user's latest request. Do not add compatibility paths, adjacent integrations, or future architecture without a stated need.

For a scaffold, bootstrap, placeholder, or initial integration, keep the first slice local and reversible. New packages, services, automation, and integrations stay inactive or private until the user explicitly asks for publication, release, deployment, or external access.

Do not infer release work from implementation work. Versioning, publishing, release notes, licensing for distribution, deployment, artifact CI, registry smoke tests, telemetry, and operational automation belong to an explicit release or operations request.

Adding Changeset metadata for a package change is part of implementation, not authorization to version or publish a release.

## Design and delivery

Keep exploration separate from implementation. A design discussion, research task, or review returns a report unless the user asks for a repository change.

Make placeholders clear and safe. A command or integration that has no supported behavior must report that fact and must not signal successful completion.

Add tests for observable supported behavior, boundaries, and failures that could regress. Do not add tests that only restate a known placeholder.

Open a pull request after the requested scope is stable. Keep each pull request focused on one outcome.

## Commits and pull requests

Read and apply the local [conventional-commit skill](.agents/skills/conventional-commit/SKILL.md) when writing commit messages and pull request titles. Use Conventional Commits format for both.

## Changesets

Before opening or updating a pull request, review its full diff for consumer-visible changes to published packages. Include a Changeset for each affected package. Documentation-only and internal tooling changes do not need a Changeset.

Use `pnpm exec changeset add` to create the entry. If interactive prompts are unavailable, use `pnpm exec changeset add --empty`, then fill in the affected packages, bump types, and summary. Do not leave the entry empty for a package change.

Removed or renamed exports and incompatible API or supported-version changes require a major bump. Backward-compatible features use minor; compatible fixes use patch. A breaking-change commit marker does not replace a major Changeset.

Write the summary for package consumers. Explain behavior changes and include migration instructions for breaking changes.

Run `pnpm exec changeset status --verbose` before pushing the pull request. Confirm that the release plan includes the intended packages and bump types.

Commit the Changeset with the implementation. Do not manually change package versions or generated `CHANGELOG.md` files, or run `changeset version` or `changeset publish`, unless release work is explicitly requested. The release workflow consumes the entries to generate versions and changelogs.

## Collaboration and worktrees

Read-only handoffs return findings only. They do not edit files, create branches, open pull requests, or add documentation unless that output is explicitly requested.

After changing worktrees or repositories, verify the actual target before editing. Use explicit paths when tool state is uncertain.
