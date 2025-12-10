#!/usr/bin/env bun

import { program } from 'commander'

import { version } from '../package.json'
import { init } from './init'

program
  .version(version)
  .command('init')
  .description('Sets up ESLint with @macklinu/eslint-config')
  .action(async () => {
    await init()
  })

program.parse()
