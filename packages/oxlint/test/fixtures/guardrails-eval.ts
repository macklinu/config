export function parseUnsafe(source: string): unknown {
  return eval(source)
}
