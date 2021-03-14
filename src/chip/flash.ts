import { Flash } from '../interface/flash.js'

import { Bindable } from '../binding.js'

import { ReadFlashDataRequest, WriteFlashDataRequest, SendFlashAccessPasswordRequest } from '../messages/flash.request.js'
import { ReadFlashDataResponse, WriteFlashDataResponse, SendFlashAccessPasswordResponse } from '../messages/flash.response.js'

import { ReadFlashData, SendFlashAccessPassword, WriteFlashData } from '../converter/flash.js'

import send_request from './util.js'

export class MCP2221Flash extends Bindable implements Flash {
  read(req: ReadFlashDataRequest): Promise<ReadFlashDataResponse> {
    return send_request(this.binding, req, ReadFlashData)
  }

  write(req: WriteFlashDataRequest): Promise<WriteFlashDataResponse> {
    return send_request(this.binding, req, WriteFlashData)
  }

  sendPassword(req: SendFlashAccessPasswordRequest): Promise<SendFlashAccessPasswordResponse> {
    return send_request(this.binding, req, SendFlashAccessPassword)
  }
}
