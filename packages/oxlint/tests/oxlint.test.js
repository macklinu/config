import { spawnSync } from 'node:child_process'
import { delimiter, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { beforeAll, expect, test } from 'vitest'

const packageRoot = fileURLToPath(new URL('../', import.meta.url))
const fixtures = resolve(packageRoot, 'tests/fixtures')
const env = {
  ...process.env,
  PATH: `${resolve(packageRoot, 'node_modules/.bin')}${delimiter}${process.env.PATH ?? ''}`,
}

beforeAll(() => {
  const patch = spawnSync(
    resolve(packageRoot, 'node_modules/.bin/effect-tsgo'),
    ['patch', '--no-typescript', '--oxlint', '--force'],
    { cwd: packageRoot, env, encoding: 'utf8' }
  )
  expect(patch.error).toBeUndefined()
  expect(patch.status, patch.stdout + patch.stderr).toBe(0)
})

function lint(config, ...files) {
  const result = spawnSync(
    process.execPath,
    [
      resolve(packageRoot, 'node_modules/oxlint/bin/oxlint'),
      '--config',
      resolve(packageRoot, `tests/configs/${config}.ts`),
      '--format',
      'json',
      '--threads',
      '1',
      ...files,
    ],
    { cwd: fixtures, env, encoding: 'utf8' }
  )
  expect(result.error).toBeUndefined()
  expect(result.stderr).toBe('')
  const output = JSON.parse(result.stdout)
  return { status: result.status, diagnostics: output.diagnostics }
}

test.each([
  ['unsafe-assignment.ts', 'no-unsafe-assignment'],
  ['unsafe-return.ts', 'no-unsafe-return'],
  ['unsafe-call.ts', 'no-unsafe-call'],
  ['unsafe-member-access.ts', 'no-unsafe-member-access'],
  ['unsafe-argument.ts', 'no-unsafe-argument'],
])('rejects %s with a blocking diagnostic', (file, rule) => {
  const result = lint('type-aware', file)
  expect(result.status).toBe(1)
  expect(result.diagnostics).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ code: `typescript(${rule})`, severity: 'error' }),
    ])
  )
})

test('accepts unknown values narrowed before use', () => {
  expect(lint('type-aware', 'safe.ts')).toEqual({ status: 0, diagnostics: [] })
})

test('keeps type aliases required in ordinary source', () => {
  const result = lint('base', 'ordinary-interface.ts')
  expect(result.status).toBe(1)
  expect(result.diagnostics).toEqual([
    expect.objectContaining({ code: 'typescript(consistent-type-definitions)', severity: 'error' }),
  ])
})

test.each(['merged.d.ts', 'merged.d.mts', 'merged.d.cts'])(
  'accepts declaration merging in %s',
  (file) => {
    expect(lint('type-aware', file)).toEqual({ status: 0, diagnostics: [] })
  }
)

test('type-checks consumers of merged ambient and module declarations', () => {
  expect(lint('type-aware', '--type-check', 'merged-consumer.ts', 'merged.d.ts')).toEqual({
    status: 0,
    diagnostics: [],
  })
})

test('keeps explicit-any checks in declaration files', () => {
  const result = lint('type-aware', 'invalid-declaration.d.ts')
  expect(result.status).toBe(1)
  expect(result.diagnostics).toEqual([
    expect.objectContaining({ code: 'typescript(no-explicit-any)', severity: 'error' }),
  ])
})

test('still rejects bare empty interfaces and object types in declarations', () => {
  const result = lint('type-aware', 'empty-declaration.d.ts')
  expect(result.status).toBe(1)
  expect(result.diagnostics).toEqual([
    expect.objectContaining({ code: 'typescript(no-empty-object-type)', severity: 'error' }),
    expect.objectContaining({ code: 'typescript(no-empty-object-type)', severity: 'error' }),
  ])
})

test('preserves declaration exceptions when another layer has overrides', () => {
  expect(lint('overridden', 'merged.d.ts', 'safe.ts')).toEqual({ status: 0, diagnostics: [] })
})

test('lets a later consumer override disable one unsafe rule without disabling the family', () => {
  expect(lint('overridden', 'unsafe-return.ts')).toEqual({ status: 0, diagnostics: [] })
  const result = lint('overridden', 'unsafe-assignment.ts')
  expect(result.status).toBe(1)
  expect(result.diagnostics).toEqual([
    expect.objectContaining({ code: 'typescript(no-unsafe-assignment)', severity: 'error' }),
  ])
})

test('composes Effect correctness as errors without losing type-aware checks', () => {
  const result = lint('effect', 'effect-invalid.ts', 'unsafe-return.ts')
  expect(result.status).toBe(1)
  expect(result.diagnostics).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ code: 'effecttsgo(floating-effect)', severity: 'error' }),
      expect.objectContaining({ code: 'effecttsgo(service-not-as-class)', severity: 'error' }),
      expect.objectContaining({ code: 'effecttsgo(deterministic-keys)', severity: 'error' }),
      expect.objectContaining({ code: 'typescript(no-unsafe-return)', severity: 'error' }),
    ])
  )
})

test('accepts handled Effects and declaration merging with all applicable layers', () => {
  expect(lint('effect', 'effect-valid.ts', 'merged.d.ts')).toEqual({ status: 0, diagnostics: [] })
})
