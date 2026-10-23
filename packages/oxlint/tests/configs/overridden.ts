import { compose } from '../../base.ts'
import { typeAware } from '../../type-aware.ts'

export default compose(typeAware, {
  overrides: [{ files: ['**/unsafe-return.ts'], rules: { 'typescript/no-unsafe-return': 'off' } }],
})
