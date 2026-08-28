#!/usr/bin/env node

import { createRequire } from 'node:module'

import { NodeRuntime, NodeServices } from '@effect/platform-node'
import { Effect } from 'effect'
import { Command } from 'effect/unstable/cli'

import { setup } from './program.js'

const require = createRequire(import.meta.url)
const packageManifest = require('../package.json') as { readonly version: string }

Command.run(setup, { version: packageManifest.version }).pipe(
  Effect.provide(NodeServices.layer),
  NodeRuntime.runMain
)
