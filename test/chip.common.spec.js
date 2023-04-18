import { describe, it } from 'mocha'
import { expect } from 'chai'

// import { StatusParametersResponse } from '../src'
import { MCP2221Common } from '@johntalton/mcp2221/bindings'

const RESPONSE_COMMON_STATUS = Uint8Array.from([ 0x10, 0x00, 0x10 ]
  .concat(Array.from({ length: 43 })
  .concat([
    'A'.codePointAt(0),
    '6'.codePointAt(0),
    '1'.codePointAt(0),
    '2'.codePointAt(0)
  ])
  .concat(Array.from({ length: 6 }))))
  .buffer



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
      const binding = { read: async length => RESPONSE_COMMON_STATUS, write: async buffer => 64 }
      const common = new MCP2221Common(binding)
      const res = await common.status({ opaque: '', command: 0x10 })
      expect(res).to.not.be.undefined
      expect(res).to.be.exist
    })
  })

  describe('reset', () => {
    it('succeeds', async () => {
      const binding = { read: async length => new ArrayBuffer(length), write: async buffer => 64 }
      const common = new MCP2221Common(binding)
      const res = await common.reset({ opaque: '', magic: [171, 205, 239] })
      expect(res).to.be.undefined
    })
  })
})
