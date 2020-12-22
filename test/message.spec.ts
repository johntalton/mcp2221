import { describe, it } from 'mocha'
import { expect } from 'chai'

import {
  StatusParametersRequest, ResetChipRequest,
  GetGPIOValuesRequest, SetGPIOOutputValuesRequest,
  I2CWriteDataRequest, I2CWriteDataRepeatedSTARTRequest, I2CWriteDataNoSTOPRequest,
  I2CReadDataRequest, I2CReadDataRepeatedSTARTRequest, I2CReadGetDataRequest,
  GetSRAMSettingsRequest, SetSRAMSettingsRequest,
  ReadFlashDataRequest, WriteFlashDataRequest, SendFlashAccessPasswordRequest
} from '../'

describe('Message', () => {
  describe('Request', () => {
    describe('Common', () => {
      it('type StatusParametersRequest', () => {
        const foo: StatusParametersRequest = {
          opaque: '',
          command: 0x10
        }
        expect(foo).to.exist
      })

      it('type ResetChipRequest', () => {
        const foo: ResetChipRequest = {
          ...{ magic: [ 0xAB, 0xCD, 0xEF ] },
          opaque: '',
          command: 0x70
        }
        expect(foo).to.exist
      })
    })

    describe('Gpio', () => {
      it('type SetGPIOOutputValuesRequest', () => {
        const foo: SetGPIOOutputValuesRequest = {
          opaque: '',
          command: 0x50
        }
        expect(foo).to.exist
      })

      it('type GetGPIOValuesRequest', () => {
        const foo: GetGPIOValuesRequest = {
          opaque: '',
          command: 0x51
        }
        expect(foo).to.exist
      })
    })

    describe('I²C', () => {
      it('type I2CWriteDataRequest', () => {
        const foo: I2CWriteDataRequest = {
          opaque: '',
          command: 0x90,

          address: 0x00,
          buffer: Uint8Array.from([ 3, 5, 7 ])
        }
        expect(foo).to.exist
      })

      it('type I2CWriteDataRepeatedSTARTRequest', () => {
        const foo: I2CWriteDataRepeatedSTARTRequest= {
          opaque: '',
          command: 0x92,

          address: 0x00,
          buffer: Uint8Array.from([ 3, 5, 7 ])
        }
        expect(foo).to.exist
      })

      it('type I2CWriteDataNoSTOPRequest', () => {
        const foo: I2CWriteDataNoSTOPRequest = {
          opaque: '',
          command: 0x94,

          address: 0x00,
          buffer: Uint8Array.from([ 3, 5, 7 ])
        }
        expect(foo).to.exist
      })

      it('type I2CReadDataRequest', () => {
        const foo: I2CReadDataRequest= {
          opaque: '',
          command: 0x91,

          address: 0x00,
          length: 0
        }
        expect(foo).to.exist
      })

      it('type I2CReadDataRepeatedSTARTRequest', () => {
        const foo: I2CReadDataRepeatedSTARTRequest = {
          opaque: '',
          command: 0x93,

          address: 0x00,
          length: 0
        }
        expect(foo).to.exist
      })

      it('type I2CReadGetDataRequest', () => {
        const foo: I2CReadGetDataRequest = {
          opaque: '',
          command: 0x40,

          address: 0x00
        }
        expect(foo).to.exist
      })
    })

    describe('SRAM', () => {
      it('type SetSRAMSettingsRequest', () => {
        const foo: SetSRAMSettingsRequest  = {
          opaque: '',
          command: 0x60,

          gp: {
          }
        }
        expect(foo).to.exist
      })

      it('type GetSRAMSettingsRequest', () => {
        const foo: GetSRAMSettingsRequest = {
          opaque: '',
          command: 0x61
        }
        expect(foo).to.exist
      })
    })

    describe('Flash', () => {
      it('type ReadFlashDataRequest', () => {
        const foo: ReadFlashDataRequest = {
          opaque: '',
          command: 0xB0,
          subCommand: 0xFF
        }
        expect(foo).to.exist
      })

      it('type WriteFlashDataRequest', () => {
        const foo: WriteFlashDataRequest = {
          opaque: '',
          command: 0xB1,
          subCommand: 0xFF
        }
        expect(foo).to.exist
      })

      it('type SendFlashAccessPasswordRequest', () => {
        const foo: SendFlashAccessPasswordRequest = {
          opaque: '',
          command: 0xB2,
          password: 'P@$$\/\/0rD'
        }
        expect(foo).to.exist
      })
    })
  })
})
