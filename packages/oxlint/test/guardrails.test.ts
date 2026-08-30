import { expect, test } from 'vitest'

import { base, compose, node, react, typeAware, vitest } from '@macklinu/oxlint-config'
import { effect } from '@macklinu/oxlint-config/effect'

test('compose retains selected native plugins and root type-aware options', () => {
  const stackConfig = compose(react, node, vitest)
  const config = compose(react, node, vitest, typeAware, effect)

  expect(stackConfig.options).toBeUndefined()

  expect(config.extends).toEqual([base, react, node, vitest, typeAware, effect])
  expect(config.plugins).toEqual([
    'eslint',
    'typescript',
    'unicorn',
    'oxc',
    'import',
    'promise',
    'react',
    'jsx-a11y',
    'react-perf',
    'node',
    'vitest',
    'effecttsgo',
  ])
  expect(config.options).toEqual({ typeAware: true })
})
