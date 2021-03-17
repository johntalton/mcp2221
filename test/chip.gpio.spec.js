import { describe, it } from 'mocha'
import { expect } from 'chai'

// import { StatusParametersResponse } from '../src'
import { MCP2221Gpio } from '@johntalton/mcp2221/bindings'

const RESPONSE_GPIO_GET = Uint8Array.from([])
  .buffer



describe('MCP2221Gpio', () => {
  describe('constructor', () => {
    it('succeeds', () => {
      const binding = undefined
      const common = new MCP2221Gpio(binding)
      expect(common).to.not.be.undefined
      expect(common).to.be.instanceOf(MCP2221Gpio)
    })
  })

  describe('get', () => {
    it('succeeds', async () => {
      const binding = { read: async length => RESPONSE_GPIO_GET, write: async buffer => 64 }
      const gpio = new MCP2221Gpio(binding)
      const res = await gpio.get({  })
      expect(res).to.be.undefined
    })
  })

  describe('set', () => {
    it('succeeds', async () => {
      const binding = { read: async length => RESPONSE_GPIO_SET, write: async buffer => 64 }
      const gpio = new MCP2221Gpio(binding)
      const res = await common.set({  })
      expect(res).to.not.be.undefined
      expect(res).to.be.exist
    })
  })
})
