import { WriteFlashDataGPSettingsRequest } from '../../messages/flash.request.js'
import { WriteFlashDataResponse } from '../../messages/flash.response.js'
import { WRITE_FLASH_DATA_COMMAND, WRITE_FLASH_DATA_GP_SETTINGS_SUB_COMMAND } from '../../messages/message.consts.js'
import { DecoderBufferSource } from '../converter.js'

import { decodeStatusResponse } from '../decoders.js'
import { Unimplemented, Unused } from '../throw.js'

export class WriteFlashDataGPSettingsResponseCoder {
	static encode(res: WriteFlashDataResponse): ArrayBuffer { throw new Unused() }
	static decode(bufferSource: DecoderBufferSource): WriteFlashDataResponse {
		const dv = ArrayBuffer.isView(bufferSource) ?
			new DataView(bufferSource.buffer, bufferSource.byteOffset, bufferSource.byteLength) :
			new DataView(bufferSource)

		const response = decodeStatusResponse(dv, WRITE_FLASH_DATA_COMMAND) as WriteFlashDataResponse
		const { command, status, statusCode } = response
		if(statusCode !== 0) { return response }

		return {
			opaque: '__hold_up_hold_up__',
			command, subCommand: WRITE_FLASH_DATA_GP_SETTINGS_SUB_COMMAND,
			status, statusCode
		}
	}
}

export class WriteFlashDataGPSettingsRequestCoder {
	static encode(req: WriteFlashDataGPSettingsRequest): ArrayBuffer {
		// return Uint8ClampedArray.from([
		// 	WRITE_FLASH_DATA_COMMAND, WRITE_FLASH_DATA_GP_SETTINGS_SUB_COMMAND
		// ])

		throw new Unimplemented()
	}
	static decode(bufferSource: DecoderBufferSource): WriteFlashDataGPSettingsRequest { throw new Unused() }
}
