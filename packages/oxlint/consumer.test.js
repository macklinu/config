import { spawnSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'

import { afterEach, beforeEach, expect, test } from 'vitest'

const require = createRequire(import.meta.url)
const packageDirectory = import.meta.dirname
let directory

beforeEach(() => {
  directory = mkdtempSync(join(tmpdir(), 'oxlint-config-consumer-'))
  mkdirSync(join(directory, 'node_modules', '@macklinu'), { recursive: true })
  symlinkSync(
    packageDirectory,
    join(directory, 'node_modules', '@macklinu', 'oxlint-config'),
    'junction'
  )
  writeFileSync(join(directory, 'package.json'), JSON.stringify({ private: true, type: 'module' }))
  writeFileSync(
    join(directory, 'tsconfig.json'),
    JSON.stringify({
      compilerOptions: {
        strict: true,
        module: 'NodeNext',
        target: 'ES2022',
        skipLibCheck: true,
      },
      include: ['fixture.*'],
    })
  )
})

afterEach(() => {
  rmSync(directory, { recursive: true, force: true })
})

const lint = ({ layers, source, filename = 'fixture.ts' }) => {
  const dependencies = ['oxlint', 'typescript']
  if (layers.includes('typeAware') || layers.includes('effect')) {
    dependencies.push('oxlint-tsgolint')
  }
  if (layers.includes('effect')) {
    dependencies.push('@effect/tsgo', 'effect')
  }
  for (const dependency of dependencies) {
    const destination = join(directory, 'node_modules', dependency)
    mkdirSync(dirname(destination), { recursive: true })
    symlinkSync(dirname(require.resolve(`${dependency}/package.json`)), destination, 'junction')
  }

  const regularLayers = layers.filter((layer) => layer !== 'effect')
  writeFileSync(
    join(directory, 'oxlint.config.ts'),
    [
      `import { compose${regularLayers.map((layer) => `, ${layer}`).join('')} } from '@macklinu/oxlint-config'`,
      ...(layers.includes('effect')
        ? ["import { effect } from '@macklinu/oxlint-config/effect'"]
        : []),
      `export default compose(${layers.join(', ')})`,
    ].join('\n')
  )
  writeFileSync(join(directory, filename), source)

  const command = layers.includes('effect')
    ? [
        join(dirname(require.resolve('@effect/tsgo/package.json')), 'dist', 'effect-tsgo.cjs'),
        'oxlint',
      ]
    : [join(dirname(require.resolve('oxlint/package.json')), 'bin', 'oxlint')]
  const result = spawnSync(
    process.execPath,
    [...command, filename, '--format', 'json', '--threads', '2'],
    { cwd: directory, encoding: 'utf8', timeout: 30_000 }
  )

  expect(result.error).toBeUndefined()
  expect(result.stderr).toBe('')
  return { status: result.status, diagnostics: JSON.parse(result.stdout).diagnostics }
}

test.each([
  { name: 'base without optional lint integrations', layers: [] },
  { name: 'type-aware', layers: ['typeAware'] },
  { name: 'all layers', layers: ['node', 'react', 'vitest', 'typeAware', 'effect'] },
])('accepts valid code with $name', ({ layers }) => {
  const result = lint({ layers, source: 'export const answer = 42\n' })

  expect(result).toEqual({ status: 0, diagnostics: [] })
})

test('preserves Node and browser globals when composing layers', () => {
  const result = lint({
    layers: ['node', 'react'],
    filename: 'fixture.js',
    source: 'export const version = process.version\nexport const title = window.document.title\n',
  })

  expect(result).toEqual({ status: 0, diagnostics: [] })
})

test.each([
  {
    name: 'array annotation policy',
    layers: [],
    source: 'export const values: Array<number> = []\n',
    code: 'typescript(array-type)',
  },
  {
    name: 'Promise misuse',
    layers: ['typeAware'],
    source: 'export const check = () => { if (Promise.resolve(true)) { return 1 } return 0 }\n',
    code: 'typescript(no-misused-promises)',
  },
  {
    name: 'dropped Effects',
    layers: ['effect'],
    source: `import { Effect } from 'effect'
export const dropped = Effect.gen(function* () {
  yield* Effect.void
  Effect.succeed(1)
})`,
    code: 'effecttsgo(floating-effect)',
  },
  {
    name: 'Schema class object literals',
    layers: ['effect'],
    source: `import { Schema } from 'effect'
export class User extends Schema.Class<User, { readonly brand: unique symbol }>('User')({ name: Schema.String }) {}
export const original = User.make({ name: 'a' })
export const copied: User = { ...original }`,
    code: 'effecttsgo(schema-class-object-literal)',
  },
  {
    name: 'unsafe enum assignments with the Effect-patched engine',
    layers: ['effect'],
    source: `enum Fruit { Apple, Banana }
export const fruit: Fruit = 0`,
    code: 'typescript(no-unsafe-enum-assignment)',
  },
])('rejects $name', ({ layers, source, code }) => {
  const result = lint({ layers, source })

  expect(result.status).toBe(1)
  expect(result.diagnostics.map((diagnostic) => diagnostic.code)).toContain(code)
})

test('allows short-form Effect constructors without requiring custom error mapping', () => {
  const result = lint({
    layers: ['effect'],
    source: `import { Effect } from 'effect'
declare const text: string
export const parsed = Effect.try(() => JSON.parse(text))
export const loaded = Effect.tryPromise(() => Promise.resolve(text))`,
  })

  expect(result).toEqual({ status: 0, diagnostics: [] })
})
