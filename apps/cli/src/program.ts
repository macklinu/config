import { Effect } from 'effect'
import { CliError, Command } from 'effect/unstable/cli'

export const setup = Command.make('setup', {}, () =>
  Effect.fail(
    new CliError.UserError({
      cause: 'Interactive setup is not implemented yet.',
      userMessage: 'Interactive setup is not implemented yet.',
    })
  )
).pipe(Command.withDescription('Set up this project configuration'))
