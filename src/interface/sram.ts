import { SetSRAMSettingsRequest, GetSRAMSettingsRequest } from '../messages/sram.request.js'
import { SetSRAMSettingsResponse, GetSRAMSettingsResponse } from '../messages/sram.response.js'

export interface SRAM {
  set(req: SetSRAMSettingsRequest): Promise<SetSRAMSettingsResponse>
  get(req: GetSRAMSettingsRequest): Promise<GetSRAMSettingsResponse>
}
