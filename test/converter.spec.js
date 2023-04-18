
import { describe, it } from 'mocha'
import { expect } from 'chai'

import {
  StatusParametersRequestCoder, StatusParametersResponseCoder,
  ResetChipRequestCoder, ResetChipResponseCoder,
  // ReadFlashDataRequestCoder, ReadFlashDataResponseCoder,
  // WriteFlashDataRequestCoder, WriteFlashDataResponseCoder,
  SendFlashAccessPasswordRequestCoder, SendFlashAccessPasswordResponseCoder,
  GetGPIOValuesRequestCoder, GetGPIOValuesResponseCoder,
  SetGPIOOutputValuesRequestCoder, SetGPIOOutputValuesResponseCoder,
  I2CReadDataRequestCoder, I2CReadDataResponseCoder,
  I2CReadDataRepeatedSTARTRequestCoder, I2CReadDataRepeatedSTARTResponseCoder,
  I2CReadGetDataRequestCoder, I2CReadGetDataResponseCoder,
  I2CWriteDataNoSTOPRequestCoder, I2CWriteDataNoSTOPResponseCoder,
  I2CWriteDataRequestCoder, I2CWriteDataResponseCoder,
  I2CWriteDataRepeatedSTARTRequestCoder, I2CWriteDataRepeatedSTARTResponseCoder,
  GetSRAMSettingsRequestCoder, GetSRAMSettingsResponseCoder,
  SetSRAMSettingsRequestCoder, SetSRAMSettingsResponseCoder
} from '@johntalton/mcp2221/coders'
// import { Coder } from '../src/converter/converter'
// import { Message } from '../src/messages/message'

/*
type Test<T> = {
  coder: Coder<T>
  buffer: ArrayBuffer
  message: T
}*/

function padZeros(count) {
  return new Array(count).fill(0)
}

const USB_MAJ_MIN = [
  'A'.charCodeAt(0),
  '6'.charCodeAt(0),
  '1'.charCodeAt(0),
  '1'.charCodeAt(0)
]

