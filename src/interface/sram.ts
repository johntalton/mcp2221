import { SetSRAMSettingsRequest, GetSRAMSettingsRequest } from '../messages/sram.request'
import { SetSRAMSettingsResponse, GetSRAMSettingsResponse } from '../messages/sram.response'

export interface SRAM {
  set(req: SetSRAMSettingsRequest): Promise<SetSRAMSettingsResponse>
  get(req: GetSRAMSettingsRequest): Promise<GetSRAMSettingsResponse>
}
