import { WriteFlashDataGPSettingsRequest } from '../../messages/flash.request.js'
import { WriteFlashDataResponse } from '../../messages/flash.response.js'
import { WRITE_FLASH_DATA_COMMAND, WRITE_FLASH_DATA_GP_SETTINGS_SUB_COMMAND } from '../../messages/message.consts.js'
import { DecoderBufferSource } from '../converter.js'

import { decodeStatusResponse, isStatusSuccess } from '../decoders.js'
import { newReportBuffer } from '../encoders.js'
import { Unimplemented, Unused } from '../throw.js'

export class WriteFlashDataGPSettingsResponseCoder {
	static encode(res: WriteFlashDataResponse): ArrayBuffer { throw new Unused() }
	static decode(bufferSource: DecoderBufferSource): WriteFlashDataResponse {
		const response = decodeStatusResponse(WRITE_FLASH_DATA_COMMAND, bufferSource) as WriteFlashDataResponse
		if(!isStatusSuccess(response)) { return response }

		return {
			...response,
			opaque: '__hold_up_hold_up__',
			subCommand: WRITE_FLASH_DATA_GP_SETTINGS_SUB_COMMAND,
		}
	}
}

export class WriteFlashDataGPSettingsRequestCoder {
	static encode(req: WriteFlashDataGPSettingsRequest): ArrayBuffer {
		const report = newReportBuffer()
		const dv = new DataView(report)

		dv.setUint8(0, WRITE_FLASH_DATA_COMMAND)

		// return report


		throw new Unimplemented()
	}
	static decode(bufferSource: DecoderBufferSource): WriteFlashDataGPSettingsRequest { throw new Unused() }
}
