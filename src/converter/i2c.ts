/* eslint-disable fp/no-nil */
/* eslint-disable fp/no-class */
/* eslint-disable max-classes-per-file */
import { I2CWriteDataRequest, I2CWriteDataRepeatedSTARTRequest, I2CWriteDataNoSTOPRequest, I2CReadDataRequest, I2CReadDataRepeatedSTARTRequest, I2CReadGetDataRequest } from '../messages/i2c.request.js'
import { I2CWriteDataResponse, I2CWriteDataRepeatedSTARTResponse, I2CWriteDataNoSTOPResponse, I2CReadDataResponse, I2CReadDataRepeatedSTARTResponse, I2CReadGetDataResponse } from '../messages/i2c.response.js'
import { Converter, DecoderBufferSource } from './converter.js'

export class I2CWriteDataResponseCoder {
  static encode(msg: I2CWriteDataResponse): ArrayBuffer { throw new Error('unused') }
  static decode(bufferSource: DecoderBufferSource): I2CWriteDataResponse {
    throw new Error('invalid')
  }
}

export class I2CWriteDataRequestCoder {
  static encode(msg: I2CWriteDataRequest): ArrayBuffer {
    return Uint8ClampedArray.from([
      0x90,

    ])
  }
  static decode(bufferSource: DecoderBufferSource): I2CWriteDataRequest { throw new Error('unused') }
}

export class I2CWriteDataRepeatedSTARTResponseCoder {
  static encode(msg: I2CWriteDataRepeatedSTARTResponse): ArrayBuffer { throw new Error('unused') }
  static decode(bufferSource: DecoderBufferSource): I2CWriteDataRepeatedSTARTResponse {
    throw new Error('invalid')
  }
}

export class I2CWriteDataRepeatedSTARTRequestCoder {
  static encode(msg: I2CWriteDataRepeatedSTARTRequest): ArrayBuffer {
    return Uint8ClampedArray.from([
      0x92,

    ])
  }
  static decode(bufferSource: DecoderBufferSource): I2CWriteDataRepeatedSTARTRequest { throw new Error('unused') }
}

export class I2CWriteDataNoSTOPResponseCoder {
  static encode(msg: I2CWriteDataNoSTOPResponse): ArrayBuffer { throw new Error('unused') }
  static decode(bufferSource: DecoderBufferSource): I2CWriteDataNoSTOPResponse {
    throw new Error('invalid')
  }
}

export class I2CWriteDataNoSTOPRequestCoder {
  static encode(msg: I2CWriteDataNoSTOPRequest): ArrayBuffer {
    return Uint8ClampedArray.from([
      0x94,

    ])
  }
  static decode(bufferSource: DecoderBufferSource): I2CWriteDataNoSTOPRequest { throw new Error('unused') }
}

export class I2CReadDataResponseCoder {
  static encode(msg: I2CReadDataResponse): ArrayBuffer { throw new Error('unused') }
  static decode(bufferSource: DecoderBufferSource): I2CReadDataResponse {
    const dv = ArrayBuffer.isView(bufferSource) ?
      new DataView(bufferSource.buffer, bufferSource.byteOffset, bufferSource.byteLength) :
      new DataView(bufferSource)

    const command = dv.getUint8(0)
    const statusCode = dv.getUint8(1)

    if(command !== 0x91) { throw new Error('invalid command byte decoded') }
    if(statusCode !== 0x00) {
      if(statusCode === 0x01) {
        // 2C Engine is busy (command not completed)
        return {
          opaque: '__busy__',
          command,
          status: 'busy',
          statusCode
        }
      }
      throw new Error('invalid statusCode')
    }

    const userData = new Uint8Array(dv.buffer, dv.byteOffset + 3)

    return {
      opaque: '__its_getting_closer__',
      command,
      status: 'success',
      statusCode,

      buffer: userData.slice().buffer
    }
  }
}

export class I2CReadDataRequestCoder {
  static encode(msg: I2CReadDataRequest): ArrayBuffer {
    const buffer = new ArrayBuffer(64)
    const dv = new DataView(buffer)
    dv.setUint8(0, 0x91)
    dv.setUint16(3, msg.length, true)
    dv.setUint8(3, msg.address)

    return buffer
  }
  static decode(bufferSource: DecoderBufferSource): I2CReadDataRequest { throw new Error('unused') }
}

