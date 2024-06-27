import { SRAM } from '../interface/sram.js'

import { Bindable } from '../binding.js'

import { SetSRAMSettingsRequest, GetSRAMSettingsRequest } from '../messages/sram.request.js'
import { SetSRAMSettingsResponse, GetSRAMSettingsResponse } from '../messages/sram.response.js'

import { SetSRAMSettings, GetSRAMSettings } from '../converter/sram/sram.js'

import send_request from './util.js'

export class MCP2221SRAM extends Bindable implements SRAM {
  async set(req: SetSRAMSettingsRequest): Promise<SetSRAMSettingsResponse> {
    return send_request(this, req, SetSRAMSettings)
  }

  async get(req: GetSRAMSettingsRequest): Promise<GetSRAMSettingsResponse> {
    return send_request(this, req, GetSRAMSettings)
  }
}
