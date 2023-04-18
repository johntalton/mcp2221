import { Converter } from '../converter.js'

import { SetSRAMSettingsRequest, GetSRAMSettingsRequest } from '../../messages/sram.request.js'
import { SetSRAMSettingsResponse, GetSRAMSettingsResponse } from '../../messages/sram.response.js'

import { SetSRAMSettingsResponseCoder, SetSRAMSettingsRequestCoder, GetSRAMSettingsResponseCoder, GetSRAMSettingsRequestCoder } from './sram.js'

export const SetSRAMSettings: Converter<SetSRAMSettingsRequest, SetSRAMSettingsResponse> = {
	to: SetSRAMSettingsResponseCoder.decode,
	from: SetSRAMSettingsRequestCoder.encode
}

export const GetSRAMSettings: Converter<GetSRAMSettingsRequest, GetSRAMSettingsResponse> = {
	to: GetSRAMSettingsResponseCoder.decode,
	from: GetSRAMSettingsRequestCoder.encode
}
