import { Context, Effect } from 'effect'

Effect.succeed('discarded')

export const Store = Context.Service<{ readonly title: string }>('Store')

export class Registry extends Context.Service<Registry, { readonly title: string }>()(
  'wrong-key'
) {}
