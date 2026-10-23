import { Effect } from 'effect'

export const title = Effect.runSync(Effect.succeed('handled'))
