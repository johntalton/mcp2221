import { describe, it } from 'mocha'
import { expect } from 'chai'

// import { StatusParametersResponse } from '../src'
import { MCP2221Flash } from '@johntalton/mcp2221/bindings'

const RESPONSE_FLASH_WRITE = Uint8Array.from(
  []
  .concat(Array.from({ length: 64 }))
).buffer

const RESPONSE_FLASH_SET_PASSWORD = Uint8Array.from(
  [ 0xB2, 0x00 ]
  .concat(Array.from({ length: 62 }))
).buffer

const RESPONSE_FLASH_SET_PASSWORD_NOT_ALLOWED = Uint8Array.from(
  [ 0xB2, 0x03 ]
  .concat(Array.from({ length: 62 }))
).buffer

const RESPONSE_FLASH_READ_CHIP_SETTINGS = Uint8Array.from([ 0xB0, 0x00 ].concat(Array.from({ length: 62 }))).buffer
const RESPONSE_FLASH_READ_GP_SETTINGS = Uint8Array.from([ 0xB0, 0x00 ].concat(Array.from({ length: 62 }))).buffer
const RESPONSE_FLASH_READ_USB_MANUFACTURER = Uint8Array.from([ 0xB0, 0x00 ].concat(Array.from({ length: 62 }))).buffer
const RESPONSE_FLASH_READ_USB_PRODUCT = Uint8Array.from([ 0xB0, 0x00 ].concat(Array.from({ length: 62 }))).buffer
const RESPONSE_FLASH_READ_USB_SERIAL_NUMBER = Uint8Array.from([ 0xB0, 0x00 ].concat(Array.from({ length: 62 }))).buffer
const RESPONSE_FLASH_READ_FACTORY_SERIAL_NUMBER = Uint8Array.from([ 0xB0, 0x00 ].concat(Array.from({ length: 62 }))).buffer
const RESPONSE_FLASH_READ_UNSUPPORTED = Uint8Array.from([ 0xB0, 0x01 ].concat(Array.from({ length: 62 }))).buffer


describe('MCP2221Flash', () => {
  describe('constructor', () => {
    it('succeeds', () => {
      const binding = undefined
      const common = new MCP2221Flash(binding)
      expect(common).to.not.be.undefined
      expect(common).to.be.instanceOf(MCP2221Flash)
    })
  })

  xdescribe('read', () => {
    it('should read chip settings', async () => {
      const binding = { read: async length => RESPONSE_FLASH_READ_CHIP_SETTINGS, write: async buffer => 64 }
      const flash = new MCP2221Flash(binding)
      const res = await flash.read({  })
      expect(res).to.not.be.undefined
    })

    it('should read gp settings', async () => {
      const binding = { read: async length => RESPONSE_FLASH_READ_GP_SETTINGS, write: async buffer => 64 }
      const flash = new MCP2221Flash(binding)
      const res = await flash.read({  })
      expect(res).to.not.be.undefined
    })

    it('should read usb manufacturer', async () => {
      const binding = { read: async length => RESPONSE_FLASH_READ_USB_MANUFACTURER, write: async buffer => 64 }
      const flash = new MCP2221Flash(binding)
      const res = await flash.read({  })
      expect(res).to.not.be.undefined
    })

    it('should read usb product', async () => {
      const binding = { read: async length => RESPONSE_FLASH_READ_USB_PRODUCT, write: async buffer => 64 }
      const flash = new MCP2221Flash(binding)
      const res = await flash.read({  })
      expect(res).to.not.be.undefined
    })

    it('should read usb sn', async () => {
      const binding = { read: async length => RESPONSE_FLASH_READ_USB_SERIAL_NUMBER, write: async buffer => 64 }
      const flash = new MCP2221Flash(binding)
      const res = await flash.read({  })
      expect(res).to.not.be.undefined
    })

    it('should read factory sn', async () => {
      const binding = { read: async length => RESPONSE_FLASH_READ_FACTORY_SERIAL_NUMBER, write: async buffer => 64 }
      const flash = new MCP2221Flash(binding)
      const res = await flash.read({  })
      expect(res).to.not.be.undefined
    })

    it('should read unsupported', async () => {
      const binding = { read: async length => RESPONSE_FLASH_READ_UNSUPPORTED, write: async buffer => 64 }
      const flash = new MCP2221Flash(binding)
      const res = await flash.read({  })
      expect(res).to.not.be.undefined
    })
  })

  xdescribe('write', () => {
    it('succeeds', async () => {
      const binding = { read: async length => RESPONSE_FLASH_WRITE, write: async buffer => 64 }
      const flash = new MCP2221Flash(binding)
      const res = await flash.write({  })
      expect(res).to.not.be.undefined
      expect(res).to.be.exist
    })
  })

  xdescribe('sendPassword', () => {
    it('should send password successfully', async () => {
      const binding = { read: async length => RESPONSE_FLASH_SET_PASSWORD, write: async buffer => 64 }
      const flash = new MCP2221Flash(binding)
      const res = await flash.sendPassword({  })
      expect(res).to.not.be.undefined
      expect(res).to.be.exist
    })

    it('should send password not allowed', async () => {
      const binding = { read: async length => RESPONSE_FLASH_SET_PASSWORD_NOT_ALLOWED, write: async buffer => 64 }
      const flash = new MCP2221Flash(binding)
      const res = await flash.sendPassword({  })
      expect(res).to.not.be.undefined
      expect(res).to.be.exist
    })
  })
})
