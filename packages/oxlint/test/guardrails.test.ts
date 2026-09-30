import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { expect, test } from 'vitest'

import { compose, node, react, typeAware } from '@macklinu/oxlint-config'

test('compose promotes type-aware options to the root', () => {
  expect(compose(react, node).options).toBeUndefined()
  expect(compose(react, node, typeAware).options).toEqual({ typeAware: true })
})

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
})
