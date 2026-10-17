import { compose } from '@macklinu/oxlint-config'
import { typeAware } from '@macklinu/oxlint-config/type-aware'
import { effect } from '@macklinu/oxlint-config/effect'

export default compose(typeAware, effect)
