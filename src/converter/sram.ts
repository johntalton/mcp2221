/* eslint-disable no-undefined */
/* eslint-disable fp/no-unused-expression */
/* eslint-disable no-magic-numbers */
/* eslint-disable sort-imports */
import { BitSmush } from '@johntalton/bitsmush'

import { SetSRAMSettingsRequest, GetSRAMSettingsRequest } from '../messages/sram.request.js'
import { SetSRAMSettingsResponse, GetSRAMSettingsResponse } from '../messages/sram.response.js'
import { Converter, DecoderBufferSource } from './converter.js'

export class SetSRAMSettingsResponseCoder {
  static encode(_msg: SetSRAMSettingsResponse): ArrayBuffer { throw new Error('unused') }
  static decode(bufferSource: DecoderBufferSource): SetSRAMSettingsResponse {
    const dv = ArrayBuffer.isView(bufferSource) ?
      new DataView(bufferSource.buffer, bufferSource.byteOffset, bufferSource.byteLength) :
      new DataView(bufferSource)

    const command = dv.getUint8(0)
    const statusCode = dv.getUint8(1)

    if(command !== 0x60) { throw new Error('invalid command byte decoded') }
    if(statusCode !== 0x00) {
      throw new Error('invalid statusCode')
    }

    //
    return {
      opaque: '__response_from_set__',
      command,
      status: 'success',
      statusCode
    }
  }
}

export class SetSRAMSettingsRequestCoder {
  static encode(msg: SetSRAMSettingsRequest): ArrayBuffer {
    const buffer = new ArrayBuffer(64)
    const dv = new DataView(buffer)

    const foo = {
      command: { offset: 0, value: 0x60 },

      dacVoltageReference: {
        offset: 3,
        bits: {
          enableUpdate: { smush: [], flag: true },
          referenceVoltage: { smush: [], enumeration: { '': '' } },
          referenceOptions: {}
        }
      }
      dacOutputValue: {

      }
    }

    foo.forEach(entry => {})

    dv.setUint8(0, 0x60)

    const hasClock = msg.clock !== undefined
    const clockOutputByte = hasClock ? 0 : 0
    dv.setUint8(2, clockOutputByte)

    function dacSettingsAlterByte(msg) {
      const hasDac = msg.gp?.dac !== undefined
      if(!hasDac) { return 0x00 }

      const enableUpdateBits = 0b1
      const voltageBits = 0
      const optionsBits = 0

      return BitSmush.smushBits(
        [ [ 7, 1 ], [ 2, 2 ], [ 0, 1 ] ],
        [ enableUpdateBits, voltageBits, optionsBits ])
    }
    const dacSettingsByte = dacSettingsAlterByte(msg)
    dv.setUint8(3, dacSettingsByte)

    const hasDacValue = msg.gp?.dac?.initialValue !== undefined
    const dacValueByte = hasDacValue ? 0 : 0
    dv.setUint8(4, dacValueByte)

    const hasAdcSettings = msg.gp?.adc?.referenceVoltage !== undefined
    const adcVoltageByte = hasAdcSettings ? 0 : 0
    dv.setUint8(5, adcVoltageByte)

    const hasInterrupt = msg.gp?.interrupt !== undefined
    const interruptByte = hasInterrupt ? 0 : 0
    dv.setUint8(6, interruptByte)

    const hasAnyGpio = msg.gpio0 !== undefined ||
      msg.gpio1 !== undefined ||
      msg.gpio2 !== undefined ||
      msg.gpio3 !== undefined

    const alterGpioByte = hasAnyGpio ? 0x80 : 0
    dv.setUint8(7, alterGpioByte)

    const hasGpio0 = msg.gpio0 !== undefined
    const gpio0Byte = hasGpio0 ? 0x08 : 0
    dv.setUint8(8, gpio0Byte)

    const hasGpio1 = msg.gpio1 !== undefined
    const gpio1Byte = hasGpio1 ? 0 : 0
    dv.setUint8(9, gpio1Byte)

    const hasGpio2 = msg.gpio2 !== undefined
    const gpio2Byte = hasGpio2 ? 0 : 0
    dv.setUint8(10, gpio2Byte)

    const hasGpio3 = msg.gpio3 !== undefined
    const gpio3Byte = hasGpio3 ? 0 : 0
    dv.setUint8(11, gpio3Byte)

    return buffer
  }
  static decode(_buffefSource: DecoderBufferSource): SetSRAMSettingsRequest { throw new Error('unused') }
}

