import { NodeServices } from '@effect/platform-node'
import { Effect } from 'effect'
import { Command } from 'effect/unstable/cli'
import { describe, expect, test } from 'vitest'

import { config, version } from '../src/program.js'

describe('config command', () => {
  test('accepts setup', async () => {
    await expect(
      Effect.runPromise(
        Command.runWith(config, { renderErrors: false, version })(['setup']).pipe(
          Effect.provide(NodeServices.layer)
        )
      )
    ).resolves.toBeUndefined()
  })

  test('does not accept init', async () => {
    await expect(
      Effect.runPromise(
        Command.runWith(config, { renderErrors: false, version })(['init']).pipe(
          Effect.provide(NodeServices.layer)
        )
      )
    ).rejects.toBeDefined()
  })
})
