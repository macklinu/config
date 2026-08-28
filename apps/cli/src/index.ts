#!/usr/bin/env node

import packageManifest from '../package.json' with { type: 'json' }

import { NodeRuntime, NodeServices } from '@effect/platform-node'
import { Effect } from 'effect'
import { Command } from 'effect/unstable/cli'

import { setup } from './program.js'

Command.run(setup, { version: packageManifest.version }).pipe(
  Effect.provide(NodeServices.layer),
  NodeRuntime.runMain
)
