import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { expect, test } from 'vitest'

test('composed layers supply root settings and globals to Oxlint', () => {
  const cwd = fileURLToPath(new URL('../', import.meta.url))
  const result = spawnSync(
    process.execPath,
    [
      fileURLToPath(new URL('../node_modules/oxlint/bin/oxlint', import.meta.url)),
      '-f',
      'json',
      '-c',
      'test/fixtures/guardrails.config.ts',
      '-D',
      'no-undef',
      'test/fixtures/compose-diagnostics.tsx',
    ],
    { cwd, encoding: 'utf8' }
  )

  expect(result.status, result.stderr).toBe(1)
  const diagnostics = JSON.parse(result.stdout).diagnostics as Array<{
    code: string
    message: string
  }>
  expect(diagnostics.filter(({ code }) => code === 'react(jsx-no-target-blank)')).toHaveLength(1)
  expect(diagnostics.filter(({ code }) => code === 'eslint(no-undef)')).toEqual([
    expect.objectContaining({ message: expect.stringContaining('unknownWorkspaceGlobal') }),
  ])
  const allocationRules = [
    'react-perf(jsx-no-new-object-as-prop)',
    'react-perf(jsx-no-new-array-as-prop)',
    'react-perf(jsx-no-new-function-as-prop)',
    'react-perf(jsx-no-jsx-as-prop)',
  ]
  expect(diagnostics.filter(({ code }) => allocationRules.includes(code))).toEqual([])
})

test.each(['guardrails-base.config.ts', 'provider-identifiers.config.ts'])(
  '%s allows provider identifiers without disabling correctness rules',
  (config) => {
    const cwd = fileURLToPath(new URL('../', import.meta.url))
    const result = spawnSync(
      process.execPath,
      [
        fileURLToPath(new URL('../node_modules/oxlint/bin/oxlint', import.meta.url)),
        '-f',
        'json',
        '-c',
        `test/fixtures/${config}`,
        'test/fixtures/provider-identifiers.ts',
      ],
      { cwd, encoding: 'utf8' }
    )

    expect(result.status, result.stderr).toBe(1)
    const diagnostics = JSON.parse(result.stdout).diagnostics as Array<{ code: string }>
    const codes = diagnostics.map(({ code }) => code)
    expect(codes).not.toContain('eslint(no-underscore-dangle)')
    expect(codes).toEqual(
      expect.arrayContaining([
        'eslint(no-self-compare)',
        'eslint(no-eval)',
        'eslint(no-throw-literal)',
      ])
    )
  }
)
