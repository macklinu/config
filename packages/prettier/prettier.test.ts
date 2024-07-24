import { test, expect } from 'vitest'
import config from './prettier.config'

test('default export is a prettier config', () => {
  expect(config).toMatchInlineSnapshot(`
    {
      "jsxSingleQuote": true,
      "semi": false,
      "singleQuote": true,
      "trailingComma": "es5",
    }
  `)
})
