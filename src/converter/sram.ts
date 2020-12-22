import { SetSRAMSettingsRequest, GetSRAMSettingsRequest } from '../messages/sram.request'
import { SetSRAMSettingsResponse, GetSRAMSettingsResponse } from '../messages/sram.response'

export class SetSRAMSettings {
  static to(buffer: ArrayBuffer): SetSRAMSettingsResponse {
    throw new Error('no impl')
  }

  static from(req: SetSRAMSettingsRequest): ArrayBuffer {
    throw new Error('no impl')
  }
}

export class GetSRAMSettings {
  static to(buffer: ArrayBuffer): GetSRAMSettingsResponse {
    throw new Error('no impl')
  }

  static from(req: GetSRAMSettingsRequest): ArrayBuffer {
    throw new Error('no impl')
  }
}