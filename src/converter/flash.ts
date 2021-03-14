/* eslint-disable max-classes-per-file */
import { ReadFlashDataRequest, WriteFlashDataRequest, SendFlashAccessPasswordRequest } from '../messages/flash.request.js'
import { ReadFlashDataResponse, WriteFlashDataResponse, SendFlashAccessPasswordResponse } from '../messages/flash.response.js'
import { Converter } from './converter'

export class ReadFlashDataResponseCoder {
  static encode(res: ReadFlashDataResponse): ArrayBuffer { throw new Error('unused') }
  static decode(buffer: ArrayBuffer): ReadFlashDataResponse {
    throw new Error('invalid')
  }
}

export class ReadFlashDataRequestCoder {
  static encode(req: ReadFlashDataRequest): ArrayBuffer {
    return Uint8ClampedArray.from([
      0xB0,

    ])
  }
  static decode(buffer: ArrayBuffer): ReadFlashDataRequest { throw new Error('unused') }
}

export class WriteFlashDataResponseCoder {
  static encode(res: WriteFlashDataResponse): ArrayBuffer { throw new Error('unused') }
  static decode(buffer: ArrayBuffer): WriteFlashDataResponse {
    throw new Error('invalid')
  }
}

export class WriteFlashDataRequestCoder {
  static encode(req: WriteFlashDataRequest): ArrayBuffer {
    return Uint8ClampedArray.from([
      0xB1,

    ])
  }
  static decode(buffer: ArrayBuffer): WriteFlashDataRequest { throw new Error('unused') }
}

export class SendFlashAccessPasswordResponseCoder {
  static encode(res: SendFlashAccessPasswordResponse): ArrayBuffer { throw new Error('unused') }
  static decode(buffer: ArrayBuffer): SendFlashAccessPasswordResponse {
    throw new Error('invalid')
  }
}

export class SendFlashAccessPasswordRequestCoder {
  static encode(req: SendFlashAccessPasswordRequest): ArrayBuffer {
    return Uint8ClampedArray.from([
      0xB2,

    ])
  }
  static decode(buffer: ArrayBuffer): SendFlashAccessPasswordRequest { throw new Error('unused') }
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