describe('Converter', () => {
  describe('encode & decode', () => {
    const matrix /* :Array<Test<any>> */ = [
      //
//      { coder: StatusParametersRequestCoder, buffer: Uint8Array.from([ 16, 0, 0, 0, 0 ]), message: { opaque: '' } },
 //     { coder: StatusParametersRequestCoder, buffer: Uint8Array.from([ 16, 0, 0x10, 0, 0 ]), message: { opaque: '', cancelI2c: true } },
      { coder: StatusParametersResponseCoder, buffer: Uint8Array.from([ 16, 0, ...padZeros(44), ...USB_MAJ_MIN, ...padZeros(20) ]), message:
        {
          opaque: '__kinda_mostly_close__',
          status: 'success', statusCode: 0,
          command: 0x10,
          interruptEdgeDetectorState: false,

          i2cState: 0,
          i2cStateName: 'IDLE',

          i2cCancelled: false,
          i2cClock: undefined,

          setSpeedByte: 0,
          setSpeedRequested: false,
          setSpeedSuccessfull: false,
          speedDividerByte: 0,

          adc: {
            ch0: 0,
            ch1: 0,
            ch2: 0
          },
          i2c: {
            ACKed: true,
            SCL: 0,
            SDA: 0,
            address: 0,
            communicationSpeedDivider: 0,
            dataBufferCounter: 0,
            pendingValue: 0,
            requestedTransferLength: 0,
            timeoutMs: 0,
            transferredBytes: 0,
          },

          revision: { firmware: { major: '1', minor: '1' }, hardware: { major: 'A', minor: '6'} }
        }
      },
      //
  //    { coder: ResetChipRequestCoder, buffer: Uint8Array.from([ 0x70, 0xAB, 0xCD, 0xEF ]), message: { opaque: '' } },
  //    { coder: ResetChipResponseCoder, buffer: Uint8Array.from([ ]), message: undefined },
      //
      // { coder: ReadFlashDataRequestCoder, buffer: Uint8Array.from([ 0xB0, 0x00 ]), message: { opaque: '' } },
      // { coder: ReadFlashDataRequestCoder, buffer: Uint8Array.from([ 0xB0, 0x00 ]), message: { opaque: '' } },
      // { coder: ReadFlashDataResponseCoder, buffer: Uint8Array.from([ 0xB0 ]), message: { opaque: '__invalid__' } },
      //
      // { coder: WriteFlashDataRequestCoder, buffer: Uint8Array.from([ 0xB1 ]), message: { opaque: '' } },
      // { coder: WriteFlashDataResponseCoder, buffer: Uint8Array.from([ 0xB1 ]), message: { opaque: '__invalid__' } },
      //
 //     { coder: SendFlashAccessPasswordRequestCoder, buffer: Uint8Array.from([ 0xB2 ]), message: { opaque: '' } },
 //     { coder: SendFlashAccessPasswordResponseCoder, buffer: Uint8Array.from([ 0xB2 ]), message: { opaque: '__invalid__' } },
      //
      // { coder: GetGPIOValuesRequestCoder, buffer: Uint8Array.from([ 0x51 ]), message: { opaque: '' } },
      // { coder: GetGPIOValuesRequestCoder, buffer: Uint8Array.from([ 0x51 ]), message: { opaque: '' } },
      // { coder: GetGPIOValuesRequestCoder, buffer: Uint8Array.from([ 0x51 ]), message: { opaque: '' } },
      // { coder: GetGPIOValuesRequestCoder, buffer: Uint8Array.from([ 0x51 ]), message: { opaque: '' } },
      // { coder: GetGPIOValuesRequestCoder, buffer: Uint8Array.from([ 0x51 ]), message: { opaque: '' } },
      // { coder: GetGPIOValuesRequestCoder, buffer: Uint8Array.from([ 0x51 ]), message: { opaque: '' } },
  //    { coder: GetGPIOValuesResponseCoder, buffer: Uint8Array.from([ 0x51 ]), message: { opaque: '__invalid__' } },
  //    { coder: GetGPIOValuesResponseCoder, buffer: Uint8Array.from([ 0x51 ]), message: { opaque: '__invalid__' } },
      //
 //     { coder: SetGPIOOutputValuesRequestCoder, buffer: Uint8Array.from([ 0x50 ]), message: { opaque: '' } },
 //     { coder: SetGPIOOutputValuesResponseCoder, buffer: Uint8Array.from([ 0x50, 0 ]), message: { opaque: '__invalid__' } },
      //
 //     { coder: I2CWriteDataRequestCoder, buffer: Uint8Array.from([ 0x90 ]), message: { opaque: '' } },
      { coder: I2CWriteDataResponseCoder, buffer: Uint8Array.from([ 0x90, 0, 0 ]), message: {
        command: 0x90,
        statusCode: 0,
        status: 'success',
        opaque: '__transparent_from_decoder__',

        i2cState: 0,
        i2cStateName: 'IDLE',
      } },
      //
 //     { coder: I2CWriteDataRepeatedSTARTRequestCoder, buffer: Uint8Array.from([ 0x92 ]), message: { opaque: '' } },
      { coder: I2CWriteDataRepeatedSTARTResponseCoder, buffer: Uint8Array.from([ 0x92, 0, 0 ]), message: {
        command: 0x92,
        statusCode: 0,
        status: 'success',
        opaque: '__transparent_from_decoder__',

        i2cState: 0,
        i2cStateName: 'IDLE',
      } },
      //
  //    { coder: I2CWriteDataNoSTOPRequestCoder, buffer: Uint8Array.from([ 0x94 ]), message: { opaque: '' } },
      { coder: I2CWriteDataNoSTOPResponseCoder, buffer: Uint8Array.from([ 0x94, 0, 0 ]), message: {
        command: 0x94,
        statusCode: 0,
        status: 'success',
        opaque: '__transparent_from_decoder__',

        i2cState: 0,
        i2cStateName: 'IDLE',
      } },
      //
 //     { coder: I2CReadDataRequestCoder, buffer: Uint8Array.from([ 0x91 ]), message: { opaque: '' } },
      { coder: I2CReadDataResponseCoder, buffer: Uint8Array.from([ 0x91, 0, 0 ]), message: {
        command: 0x91,
        statusCode: 0,
        status: 'success',
        opaque: '__transparent_from_decoder__',

        i2cState: 0,
        i2cStateName: 'IDLE',
      } },
      //
//      { coder: I2CReadDataRepeatedSTARTRequestCoder, buffer: Uint8Array.from([ 0x93 ]), message: { opaque: '' } },
      { coder: I2CReadDataRepeatedSTARTResponseCoder,
        buffer: Uint8Array.from([ 0x93, 0, 0 ]),
        message: {
          command: 0x93,
          statusCode: 0,
          status: 'success',
          opaque: '__transparent_from_decoder__',

          i2cState: 0,
          i2cStateName: 'IDLE',
        }
      },
      //
//      { coder: I2CReadGetDataRequestCoder, buffer: Uint8Array.from([ 0x40 ]), message: { opaque: '' } },
      { coder: I2CReadGetDataResponseCoder,
        buffer: Uint8Array.from([ 0x40, 0, 0, 0 ]),
        message: {
          command: 0x40,
          statusCode: 0,
          status: 'success',
          opaque: '__transparent_from_decoder__',

          i2cState: 0,
          i2cStateName: 'IDLE',
          readBackBytes: 0,

          validData: true,
          buffer: Uint8Array.from([]).buffer
        }
      },
      //
  //    { coder: GetSRAMSettingsRequestCoder, buffer: Uint8Array.from([ 0x61 ]), message: { opaque: '' } },
      { coder: GetSRAMSettingsResponseCoder,
        buffer: Uint8Array.from([ 0x61, 0, 18, 4, 0, 0b111, ...padZeros(20) ]),
        message: {
          command: 0x61,
          opaque: '__here_we_go__',
          status: 'success',
          statusCode: 0,
          password: '\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000',

          chip: {
            SSPND: 'off',
            USBCFG: 'off',
            enabledCDCSerialEnumeration: false,
            i2cLED: 'off',
            security: 'unsecured',
            uartLED: {
              rx: 'off',
              tx: 'off'
            }
          },

          gp: {
            adc: {
                referenceOptions: 'Vdd',
                referenceVoltage: 'Off'
              },
              clock: {
                divider: '375 kHz',
                dutyCycle: '0%'
              },
              dac: {
                initialValue: 0,
                referenceOptions: 'Vdd',
                referenceVoltage: 'Off'
              },
              interrupt: {
                edge: 'off'
              }
          },

          gpio0: {
            designation: 'Gpio',
            direction: 'out',
            outputValue: 0
          },
          gpio1: {
            designation: 'Gpio',
            direction: 'out',
            outputValue: 0
          },
          gpio2: {
            designation: 'Gpio',
            direction: 'out',
            outputValue: 0
          },
          gpio3: {
            designation: 'Gpio',
            direction: 'out',
            outputValue: 0
          },

          usb: {
            mARequested: 0,
            powerAttribute: 0,
            productId: 0,
            vendorId: 0
          }
        }
      },
      //
 //     { coder: SetSRAMSettingsRequestCoder, buffer: Uint8Array.from([ 0x60, 1 ]), message: { opaque: '' } },
      { coder: SetSRAMSettingsResponseCoder, buffer: Uint8Array.from([ 0x60, 0 ]), message:
        {
          command: 0x60,
          statusCode: 0,
          opaque: '__response_from_set__',
          status: 'success'
        }
      }
    ]

    matrix.forEach((test, i) => {
      const { coder, buffer, message } = test

      it('encode #' + i, async function() {
        try {
          const result = coder.encode(message)
          expect(new Uint8Array(result)).to.deep.equal(buffer)
        }
        catch(e) {
          if(e.message === 'unused') { this.skip() }
          throw e
        }
      })

      it('decode #' + i, async function() {
        try {
          const msg = coder.decode(buffer)
          expect(msg).to.deep.equal(message)
        }
        catch(e) {
          if(e.message === 'unused') { this.skip() }
          throw e
        }
      })
    })

  })
})