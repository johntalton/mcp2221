import { describe, it } from 'mocha'
import { expect } from 'chai'

// import { StatusParametersResponse } from '../src'
import { MCP2221Common } from '@johntalton/mcp2221/bindings'

describe('MCP2221Common', () => {
  describe('constructor', () => {
    it('succeeds', () => {
      const binding = undefined
      const common = new MCP2221Common(binding)
      expect(common).to.not.be.undefined
      expect(common).to.be.instanceOf(MCP2221Common)
    })
  })

  describe('status', () => {
    it('succeeds', async () => {
      const binding = { read: async length => new Uint8Array(length), write: async buffer => 64 }
      const common = new MCP2221Common(binding)
      const res = await common.status({ opaque: '', command: 0x10 })
      expect(res).to.not.be.undefined
      expect(res).to.be.exist
    })
  })

  describe('reset', () => {
    it('succeeds', async () => {
      const binding = { read: async length => new Uint8Array(length), write: async buffer => 64 }
      const common = new MCP2221Common(binding)
      const res = await common.reset({ opaque: '', magic: [171, 205, 239] })
      expect(res).to.be.undefined
    })
  })
})
