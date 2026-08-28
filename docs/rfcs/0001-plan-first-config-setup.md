# RFC 0001: Plan-first `config setup`

- **Status:** Proposed
- **Date:** 2026-08-27
- **Decision:** Replace the imperative `init` flow with a plan-first `setup` command.

## Context

The existing ESLint initializer installs packages and writes files in one execution path. It cannot show all intended changes before mutation, reject stale state, or model ambiguous configuration as a conflict. See [`packages/eslint/src/init.ts`](../../packages/eslint/src/init.ts).

The replacement must configure a repository safely. The first integration initializes Oxlint and Oxfmt: it installs the required packages, creates baseline configs when absent, and adds both commands to an existing Lefthook `pre-commit` hook or creates its YAML config when none exists.

## Decision

### Command surface

```text
config setup [integration] [--cwd <directory>] [--review] [--yes]
```

- `config setup` is interactive. It selects an integration, then scans, reviews, and asks for approval.
- `config setup oxlint` selects Oxlint without the selection prompt. It still reviews and asks for approval.
- `--cwd` resolves a Git repository root. The first release requires its root `package.json`; it does not target a workspace leaf.
- The default review is a portable unified diff. It uses color when the output supports it.
- `--review` uses an OpenTUI multi-file diff. It requires a TTY and includes the approval control.
- `--yes` is the only non-interactive approval. It requires an explicit integration and is incompatible with `--review`.
- No `--force`, compatibility `init` command, or implicit apply mode.

A plan with a conflict cannot be applied. A declined plan makes no changes.

### Architecture

Repository I/O and process execution are Effect services. Detection and planning are pure functions over an immutable repository snapshot.

```text
CLI / prompts
  → repository scan
  → integration detection
  → pure change plan
  → diff or TUI review
  → approval
  → revalidation and apply
```

```ts
interface Integration<State> {
  readonly id: IntegrationId
  readonly detect: (snapshot: RepositorySnapshot) => State
  readonly plan: (state: State, policy: SetupPolicy) => ChangePlan
}
```

`RepositorySnapshot` contains raw source bytes, file fingerprints, candidate config paths, package-manager facts, and Git-hook facts. It has no writable filesystem or process capability.

Modules:

- `repository`: Git root resolution, path validation, raw reads, fingerprints, symlink checks, and repository locking.
- `setup/plan`: action types, plan invariants, semantic plan comparison, and conflicts.
- `setup/oxlint`: Oxlint-specific detection and planning.
- `setup/oxfmt`: Oxfmt-specific detection and planning.
- `setup/lefthook`: format detection plus format-specific semantic editors.
- `setup/typescript`: TypeScript config classification and narrow source patches.
- `setup/package-manager`: package-manager detection and structured command rendering.
- `setup/review`: unified diff and OpenTUI views of the same immutable plan.
- `setup/apply`: revalidation, process boundaries, atomic file replacement, and result reporting.

### Plan actions

Use `Data.TaggedEnum` for the internal action model. The plan is an in-memory domain object, not a CLI wire format.

```ts
type Action = Data.TaggedEnum<{
  readonly Create: { readonly path: string; readonly contents: string; readonly expected: 'missing' }
  readonly Update: { readonly path: string; readonly before: string; readonly after: string; readonly expected: string }
  readonly Command: { readonly cwd: string; readonly executable: string; readonly args: ReadonlyArray<string> }
  readonly NoChange: { readonly target: string; readonly reason: string }
  readonly Conflict: { readonly paths: ReadonlyArray<string>; readonly reason: string; readonly remediation: string }
}>

const Action = Data.taggedEnum<Action>()
```

All paths are normalized and repository-relative. `Create` and `Update` own exact UTF-8 source. `Update` includes the full before and after content; review renders only changed hunks. `Command` uses an executable and argument vector. It never uses a shell.

A plan includes every input that affected detection, an action order, a stable digest, and action dependencies. The planner rejects path escape, duplicate writers, invalid update fingerprints, and plans that contain conflicts.

### Oxlint and Oxfmt integration

The base config comes from the current documented Oxlint package surface:

```ts
import { defineConfig } from 'oxlint'
import { base } from '@macklinu/oxlint-config'

export default defineConfig({
  extends: [base],
})
```

See [`packages/oxlint/README.md`](../../packages/oxlint/README.md).

Initial state handling:

- Missing `oxlint.config.ts` → `Create` the baseline config.
- Existing config that already extends the required `base` config → `NoChange`.
- Any other existing Oxlint config → `Conflict`.

Do not reprint an existing TypeScript config. Later support may use the TypeScript parser plus span-based edits, and only for a canonical static `export default defineConfig({ extends: [...] })` form. Dynamic exports, spreads, aliases with unclear meaning, and multiple default exports remain conflicts.

Oxfmt uses a baseline `.oxfmtrc.json`:

```json
{
  "$schema": "./node_modules/oxfmt/configuration_schema.json"
}
```

Initial state handling:

- Missing `.oxfmtrc.json` → `Create` the baseline config.
- Existing `.oxfmtrc.json` → `NoChange`.

### Lefthook integration and installation

