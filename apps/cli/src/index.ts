#!/usr/bin/env node

import { NodeRuntime, NodeServices } from '@effect/platform-node'
import { Effect } from 'effect'
import { Command } from 'effect/unstable/cli'

import { config, version } from './program.js'

Command.run(config, { version }).pipe(Effect.provide(NodeServices.layer), NodeRuntime.runMain)
