export type MutableSimple = Array<string>
export type ReadonlySimple = ReadonlyArray<string>
export type MutableObject = Array<{ value: string }>
export type ReadonlyObject = ReadonlyArray<{ value: string }>
export type MutableUnion = Array<string | number>
export type ReadonlyUnion = ReadonlyArray<string | number>
export type MutableIntersection = Array<{ a: string } & { b: number }>
export type ReadonlyIntersection = ReadonlyArray<{ a: string } & { b: number }>
export type MutableFunction = Array<() => string>
export type ReadonlyFunction = ReadonlyArray<() => string>
export type MutableNested = Array<ReadonlyArray<string>>
export type ReadonlyNested = ReadonlyArray<Array<string>>
export type ReadonlyBoth = ReadonlyArray<ReadonlyArray<string>>
export type MutableBoth = Array<Array<string>>

export type BracketMutableSimple = string[]
export type BracketReadonlySimple = readonly string[]
export type BracketMutableObject = { value: string }[]
export type BracketReadonlyObject = readonly { value: string }[]
export type BracketMutableUnion = (string | number)[]
export type BracketReadonlyUnion = readonly (string | number)[]
export type BracketMutableIntersection = ({ a: string } & { b: number })[]
export type BracketReadonlyIntersection = readonly ({ a: string } & { b: number })[]
export type BracketMutableFunction = (() => string)[]
export type BracketReadonlyFunction = readonly (() => string)[]
export type BracketMutableNested = (readonly string[])[]
export type BracketReadonlyNested = readonly string[][]
export type BracketReadonlyBoth = readonly (readonly string[])[]
export type BracketMutableBoth = string[][]

type Equal<A, B> =
  (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false
type Assert<T extends true> = T
export type Contracts = [
  Assert<Equal<MutableSimple, BracketMutableSimple>>,
  Assert<Equal<ReadonlySimple, BracketReadonlySimple>>,
  Assert<Equal<MutableObject, BracketMutableObject>>,
  Assert<Equal<ReadonlyObject, BracketReadonlyObject>>,
  Assert<Equal<MutableUnion, BracketMutableUnion>>,
  Assert<Equal<ReadonlyUnion, BracketReadonlyUnion>>,
  Assert<Equal<MutableIntersection, BracketMutableIntersection>>,
  Assert<Equal<ReadonlyIntersection, BracketReadonlyIntersection>>,
  Assert<Equal<MutableFunction, BracketMutableFunction>>,
  Assert<Equal<ReadonlyFunction, BracketReadonlyFunction>>,
  Assert<Equal<MutableNested, BracketMutableNested>>,
  Assert<Equal<ReadonlyNested, BracketReadonlyNested>>,
  Assert<Equal<ReadonlyBoth, BracketReadonlyBoth>>,
  Assert<Equal<MutableBoth, BracketMutableBoth>>,
]

export function mutate(
  mutable: MutableSimple,
  readonly: ReadonlySimple,
  mutableNested: MutableNested,
  readonlyNested: ReadonlyNested,
  readonlyBoth: ReadonlyBoth
) {
  mutable.push('ok')
  mutable[0] = 'ok'
  mutableNested.push(['ok'])
  readonlyNested[0].push('ok')
  // @ts-expect-error: inner array stays readonly
  mutableNested[0].push('blocked')
  // @ts-expect-error: outer array stays readonly
  readonlyNested.push(['blocked'])
  // @ts-expect-error: outer array stays readonly
  readonlyBoth.push(['blocked'])
  // @ts-expect-error: inner array stays readonly
  readonlyBoth[0].push('blocked')
  // @ts-expect-error: readonly arrays reject push
  readonly.push('blocked')
  // @ts-expect-error: readonly arrays reject index assignment
  readonly[0] = 'blocked'
}
