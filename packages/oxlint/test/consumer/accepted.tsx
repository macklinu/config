declare const Card: (props: {
  details: { _tag: string }
  items: string[]
  onSelect: () => string
  fallback: unknown
}) => unknown

export const View = () => (
  <Card
    details={{ _tag: 'ready' }}
    items={['ready']}
    onSelect={() => 'ready'}
    fallback={<span />}
  />
)
export const environment = document.title + process.pid + buildFlag
export const copies = [{ _id: 'item' }].map((item) => ({ ...item, _type: 'entry' }))
export const read = (items: readonly { _tag: string }[]) => items[0]._tag
export const append = (items: { _tag: string }[]) => items.push({ _tag: 'ready' })
