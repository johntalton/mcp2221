import { Common } from '../'

import { StatusParametersRequest, ResetChipRequest } from '../messages/common.request'
import { StatusParametersResponse } from '../messages/common.response'

import { StatusParameter, ResetChip } from '../converter/common'

export class MCP2221Common<T> implements Common {
  private readonly _hid: T

  constructor(hid: T) { this._hid = hid }

  async status(req: StatusParametersRequest): Promise<StatusParametersResponse> {
    const buffer = StatusParameter.from(req)
    const resBuffer = new Uint8ClampedArray() // await this._hid.transfer(buffer)
    return StatusParameter.to(resBuffer)
  }

  async reset(req: ResetChipRequest): Promise<void> {
    const buffer = ResetChip.from(req)
    const resBuffer = new Uint8ClampedArray() // await this._hid.transfer(buffer)
    return ResetChip.to(resBuffer)
  }
}
