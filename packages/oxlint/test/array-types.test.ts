import { spawnSync } from 'node:child_process'
import { copyFileSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { expect, test } from 'vitest'

const cwd = fileURLToPath(new URL('../', import.meta.url))
const oxlint = fileURLToPath(new URL('../node_modules/oxlint/bin/oxlint', import.meta.url))

test.each(['array-types-base.config.ts', 'guardrails-base.config.ts', 'array-types.config.ts'])(
  '%s rejects generic arrays and accepts complex bracket arrays',
  (config) => {
    const result = spawnSync(
      process.execPath,
      [oxlint, '-f', 'json', '-c', `test/fixtures/${config}`, 'test/fixtures/array-types.ts'],
      { cwd, encoding: 'utf8' }
    )

    expect(result.status, result.stderr).toBe(1)
    const diagnostics = JSON.parse(result.stdout).diagnostics as {
      code: string
      labels: { span: { line: number } }[]
    }[]
    const lines = diagnostics
      .filter(({ code }) => code === 'typescript(array-type)')
      .flatMap(({ labels }) => labels.map(({ span }) => span.line))
    expect([...new Set(lines)].sort((a, b) => a - b)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
    ])
  }
)

test('array fixes preserve complex element types and nested mutability under TS7', () => {
  const directory = mkdtempSync(join(tmpdir(), 'config-array-types-'))
  const source = join(directory, 'arrays.ts')
  try {
    copyFileSync(new URL('fixtures/array-types.ts', import.meta.url), source)
    // Overlapping nested replacements need one fixer pass per array level.
    for (let pass = 0; pass < 2; pass++) {
      const fixed = spawnSync(
        process.execPath,
        [oxlint, '-f', 'json', '-c', 'test/fixtures/guardrails-base.config.ts', '--fix', source],
        { cwd, encoding: 'utf8' }
      )
      expect([0, 1], fixed.stderr || fixed.stdout).toContain(fixed.status)
      const compiled = spawnSync(
        fileURLToPath(new URL('../node_modules/.bin/tsc', import.meta.url)),
        [
          '--ignoreConfig',
          '--noEmit',
          '--strict',
          '--target',
          'ES2022',
          '--module',
          'NodeNext',
          source,
        ],
        { cwd, encoding: 'utf8' }
      )
      expect(compiled.status, compiled.stderr || compiled.stdout).toBe(0)
    }
    const checked = spawnSync(
      process.execPath,
      [oxlint, '-f', 'json', '-c', 'test/fixtures/guardrails-base.config.ts', source],
      { cwd, encoding: 'utf8' }
    )
    expect(checked.status, checked.stderr || checked.stdout).toBe(0)
  } finally {
    rmSync(directory, { recursive: true, force: true })
  }
})
