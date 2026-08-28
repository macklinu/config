# Agent guidance

## Scope before implementation

Treat alternatives, examples, and future ideas as options. Select the smallest behavior that satisfies the user's latest request. Do not add compatibility paths, adjacent integrations, or future architecture without a stated need.

For a scaffold, bootstrap, placeholder, or initial integration, keep the first slice local and reversible. New packages, services, automation, and integrations stay inactive or private until the user explicitly asks for publication, release, deployment, or external access.

Do not infer release work from implementation work. Versioning, publishing, release notes, licensing for distribution, deployment, artifact CI, registry smoke tests, telemetry, and operational automation belong to an explicit release or operations request.

## Design and delivery

Keep exploration separate from implementation. A design discussion, research task, or review returns a report unless the user asks for a repository change.

Make placeholders clear and safe. A command or integration that has no supported behavior must report that fact and must not signal successful completion.

Add tests for observable supported behavior, boundaries, and failures that could regress. Do not add tests that only restate a known placeholder.

Open a pull request after the requested scope is stable. Keep each pull request focused on one outcome.

## Collaboration and worktrees

Read-only handoffs return findings only. They do not edit files, create branches, open pull requests, or add documentation unless that output is explicitly requested.

After changing worktrees or repositories, verify the actual target before editing. Use explicit paths when tool state is uncertain.
