import { describe, it } from 'mocha'
import { expect } from 'chai'

// import { StatusParametersResponse } from '../src'
import { MCP2221I2C } from '@johntalton/mcp2221/bindings'

const RESPONSE_I2C_ = Uint8Array.from([].concat(Array.from({ length: 64 }))).buffer

const RESPONSE_I2C_WRITE_DATA = Uint8Array.from(
  [ 0x90, 0x00 ]
  .concat(Array.from({ length: 62 }))
).buffer

const RESPONSE_I2C_WRITE_DATA_BUSY = Uint8Array.from(
  [ 0x90, 0x01 ]
  .concat(Array.from({ length: 62 }))
).buffer

const RESPONSE_I2C_WRITE_NO_STOP = Uint8Array.from(
  [ 0x94, 0x01 ]
  .concat(Array.from({ length: 62 }))
).buffer





describe('MCP2221I2C', () => {
  describe('constructor', () => {
    it('succeeds', () => {
      const binding = undefined
      const common = new MCP2221I2C(binding)
      expect(common).to.not.be.undefined
      expect(common).to.be.instanceOf(MCP2221I2C)
    })
  })

  describe('writeData', () => {
    it('succeeds', async () => {
      const binding = { read: async length => RESPONSE_I2C_WRITE_DATA, write: async buffer => 64 }
      const i2c = new MCP2221I2C(binding)
      const res = await i2c.writeData({
        address: 0x00,
        buffer: new ArrayBuffer(13)
      })
      expect(res).to.not.be.undefined
      expect(res).to.be.exist
    })

    it('succeeds data busy', async () => {
      const binding = { read: async length => RESPONSE_I2C_WRITE_DATA_BUSY, write: async buffer => 64 }
      const i2c = new MCP2221I2C(binding)
      const res = await i2c.writeData({
        address: 0x00,
        buffer: new ArrayBuffer(13)
      })
      expect(res).to.not.be.undefined
      expect(res).to.be.exist
    })
  })

  describe('writeRepeatedSTART', () => {
    it('succeeds', async () => {
      const binding = { read: async length => RESPONSE_I2C_, write: async buffer => 64 }
      const i2c = new MCP2221I2C(binding)
      const res = await i2c.writeRepeatedSTART({
        address: 0x00,
        buffer: new ArrayBuffer(13)
      })
      expect(res).to.not.be.undefined
      expect(res).to.be.exist
    })
  })

  describe('writeNoSTOP', () => {
    it('succeeds', async () => {
      const binding = { read: async length => RESPONSE_I2C_WRITE_NO_STOP, write: async buffer => 64 }
      const i2c = new MCP2221I2C(binding)
      const res = await i2c.writeNoSTOP({
        address: 0x00,
        buffer: new ArrayBuffer(13)
      })
      expect(res).to.not.be.undefined
      expect(res).to.be.exist
    })
  })

  describe('readData', () => {
    it('succeeds', async () => {
      const binding = { read: async length => RESPONSE_I2C_, write: async buffer => 64 }
      const i2c = new MCP2221I2C(binding)
      const res = await i2c.readData({
        address: 0x00,
        length: 13
      })
      expect(res).to.not.be.undefined
      expect(res).to.be.exist
    })
  })


  describe('readRepeatedSTART', () => {
    it('succeeds', async () => {
      const binding = { read: async length => RESPONSE_I2C_, write: async buffer => 64 }
      const i2c = new MCP2221I2C(binding)
      const res = await i2c.readRepeatedSTART({
        address: 0x00,
        length: 13
      })
      expect(res).to.not.be.undefined
      expect(res).to.be.exist
    })
  })

  describe('readGetData', () => {
    it('succeeds', async () => {
      const binding = { read: async length => RESPONSE_I2C_, write: async buffer => 64 }
      const i2c = new MCP2221I2C(binding)
      const res = await i2c.readGetData({
        address: 0x00
      })
      expect(res).to.not.be.undefined
      expect(res).to.be.exist
    })
  })


})
