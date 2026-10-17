export function constructItems() {
  const items = [{ value: 1 }]
  return items.map((item) => ({ ...item, label: String(item.value) }))
}

export function mergeItems(metadata: { active: boolean }) {
  const items = [{ value: 1 }]
  return items.map((item) => ({ ...metadata, ...item }))
}

export function constructFlatItems() {
  const items = [{ value: 1 }]
  return items.flatMap((item) => ({ ...item, label: String(item.value) }))
}

export function accumulateItems(items: number[]) {
  return items.reduce<number[]>((accumulator, item) => [...accumulator, item], [])
}
