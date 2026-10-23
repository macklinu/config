export const parseTitle = (json: string): string => {
  const value: unknown = JSON.parse(json)
  if (typeof value !== 'string') {
    throw new TypeError('Expected a title')
  }
  return value
}

export type Article = { title: string }
