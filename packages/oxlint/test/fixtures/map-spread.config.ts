import { compose, node, react, vitest } from '@macklinu/oxlint-config'

export default compose(react, node, vitest, {
  categories: { perf: 'error', style: 'error', suspicious: 'error' },
})
