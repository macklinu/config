export function providerIdentifiers(value: {
  _type: string
  _key: string
  _tag: string
  _ref: string
  _id: string
  _sanityAsset: string
  _splat: string
}) {
  return [
    value._type,
    value._key,
    value._tag,
    value._ref,
    value._id,
    value._sanityAsset,
    value._splat,
  ]
}

export function compareWithSelf(value: number) {
  return value === value
}

export function evaluateSource(source: string) {
  return eval(source)
}

export function throwLiteral() {
  throw 'failed'
}