export class I2CReadDataRepeatedSTARTResponseCoder {
  static encode(msg: I2CReadDataRepeatedSTARTResponse): ArrayBuffer { throw new Error('unused') }
  static decode(bufferSource: DecoderBufferSource): I2CReadDataRepeatedSTARTResponse {
    throw new Error('invalid')
  }
}

export class I2CReadDataRepeatedSTARTRequestCoder {
  static encode(msg: I2CReadDataRepeatedSTARTRequest): ArrayBuffer {
    return Uint8Array.from([
      0x93,

    ])
  }
  static decode(bufferSource: DecoderBufferSource): I2CReadDataRepeatedSTARTRequest { throw new Error('unused') }
}

export class I2CReadGetDataResponseCoder {
  static encode(msg: I2CReadGetDataResponse): ArrayBuffer { throw new Error('unused') }
  static decode(bufferSource: DecoderBufferSource): I2CReadGetDataResponse {
    const dv = ArrayBuffer.isView(bufferSource) ?
      new DataView(bufferSource.buffer, bufferSource.byteOffset, bufferSource.byteLength) :
      new DataView(bufferSource)

    const command = dv.getUint8(0)
    const statusCode = dv.getUint8(1)

    if(command !== 0x40) { throw new Error('invalid command byte decoded') }
    if(statusCode !== 0x00) {
      if(statusCode === 0x41) {
        //Error reading the I2C slave data from the I2C engine
        return {
          opaque: '__i2c_engine_error__',
          command,
          status: 'error',
          statusCode
        }
      }
      throw new Error('invalid statusCode: ' + statusCode)
    }

    const _reserved = dv.getUint8(2)
    const byteLength = dv.getUint8(3)

    if(byteLength < 0 || byteLength > 60) { throw new Error('invalid byte length: ' + byteLength) }

    const userData = new Uint8Array(dv.buffer, dv.byteOffset + 4, byteLength)

    return {
      opaque: '__sorta__',
      command,
      status: 'success',
      statusCode,
      buffer: userData.slice().buffer
    }
  }
}

export class I2CReadGetDataRequestCoder {
  static encode(msg: I2CReadGetDataRequest): ArrayBuffer {
    return Uint8Array.from([
      0x40
    ])
  }
  static decode(bufferSource: DecoderBufferSource): I2CReadGetDataRequest { throw new Error('unused') }
}


export const I2CWriteData: Converter<I2CWriteDataRequest, I2CWriteDataResponse> = {
  to: I2CWriteDataResponseCoder.decode,
  from: I2CWriteDataRequestCoder.encode
}

export const I2CWriteDataRepeatedSTART: Converter<I2CWriteDataRepeatedSTARTRequest, I2CWriteDataRepeatedSTARTResponse> = {
  to: I2CWriteDataRepeatedSTARTResponseCoder.decode,
  from: I2CWriteDataRepeatedSTARTRequestCoder.encode
}

export const I2CWriteDataNoSTOP: Converter<I2CWriteDataNoSTOPRequest, I2CWriteDataNoSTOPResponse> = {
  to: I2CWriteDataNoSTOPResponseCoder.decode,
  from: I2CWriteDataNoSTOPRequestCoder.encode
}


export const I2CReadData: Converter<I2CReadDataRequest, I2CReadDataResponse> = {
  to: I2CReadDataResponseCoder.decode,
  from: I2CReadDataRequestCoder.encode
}

export const I2CReadDataRepeatedSTART: Converter<I2CReadDataRepeatedSTARTRequest, I2CReadDataRepeatedSTARTResponse> = {
  to: I2CReadDataRepeatedSTARTResponseCoder.decode,
  from: I2CReadDataRepeatedSTARTRequestCoder.encode
}

export const I2CReadGetData: Converter<I2CReadGetDataRequest, I2CReadGetDataResponse> = {
  to: I2CReadGetDataResponseCoder.decode,
  from: I2CReadGetDataRequestCoder.encode
}
