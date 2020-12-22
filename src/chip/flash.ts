import { Flash} from '../'
import { ReadFlashDataRequest, WriteFlashDataRequest, SendFlashAccessPasswordRequest } from '../messages/flash.request'
import { ReadFlashDataResponse, WriteFlashDataResponse, SendFlashAccessPasswordResponse } from '../messages/flash.response'

export class MCP2221Flash<T> implements Flash {
  private readonly _hid: T

  constructor(hid: T) { this._hid = hid }

  read(req: ReadFlashDataRequest): Promise<ReadFlashDataResponse> {
    const { opaque } = req
    throw new Error('Method not implemented.' + opaque)
  }

  write(req: WriteFlashDataRequest): Promise<WriteFlashDataResponse> {
    const { opaque } = req
    throw new Error('Method not implemented.' + opaque)
  }

  sendPassword(req: SendFlashAccessPasswordRequest): Promise<SendFlashAccessPasswordResponse> {
    const { opaque } = req
    throw new Error('Method not implemented.' + opaque)
  }
}
