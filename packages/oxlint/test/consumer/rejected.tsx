import { readFile } from 'fs'
import { expect, it } from 'vitest'

export { readFile }
export const unsafe = (source: string) => eval(source)
export const accumulate = (items: number[]) =>
  items.reduce<number[]>((all, item) => [...all, item], [])
export type Mutable = Array<{ value: string }>
export type Immutable = ReadonlyArray<{ value: string }>

declare const Link: (props: { to: string; target: string; children: string }) => unknown
export const link = (
  <Link to='https://example.com' target='_blank'>
    External
  </Link>
)
it('uses the wrong test function', () => {
  expect(accumulate([1])).toEqual([1])
})
