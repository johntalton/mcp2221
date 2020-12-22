import { SRAM, Binding } from '../'

import { SetSRAMSettingsRequest, GetSRAMSettingsRequest } from '../messages/sram.request'
import { SetSRAMSettingsResponse, GetSRAMSettingsResponse } from '../messages/sram.response'

import { SetSRAMSettings, GetSRAMSettings } from '../converter/sram'

import send_request from './util'

export class MCP2221SRAM implements SRAM {
  private readonly _binding: Binding

  constructor(binding: Binding) { this._binding = binding }

  set(req: SetSRAMSettingsRequest): Promise<SetSRAMSettingsResponse> {
    return send_request(this._binding, req, SetSRAMSettings)
  }

  get(req: GetSRAMSettingsRequest): Promise<GetSRAMSettingsResponse> {
    return send_request(this._binding, req, GetSRAMSettings)
  }
}
