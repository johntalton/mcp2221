import { describe, it } from 'mocha'
import { expect } from 'chai'

/*
import {
  Common, Flash, Gpio, I2C, SRAM
} from '@johntalton/mcp2221'
*/

describe('Interface', () => {
  describe('Common', () => {
    describe('status', () => {
      it('conforms', async () => {
        const common /* : Common */ = {
          status: req => Promise.resolve({
            opaque: '',
            command: 0x10,
            status: 'success',
            statusCode: 0x00,

            i2c: {
              address: 0x00,
              requestedTransferLength: 0,

              transferredBytes: 0,
              dataBufferCounter: 0,
              communicationSpeedDivider: 0,
              timeoutMs: 0,

              SCL: 0,
              SDA: 0,

              pendingValue: 0
            },
            adc: {
              ch0: 0,
              ch1: 0,
              ch2: 0
            },
            interruptEdgeDetectorState: 0,

            revision: {
              hardware: { major: 'A', minor: '6' },
              firmware: { major: '1', minor: '1' }
            }
          }),
          reset: () => Promise.resolve()
        }

        const res = await common.status({ opaque: '', command: 0x10 })
      })
    })

    describe('reset', () => {
      it('conforms', async () => {
        const common /* : Common */ = {
          status: undefined,
          reset: req => Promise.resolve()
        }

        const res = await common.reset({ opaque: '' })
      })
    })
  })

  describe('Flash', () => {
    describe('read', () => {
      it('conforms', async () => {
        const flash /* : Flash */ = {
          read: async req => ({
            opaque: '',
            command: 0xB0,
            subCommand: 0x02,

            status: 'success',
            statusCode: 0x00,

            descriptor: 'this is it'
          }),
          write: undefined,
          sendPassword: undefined
        }

        const res = await flash.read({ opaque: '', command: 0xb0, subCommand: 0x02 })
      })
    })

    describe('write', () => {
      it('conforms', async () => {
        const flash /* : Flash */ = {
          read: undefined,
          write: req => Promise.resolve({
            opaque: '',
            command: 0xb1,
            status: 'success',
            statusCode: 0x00
          }),
          sendPassword: undefined
        }

        const res = await flash.write({ opaque: '', command: 0xb1, subCommand: 0x00 })
      })
    })

    describe('sendPassword', () => {
      it('conforms', async () => {
        const flash /* : Flash */ = {
          read: undefined,
          write: undefined,
          sendPassword: req => Promise.resolve({
            opaque: '',
            command: 0xb2,
            status: 'success',
            statusCode: 0x00
          })
        }

        const res = await flash.sendPassword({ opaque: '', command: 0xb2, password: 'Secret!' })
      })
    })
  })

  describe('Gpio', () => {
    describe('set', () => {
      it('conforms', async () => {
        const gpio /* : Gpio */ = {
          set: req => Promise.resolve({
            opaque: '',
            command: 0x50,
            status: 'success',
            statusCode: 0x00
          }),
          get: undefined
        }

        const res = await gpio.set({ opaque: '', command: 0x50 })
      })
    })

    describe('get', () => {
      it('conforms', async () => {
        const gpio /* : Gpio */ = {
          set: undefined,
          get: req => Promise.resolve({
            opaque: '',
            command: 0x51,
            status: 'success',
            statusCode: 0x00
          })
        }

        const res = await gpio.get({ opaque: '', command: 0x51 })
      })
    })
  })

  describe('I²C', () => {
    describe('writeData', () => {
      it('conforms', async () => {
        const i2c /* : I2C */ = {
          writeData: req => Promise.resolve({
            opaque: '',
            command: 0x90,
            address: 0xFF,
            status: 'success',
            statusCode: 0x00
          }),
          writeRepeatedSTART: undefined,
          writeNoSTOP: undefined,
          readData: undefined,
          readRepeatedSTART: undefined,
          readGetData: undefined
        }

        const res = await i2c.writeData({ opaque: '', command: 0x90, address: 0xFF, buffer: new Uint8Array() })
      })
    })

    describe('writeRepeatedSTART', () => {
      it('conforms', async () => {
        const i2c /* : I2C */ = {
          writeData: undefined,
          writeRepeatedSTART: req => Promise.resolve({
            opaque: '',
            command: 0x92,
            address: 0xFF,
            status: 'success',
            statusCode: 0x00
          }),
          writeNoSTOP: undefined,
          readData: undefined,
          readRepeatedSTART: undefined,
          readGetData: undefined
        }

        const res = await i2c.writeRepeatedSTART({ opaque: '', command: 0x92, address: 0xFF, buffer: new Uint8Array() })
      })
    })

    describe('writeNoSTOP', () => {
      it('conforms', async () => {
        const i2c /* : I2C */ = {
          writeData: undefined,
          writeRepeatedSTART: undefined,
          writeNoSTOP: req => Promise.resolve({
            opaque: '',
            command: 0x94,
            address: 0xFF,
            status: 'success',
            statusCode: 0x00
          }),
          readData: undefined,
          readRepeatedSTART: undefined,
          readGetData: undefined
        }

        const res = await i2c.writeNoSTOP({ opaque: '', command: 0x94, address: 0xFF, buffer: new Uint8Array() })
      })
    })

    describe('readData', () => {
      it('conforms', async () => {
        const i2c /* : I2C */ = {
          writeData: undefined,
          writeRepeatedSTART: undefined,
          writeNoSTOP: undefined,
          readData: req => Promise.resolve({
            opaque: '',
            command: 0x91,
            address: 0xFF,
            status: 'success',
            statusCode: 0x00,

            buffer: new Uint8Array(req.length)
          }),
          readRepeatedSTART: undefined,
          readGetData: undefined
        }

        const res = await i2c.readData({ opaque: '', command: 0x91, address: 0xFF, length: 0 })
      })
    })

    describe('readRepeatedSTART', () => {
      it('conforms', async () => {
        const i2c /* : I2C */ = {
          writeData: undefined,
          writeRepeatedSTART: undefined,
          writeNoSTOP: undefined,
          readData: undefined,
          readRepeatedSTART: req => Promise.resolve({
            opaque: '',
            command: 0x93,
            address: 0xFF,
            status: 'success',
            statusCode: 0x00,

            buffer: new Uint8Array(req.length)
          }),
          readGetData: undefined
        }

        const res = await i2c.readRepeatedSTART({ opaque: '', command: 0x93, address: 0xFF, length: 0 })
      })
    })

    describe('readGetData', () => {
      it('conforms', async () => {
        const i2c /* : I2C */ = {
          writeData: undefined,
          writeRepeatedSTART: undefined,
          writeNoSTOP: undefined,
          readData: undefined,
          readRepeatedSTART: undefined,
          readGetData: req => Promise.resolve({
            opaque: '',
            command: 0x40,
            address: 0xFF,
            status: 'success',
            statusCode: 0x00
          })
        }

        const res = await i2c.readGetData({ opaque: '', command: 0x40, address: 0xFF })
      })
    })
  })

  describe('SRAM', () => {
    describe('set', () => {
      it('conforms', async () => {
        const sram /* : SRAM */ = {
          set: req => Promise.resolve({
            opaque: '',
            command: 0x60,
            status: 'success',
            statusCode: 0x00
          }),
          get: undefined
        }

        const res = await sram.set({ opaque: '', command: 0x60, gp: {} })
      })
    })

    describe('get', () => {
      it('conforms', async () => {
        const sram /* : SRAM */ = {
          set: undefined,
          get: req => Promise.resolve({
            opaque: '',
            command: 0x61,
            status: 'success',
            statusCode: 0x00,

            usb: {
              vendorId: 0,
              productId: 0,
              powerAttribute: 0,
              mARequested: 0
            },

            chip: {
              enabledCDCSerialEnumeration: false,

              uartLED: { tx: false, rx: false },
              i2cLED: false,
              SSPND: false,
              USBCFG: false,

              security: 'unsecured'
            },

            password: 'passWrd',

            gp: {
              clockDivider: 0,
              dac: {
                referenceVoltage: 'Off',
                referenceOptions: 'Vdd',
                initialValue: 1
              },
              adc: {
                referenceVoltage: 'Off',
                referenceOptions: 'Vdd'
              },
              interrupt: {
                edge: 'both'
              },
            },

            gpio0: {
              outputValue: 1,
              direction: 'in',
              designation: 'Gpio'
            },
            gpio1: {
              outputValue: 1,
              direction: 'in',
              designation: 'Gpio'
            },
            gpio2: {
              outputValue: 1,
              direction: 'in',
              designation: 'Gpio'
            },
            gpio3: {
              outputValue: 1,
              direction: 'in',
              designation: 'Gpio'
            }
          })
        }

        const res = await sram.get({ opaque: '', command: 0x61 })
      })
    })
  })
})