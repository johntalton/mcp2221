/* eslint-disable max-classes-per-file */
import { ReadFlashDataRequest, WriteFlashDataRequest, SendFlashAccessPasswordRequest } from '../messages/flash.request.js'
import { ReadFlashDataResponse, WriteFlashDataResponse, SendFlashAccessPasswordResponse } from '../messages/flash.response.js'
import { Converter, DecoderBufferSource } from './converter.js'

export class ReadFlashDataResponseCoder {
  static encode(res: ReadFlashDataResponse): ArrayBuffer { throw new Error('unused') }
  static decode(bufferSource: DecoderBufferSource): ReadFlashDataResponse {
    const dv = ArrayBuffer.isView(bufferSource) ?
      new DataView(bufferSource.buffer, bufferSource.byteOffset, bufferSource.byteLength) :
      new DataView(bufferSource)

    const command = dv.getUint8(0)
    const statusCode = dv.getUint8(1)

    if(command !== 0xB0) { throw new Error('invalid command byte decoded') }
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

    const byteLength = dv.getUint8(2)
    const statusMaskByte = dv.getUint8(3)

    return {
      opaque: '__can_you_guess__',
      command,
      status: 'success',
      statusCode,

      subCommand: 0x00,

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
      }
    }
  }
}

export class ReadFlashDataRequestCoder {
  static encode(req: ReadFlashDataRequest): ArrayBuffer {
    return Uint8ClampedArray.from([
      0xB0, req.subCommand
    ])
  }
  static decode(bufferSource: DecoderBufferSource): ReadFlashDataRequest { throw new Error('unused') }
}

export class WriteFlashDataResponseCoder {
  static encode(res: WriteFlashDataResponse): ArrayBuffer { throw new Error('unused') }
  static decode(bufferSource: DecoderBufferSource): WriteFlashDataResponse {
    throw new Error('invalid')
  }
}

export class WriteFlashDataRequestCoder {
  static encode(req: WriteFlashDataRequest): ArrayBuffer {
    return Uint8ClampedArray.from([
      0xB1
    ])
  }
  static decode(bufferSource: DecoderBufferSource): WriteFlashDataRequest { throw new Error('unused') }
}

export class SendFlashAccessPasswordResponseCoder {
  static encode(res: SendFlashAccessPasswordResponse): ArrayBuffer { throw new Error('unused') }
  static decode(bufferSource: DecoderBufferSource): SendFlashAccessPasswordResponse {
    throw new Error('invalid')
  }
}

export class SendFlashAccessPasswordRequestCoder {
  static encode(req: SendFlashAccessPasswordRequest): ArrayBuffer {
    return Uint8ClampedArray.from([
      0xB2
    ])
  }
  static decode(bufferSource: DecoderBufferSource): SendFlashAccessPasswordRequest { throw new Error('unused') }
}

export const ReadFlashData: Converter<ReadFlashDataRequest, ReadFlashDataResponse> = {
  to: ReadFlashDataResponseCoder.decode,
  from: ReadFlashDataRequestCoder.encode
}

export const WriteFlashData: Converter<WriteFlashDataRequest, WriteFlashDataResponse> = {
  to: WriteFlashDataResponseCoder.decode,
  from: WriteFlashDataRequestCoder.encode
}

export const SendFlashAccessPassword: Converter<SendFlashAccessPasswordRequest, SendFlashAccessPasswordResponse> = {
  to: SendFlashAccessPasswordResponseCoder.decode,
  from: SendFlashAccessPasswordRequestCoder.encode
}
