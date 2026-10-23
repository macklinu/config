const acceptTitle = (title: string): string => title

export const parseTitle = (json: string): string => acceptTitle(JSON.parse(json))
