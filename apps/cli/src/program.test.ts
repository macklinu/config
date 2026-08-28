import { createRequire } from 'node:module'

import { NodeServices } from '@effect/platform-node'
import { Effect } from 'effect'
import { Command } from 'effect/unstable/cli'
import { describe, expect, test } from 'vitest'

import { setup } from './program.js'

const require = createRequire(import.meta.url)
const packageManifest = require('../package.json') as { readonly version: string }

describe('setup command', () => {
  test('fails until interactive setup is implemented', async () => {
    await expect(
      Effect.runPromise(
        Command.runWith(setup, { renderErrors: false, version: packageManifest.version })([]).pipe(
          Effect.provide(NodeServices.layer)
        )
      )
    ).rejects.toThrow('Interactive setup is not implemented yet.')
  })
})
