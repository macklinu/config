import { compose } from '@macklinu/oxlint-config'
import { node } from '@macklinu/oxlint-config/node'
import { react } from '@macklinu/oxlint-config/react'
import { vitest } from '@macklinu/oxlint-config/vitest'

export default compose(
  react,
  node,
  vitest,
  {
    categories: { perf: 'error' },
    globals: { buildFlag: 'off' },
  },
  {
    globals: { buildFlag: 'readonly' },
    rules: { 'no-undef': 'error' },
  }
)
