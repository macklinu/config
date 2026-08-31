import { correctness } from '@effect/tsgo/oxlint-presets'

import type { ConfigLayer } from './base.ts'

const correctnessRules: NonNullable<ConfigLayer['rules']> = {}
const plugins: NonNullable<ConfigLayer['plugins']> = ['effecttsgo']

for (const rule of Object.keys(correctness.rules ?? {})) {
  correctnessRules[rule] = 'error'
}

for (const plugin of correctness.plugins ?? []) {
  if (!plugins.includes(plugin)) {
    plugins.push(plugin)
  }
}

export const effect = {
  options: {
    ...correctness.options,
    typeAware: true,
  },
  plugins,
  rules: {
    ...correctnessRules,
    // Context.Service and Tag keys must stay deterministic across process boundaries.
    'effecttsgo/deterministic-keys': 'error',
    // Services use the v4 Context.Service declaration form instead of class-based service values.
    'effecttsgo/service-not-as-class': 'error',
    // `missing-effect-service-dependency` is v3-only and is intentionally not configured.
  },
} satisfies ConfigLayer
