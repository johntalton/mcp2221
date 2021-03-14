/* eslint-disable max-classes-per-file */
import { ReadFlashDataRequest, WriteFlashDataRequest, SendFlashAccessPasswordRequest } from '../messages/flash.request.js'
import { ReadFlashDataResponse, WriteFlashDataResponse, SendFlashAccessPasswordResponse } from '../messages/flash.response.js'
import { Converter, DecoderBufferSource } from './converter.js'

export class ReadFlashDataResponseCoder {
  static encode(res: ReadFlashDataResponse): ArrayBuffer { throw new Error('unused') }
  static decode(bufferSource: DecoderBufferSource): ReadFlashDataResponse {
    throw new Error('invalid')
  }
}

export class ReadFlashDataRequestCoder {
  static encode(req: ReadFlashDataRequest): ArrayBuffer {
    return Uint8ClampedArray.from([
      0xB0
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
