import { Console } from 'effect'
import { Command } from 'effect/unstable/cli'

export const version = '0.1.0'

export const setup = Command.make('setup', {}, () =>
  Console.log('Interactive setup is not implemented yet.')
).pipe(Command.withDescription('Set up this project configuration'))

export const config = Command.make('config').pipe(
  Command.withDescription('Set up Macklinu project configuration'),
  Command.withSubcommands([setup])
)
