import { describe, it } from 'mocha'
import { expect } from 'chai'

import { MCP2221A } from '../src'

describe('MCP2221A', () => {
  describe('constructor', () => {
    it('succeeds (new)', () => {
      const binding = undefined
      new MCP2221A(binding)
    })

    it('succeeds (openPromisified)', () => {
      const binding = undefined
      MCP2221A.openPromisified(binding)
    })
  })
})
