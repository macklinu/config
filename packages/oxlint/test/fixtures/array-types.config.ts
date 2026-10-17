import { compose, node, react, vitest } from '@macklinu/oxlint-config'

export default compose(react, node, vitest, {
  categories: { style: 'error', restriction: 'error', perf: 'error' },
})
