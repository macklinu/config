import path from 'node:path'

import { detectPackageManager, installPackage } from '@antfu/install-pkg'
import { consola } from 'consola'
import { vol } from 'memfs'
import { tmpdir } from 'os'
import { beforeEach, expect, test, vi } from 'vitest'

import { init } from './init'

// Mock fs everywhere else with the memfs version.
vi.mock('fs', async () => {
  const memfs = await vi.importActual<typeof import('memfs')>('memfs')

  // Support both `import fs from "fs"` and "import { readFileSync } from "fs"`
  return { default: memfs.fs, ...memfs.fs }
})

vi.mock('@antfu/install-pkg')
vi.mock('consola')

beforeEach(() => {
  vol.reset()
})

test('throws if directory does not contain package.json', async () => {
  const cwd = path.resolve(tmpdir(), 'test')

  vol.fromJSON({}, cwd)

  await expect(init({ cwd })).rejects.toThrowErrorMatchingInlineSnapshot(
    `[Error: package.json required to set up ESLint]`
  )
})

test('throws if package manager cannot be determined', async () => {
  const cwd = path.resolve(tmpdir(), 'test')

  vol.fromJSON(
    {
      './package.json': JSON.stringify(
        { name: 'my-package', version: '0.0.1', private: true },
        null,
        2
      ),
    },
    cwd
  )

  await expect(init({ cwd })).rejects.toThrowError(/could not determine package manager to use/i)
})

test('is able to install with package manager', async () => {
  const cwd = path.resolve(tmpdir(), 'test')

  vi.mocked(detectPackageManager).mockResolvedValueOnce('pnpm')

  vol.fromNestedJSON(
    {
      'package.json': JSON.stringify(
        {
          name: 'my-package',
          version: '0.0.1',
          private: true,
          packageManager: 'pnpm@9.0.0',
        },
        null,
        2
      ),
    },
    cwd
  )

  await init({ cwd })

  expect(consola.info).toHaveBeenCalled()
  expect(installPackage).toHaveBeenCalledWith(['eslint', '@macklinu/eslint-config'], {
    cwd,
    dev: true,
    silent: true,
    packageManager: 'pnpm',
  })
})
