import { ReadFlashDataRequest, WriteFlashDataRequest, SendFlashAccessPasswordRequest } from '../messages/flash.request'
import { ReadFlashDataResponse, WriteFlashDataResponse, SendFlashAccessPasswordResponse } from '../messages/flash.response'

export class ReadFlashData {
  static to(buffer: ArrayBuffer): ReadFlashDataResponse {
    throw new Error('no impl')
  }

  static from(req: ReadFlashDataRequest): ArrayBuffer {
    throw new Error('no impl')
  }
}

export class WriteFlashData {
  static to(buffer: ArrayBuffer): WriteFlashDataResponse {
    throw new Error('no impl')
  }

  static from(req: WriteFlashDataRequest): ArrayBuffer {
    throw new Error('no impl')
  }
}

export class SendFlashAccessPassword {
  static to(buffer: ArrayBuffer): SendFlashAccessPasswordResponse {
    throw new Error('no impl')
  }

  static from(req: SendFlashAccessPasswordRequest): ArrayBuffer {
    throw new Error('no impl')
  }
}