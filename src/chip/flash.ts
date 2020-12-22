import { Flash, Binding } from '../'

import { ReadFlashDataRequest, WriteFlashDataRequest, SendFlashAccessPasswordRequest } from '../messages/flash.request'
import { ReadFlashDataResponse, WriteFlashDataResponse, SendFlashAccessPasswordResponse } from '../messages/flash.response'

import { ReadFlashData, SendFlashAccessPassword, WriteFlashData } from '../converter/flash'

import send_request from './util'

export class MCP2221Flash implements Flash {
  private readonly _binding: Binding

  constructor(binding: Binding) { this._binding = binding }

  read(req: ReadFlashDataRequest): Promise<ReadFlashDataResponse> {
    return send_request(this._binding, req, ReadFlashData)
  }

  write(req: WriteFlashDataRequest): Promise<WriteFlashDataResponse> {
    return send_request(this._binding, req, WriteFlashData)
  }

  sendPassword(req: SendFlashAccessPasswordRequest): Promise<SendFlashAccessPasswordResponse> {
    return send_request(this._binding, req, SendFlashAccessPassword)
  }
}
