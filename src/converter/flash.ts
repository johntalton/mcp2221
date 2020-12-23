import { encode } from 'punycode'
import { ReadFlashDataRequest, WriteFlashDataRequest, SendFlashAccessPasswordRequest } from '../messages/flash.request'
import { ReadFlashDataResponse, WriteFlashDataResponse, SendFlashAccessPasswordResponse } from '../messages/flash.response'
import { Converter } from './converter'

export class ReadFlashDataResponseCoder {
  static encode(res: ReadFlashDataResponse): ArrayBuffer { throw new Error('unused') }
  static decode(buffer: ArrayBuffer): ReadFlashDataResponse {
    return {
      opaque: '__invalid__'
    }
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
    return {
      opaque: '__invalid__'
    }
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
    return {
      opaque: '__invalid__'
    }
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