export class GetSRAMSettingsResponseCoder {
  static encode(_msg: GetSRAMSettingsResponse): ArrayBuffer { throw new Error('unused') }
  static decode(bufferSource: DecoderBufferSource): GetSRAMSettingsResponse {
    const dv = ArrayBuffer.isView(bufferSource) ?
      new DataView(bufferSource.buffer, bufferSource.byteOffset, bufferSource.byteLength) :
      new DataView(bufferSource)

    const command = dv.getUint8(0)
    const statusCode = dv.getUint8(1)

    if(command !== 0x61) { throw new Error('invalid command byte decoded') }
    if(statusCode !== 0x00) {
      // if(statusCode === 0x01) {
      //   // Command not supported
      //   return {
      //     opaque: '__not_supported__',
      //     command,
      //     status: 'not-supported',
      //     statusCode
      //   }
      // }
      throw new Error('invalid statusCode')
    }

    const chipBytesLength = dv.getUint8(2)
    const gpBytesLength = dv.getUint8(3)
    const statusMaskByte = dv.getUint8(4)
    const clockOutputDividerByte = dv.getUint8(5)
    const dacStatusMaskByte = dv.getUint8(6)
    const adcStatusMaskByte = dv.getUint8(7)

    const usbVID = dv.getUint16(8, true)
    const usbPID = dv.getUint16(10, true)

    const powerAttribute = dv.getUint8(12)
    const mARequested = dv.getUint8(13)

    const password = new Uint8Array(dv.buffer, dv.byteOffset + 14, 8)

    const gpio0 = dv.getUint8(22)
    const gpio1 = dv.getUint8(23)
    const gpio2 = dv.getUint8(24)
    const gpio3 = dv.getUint8(25)

    console.log('************', gpio0)


    function dacAlterByteToSettings(dacSettingsMaskByte) {
      const result = BitSmush.unSmushBits([], dacStatusMaskByte)
      return {
        referenceVoltage: 0,
        referenceOptions: 0
      }
    }
    const dac =

    return {
      opaque: '__here_we_go__',
      command,
      status: 'success',
      statusCode,

      chip: {
        enabledCDCSerialEnumeration: false,
        uartLED: { rx: false, tx: false },
        i2cLED: false,
        SSPND: false,
        USBCFG: false,
        security: 'unsecured'
      },
      gp: {
        clockDivider: 0,
        dac: {
          referenceVoltage: 'Off',
          referenceOptions: 'Vdd',
          initialValue: 0
        },
        adc: {
          referenceVoltage: 'Off',
          referenceOptions: 'Vdd'
        },
        interrupt: {
          edge: 'both'
        }
      },
      usb: {
        vendorId: 0,
        productId: 0,
        powerAttribute: 0,
        mARequested: 0
      },

      password: String.fromCharCode(...password),

      gpio0: {
        outputValue: 0,
        direction: 'in',
        designation: 'Gpio'
      },
      gpio1: {
        outputValue: 0,
        direction: 'in',
        designation: 'Gpio'
      },
      gpio2: {
        outputValue: 0,
        direction: 'in',
        designation: 'Gpio'
      },
      gpio3: {
        outputValue: 0,
        direction: 'in',
        designation: 'Gpio'
      }
    }
  }
}

export class GetSRAMSettingsRequestCoder {
  static encode(msg: GetSRAMSettingsRequest): ArrayBuffer {
    return Uint8ClampedArray.from([
      0x61
    ])
  }
  static decode(_bufferSource: DecoderBufferSource): GetSRAMSettingsRequest { throw new Error('unused') }
}


export const SetSRAMSettings: Converter<SetSRAMSettingsRequest, SetSRAMSettingsResponse> = {
  to: SetSRAMSettingsResponseCoder.decode,
  from: SetSRAMSettingsRequestCoder.encode
}

export const GetSRAMSettings: Converter<GetSRAMSettingsRequest, GetSRAMSettingsResponse> = {
  to: GetSRAMSettingsResponseCoder.decode,
  from: GetSRAMSettingsRequestCoder.encode
}
