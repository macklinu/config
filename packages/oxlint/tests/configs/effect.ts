import { compose } from '../../base.ts'
import { effect } from '../../effect.ts'
import { node } from '../../node.ts'
import { react } from '../../react.ts'
import { typeAware } from '../../type-aware.ts'
import { vitest } from '../../vitest.ts'

export default compose(react, node, vitest, typeAware, effect)
