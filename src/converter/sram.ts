import { SetSRAMSettingsRequest, GetSRAMSettingsRequest } from '../messages/sram.request.js'
import { SetSRAMSettingsResponse, GetSRAMSettingsResponse } from '../messages/sram.response.js'
import { Converter, DecoderBufferSource } from './converter.js'

export class SetSRAMSettingsResponseCoder {
  static encode(msg: SetSRAMSettingsResponse): ArrayBuffer { throw new Error('unused') }
  static decode(bufferSource: DecoderBufferSource): SetSRAMSettingsResponse {
    throw new Error('invalid')
  }
}

export class SetSRAMSettingsRequestCoder {
  static encode(msg: SetSRAMSettingsRequestCoder): ArrayBuffer {
    return Uint8ClampedArray.from([
      0x60,

    ])
  }
  static decode(buffefSource: DecoderBufferSource): SetSRAMSettingsRequest { throw new Error('unused') }
}

export class GetSRAMSettingsResponseCoder {
  static encode(msg: GetSRAMSettingsResponse): ArrayBuffer { throw new Error('unused') }
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
      0x61,

    ])
  }
  static decode(bufferSource: DecoderBufferSource): GetSRAMSettingsRequest { throw new Error('unused') }
}


export const SetSRAMSettings: Converter<SetSRAMSettingsRequest, SetSRAMSettingsResponse> = {
  to: SetSRAMSettingsResponseCoder.decode,
  from: SetSRAMSettingsRequestCoder.encode
}

export const GetSRAMSettings: Converter<GetSRAMSettingsRequest, GetSRAMSettingsResponse> = {
  to: GetSRAMSettingsResponseCoder.decode,
  from: GetSRAMSettingsRequestCoder.encode
}
