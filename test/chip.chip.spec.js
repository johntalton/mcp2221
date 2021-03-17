import { describe, it } from 'mocha'
import { expect } from 'chai'

import { MCP2221A } from '@johntalton/mcp2221'

describe('MCP2221A', () => {
  describe('constructor', () => {
    it('succeeds (new)', () => {
      const binding = undefined
      new MCP2221A(binding)
    })

    it('succeeds (from)', () => {
      const binding = undefined
      MCP2221A.from(binding)
    })
  })
})