Lefthook supports YAML, TOML, JSON, and JSONC main config files in several documented locations. The scanner must find all documented main config names and `lefthook-local` overlays. It must not guess which of several main configs Lefthook will use.

The planner operates on semantic targets: `pre-commit.commands.oxlint` and `pre-commit.commands.oxfmt`. Each supported format needs its own preserving editor. A YAML parser is not a generic Lefthook editor.

The first write adapter supports no more than one main YAML config. An existing config must have a mapping-shaped `pre-commit.commands`; when none exists, the adapter creates `lefthook.yml` with that shape. It inserts each command only when its identifier is absent:

```yaml
pre-commit:
  commands:
    oxlint:
      glob: '*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}'
      run: pnpm exec oxlint "{staged_files}"
    oxfmt:
      glob: '*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}'
      run: pnpm exec oxfmt "{staged_files}"
```

The command renderer uses `pnpm exec` in a pnpm repository and `nubx` in a Nub repository. Use a YAML CST parser for validation, then make a token-span insertion. Do not parse and stringify the document. Preserve all bytes outside the inserted node. A non-YAML config, more than one main config, `jobs`, malformed YAML, duplicate keys, or an existing different `oxlint` or `oxfmt` command is a conflict in the first slice. Future TOML, JSON, and JSONC adapters must meet the same source-preservation rule.

`lefthook install` is related but separate. A config update does not require reinstall: Lefthook reads its config whenever the installed hook runs. The Lefthook npm package also installs hooks from its postinstall script. See [Lefthook install](https://lefthook.dev/usage/commands/install/).

Do not run `lefthook install` automatically in the first slice. It mutates Git hooks, and the scanner cannot safely overwrite a custom hook. A later explicit `--install-hook` mode may add `Command { executable: "lefthook", args: ["install", "pre-commit"] }` only when the main config is present and the target hook is absent or conclusively Lefthook-managed. Any custom or unknown hook is a conflict.

### Package-manager commands

Package-manager detection is pure and ordered:

1. Parse `package.json#packageManager`.
2. Compare the result with recognized lockfiles.
3. Require agreement and a known executable.
4. Otherwise produce a conflict.

Never guess npm, invoke Corepack, or install a package manager. An adapter renders the command. The first slice supports pnpm and Nub:

```text
pnpm add --save-dev --ignore-scripts \
  oxlint@<compatibility-version> \
  @macklinu/oxlint-config@<compatibility-version> \
  oxfmt@<compatibility-version>

nub add --save-dev --ignore-scripts \
  oxlint@<compatibility-version> \
  @macklinu/oxlint-config@<compatibility-version> \
  oxfmt@<compatibility-version>
```

Add `--workspace-root` only for a pnpm or Nub workspace root. The CLI ships an exact compatibility matrix; it does not use `latest` or mutable ranges. Existing compatible packages are `NoChange`. An incompatible version or unclear dependency location is a conflict.

`--ignore-scripts` prevents an unreviewed dependency lifecycle script from running. The review must state that this command will change `package.json` and the lockfile. Those package-manager-generated bytes cannot be presented as a truthful static diff before command execution.

### Revalidation and apply

1. Scan and create the plan.
2. Render the plan and obtain approval.
3. Acquire an exclusive lock in the resolved Git directory.
4. Re-scan and re-plan.
5. Apply only if the fresh plan is semantically identical and every planned fingerprint still matches.
6. Run package-manager commands first and verify their postconditions.
7. Revalidate text-file targets.
8. Write text outputs to same-directory temporary files, `fsync`, preserve update modes, and atomically rename each file.

This gives atomic replacement per file and stale-plan rejection. It does not give an atomic transaction across package-manager commands and multiple files. On failure, report completed actions. Do not auto-rollback: rollback can overwrite concurrent user changes and cannot safely undo package-manager side effects.

## Delivery order

1. Plan model, repository snapshot, conflict rendering, default diff review, approval, and pure fixture tests.
2. First vertical slice: Oxlint and Oxfmt, a pnpm or Nub repository root, missing-or-correct baseline configs, zero or one supported Lefthook YAML config, stale-plan check, and atomic text writes.
3. Boundary tests: comments and anchors, malformed or duplicate YAML, a new conflicting config file, symlink escape, stale source, command failure, and partial-write reporting.
4. OpenTUI review, then format adapters and package-manager adapters one at a time.
5. Narrow TypeScript edits and explicit safe hook installation.

## Out of scope for the first vertical slice

- Installing Lefthook.
- Automatic `lefthook install`.
- TOML, JSON, JSONC, multiple config files, `lefthook-local` mutation, and `jobs` mutation.
- Editing a non-canonical Oxlint TypeScript config.
- Workspace leaf targets, package-manager bootstrap, dependency upgrades, or package-manager support beyond pnpm and Nub.
- Automatic React, Vitest, Node, or type-aware Oxlint profile selection.
- `--force`, shell command strings, global reformatting, persisted plans, JSON output, and automatic hook execution.

## Consequences

Setup stops rather than guessing. The first release handles fewer repository shapes, but each accepted shape has a reviewable plan, a stale-state guard, and a small source-preserving change. New shapes are added as explicit adapters instead of broadening one unsafe editor.
