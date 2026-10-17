import { execFileSync, spawnSync } from 'node:child_process'
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync } from 'node:fs'
import { createRequire } from 'node:module'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { afterAll, beforeAll, expect, test } from 'vitest'

const packageRoot = fileURLToPath(new URL('../', import.meta.url))
const require = createRequire(join(packageRoot, 'package.json'))
const directory = mkdtempSync(join(tmpdir(), 'oxlint-consumer-'))
const cwd = join(directory, 'package')
const modules = join(cwd, 'node_modules')

afterAll(() => rmSync(directory, { recursive: true, force: true }))

beforeAll(() => {
  execFileSync('pnpm', ['pack', '--out', join(directory, 'config.tgz')], {
    cwd: packageRoot,
    timeout: 60_000,
  })
  execFileSync('tar', ['-xzf', join(directory, 'config.tgz'), '-C', directory])
  cpSync(new URL('consumer/', import.meta.url), cwd, { recursive: true })
  mkdirSync(join(modules, '@effect'), { recursive: true })
  for (const name of ['typescript', 'effect', '@effect/tsgo']) {
    symlinkSync(dirname(require.resolve(`${name}/package.json`)), join(modules, name), 'dir')
  }
  // Copy patch targets so Effect cannot change the workspace's installed binaries.
  for (const name of ['oxlint', 'oxlint-tsgolint']) {
    const source = dirname(require.resolve(`${name}/package.json`))
    cpSync(source, join(modules, name), { recursive: true })
    const dependencyRequire = createRequire(join(source, 'package.json'))
    const { optionalDependencies } = JSON.parse(readFileSync(join(source, 'package.json'), 'utf8'))
    for (const dependency of Object.keys(optionalDependencies)) {
      let manifest: string
      try {
        manifest = dependencyRequire.resolve(`${dependency}/package.json`)
      } catch (error) {
        if (error instanceof Error && 'code' in error && error.code === 'MODULE_NOT_FOUND') continue
        throw error
      }
      cpSync(dirname(manifest), join(modules, dependency), { recursive: true })
    }
  }
  mkdirSync(join(modules, '.bin'))
  symlinkSync(join(modules, 'oxlint-tsgolint/bin/tsgolint.js'), join(modules, '.bin/tsgolint'))
  execFileSync(
    process.execPath,
    [join(modules, '@effect/tsgo/dist/effect-tsgo.cjs'), 'patch', '--no-typescript', '--oxlint'],
    { cwd, timeout: 30_000 }
  )
}, 60_000)

function lint(config: string, file: string) {
  const result = spawnSync(
    process.execPath,
    [join(modules, 'oxlint/bin/oxlint'), '-f', 'json', '-c', config, file],
    {
      cwd,
      encoding: 'utf8',
      timeout: 30_000,
      env: { ...process.env, PATH: `${join(modules, '.bin')}:${process.env.PATH}` },
    }
  )
  expect(result.error ?? result.stderr).toBeFalsy()
  expect(result.stdout, result.stdout).toMatch(/^\s*\{/u)
  const { diagnostics } = JSON.parse(result.stdout) as { diagnostics: { code: string }[] }
  expect(result.status, result.stdout).toBe(diagnostics.length ? 1 : 0)
  return [...new Set(diagnostics.map(({ code }) => code))].sort()
}

test('packed entry points and declarations support a TS7 consumer', () => {
  execFileSync(join(modules, 'typescript/bin/tsc'), ['--noEmit', '-p', 'tsconfig.json'], {
    cwd,
    timeout: 30_000,
    stdio: 'pipe',
  })
  expect(lint('stack.config.ts', 'accepted.tsx')).toEqual([])
})

test('composed policies reject unsafe code and generic array annotations', () => {
  expect(lint('stack.config.ts', 'rejected.tsx')).toEqual(
    [
      'eslint(no-eval)',
      'oxc(no-accumulating-spread)',
      'typescript(array-type)',
      'react(jsx-no-target-blank)',
      'unicorn(prefer-node-protocol)',
      'vitest(consistent-test-it)',
    ].sort()
  )
})

test('the optional Effect layer enables type-aware correctness and nominal schema classes', () => {
  expect(lint('effect.config.ts', 'effect.ts')).toEqual(
    ['effecttsgo(floating-effect)', 'effecttsgo(schema-class-missing-brand)'].sort()
  )
})
