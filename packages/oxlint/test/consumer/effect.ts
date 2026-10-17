import { Effect, Schema } from 'effect'

Effect.succeed('unhandled')
export class Entry extends Schema.Class<Entry>('Entry')({ value: Schema.String }) {}
export const address = Schema.Ipv4Network
