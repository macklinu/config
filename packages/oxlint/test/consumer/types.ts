import { compose, node, react, vitest, typeAware, type ConfigLayer } from '@macklinu/oxlint-config'
import { base } from '@macklinu/oxlint-config/base'

export const config: ConfigLayer = compose(base, node, react, vitest, typeAware)
