import { expect, test } from 'vitest'

import config from './prettier.config'

test('default export is a prettier config', () => {
  expect(config).toMatchInlineSnapshot(`
    {
      "jsxSingleQuote": true,
      "printWidth": 100,
      "semi": false,
      "singleQuote": true,
      "trailingComma": "es5",
    }
  `)
})
