import { SRAM } from '../'
import { SetSRAMSettingsRequest, GetSRAMSettingsRequest } from '../messages/sram.request'
import { SetSRAMSettingsResponse, GetSRAMSettingsResponse } from '../messages/sram.response'

export class MCP2221SRAM<T> implements SRAM {
  private readonly _hid: T

  constructor(hid: T) { this._hid = hid }

  set(req: SetSRAMSettingsRequest): Promise<SetSRAMSettingsResponse> {
    const { opaque } = req
    throw new Error('Method not implemented.' + opaque)
  }

  get(req: GetSRAMSettingsRequest): Promise<GetSRAMSettingsResponse> {
    const { opaque } = req
    throw new Error('Method not implemented.' + opaque)
  }
}
