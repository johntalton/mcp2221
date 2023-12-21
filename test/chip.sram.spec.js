import { describe, it } from 'mocha'
import { expect } from 'chai'

// import { StatusParametersResponse } from '../src'
import { MCP2221SRAM } from '@johntalton/mcp2221/bindings'

const RESPONSE_SRAM_GET = Uint8Array.from([ 0x10, 0x00, 0x10 ]
  .concat(Array.from({ length: 43 })
  .concat([
    'A'.codePointAt(0),
    '6'.codePointAt(0),
    '1'.codePointAt(0),
    '2'.codePointAt(0)
  ])
  .concat(Array.from({ length: 6 }))))
  .buffer



describe('MCP2221SRAM', () => {
  describe('constructor', () => {
    it('succeeds', () => {
      const binding = undefined
      const sram = new MCP2221SRAM(binding)
      expect(sram).to.not.be.undefined
      expect(sram).to.be.instanceOf(MCP2221SRAM)
    })
  })

  xdescribe('get', () => {
    it('succeeds', async () => {
      const binding = { read: async length => RESPONSE_SRAM_GET, write: async buffer => 64 }
      const sram = new MCP2221SRAM(binding)
      const res = await sram.get({  })
      expect(res).to.not.be.undefined
      expect(res).to.be.exist
    })
  })

  xdescribe('set', () => {
    it('succeeds', async () => {
      const binding = { read: async length => new ArrayBuffer(length), write: async buffer => 64 }
      const sram = new MCP2221SRAM(binding)
      const res = await sram.set({  })
      expect(res).to.be.undefined
    })
  })
})
