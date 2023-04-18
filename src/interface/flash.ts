import { ReadFlashDataRequest, WriteFlashDataRequest, SendFlashAccessPasswordRequest } from '../messages/flash.request.js'
import { ReadFlashDataResponse, WriteFlashDataResponse, SendFlashAccessPasswordResponse } from '../messages/flash.response.js'

export interface Flash {
  read(req: ReadFlashDataRequest): Promise<ReadFlashDataResponse>
  write(req: WriteFlashDataRequest): Promise<WriteFlashDataResponse>
  sendPassword(req: SendFlashAccessPasswordRequest): Promise<SendFlashAccessPasswordResponse>
}
