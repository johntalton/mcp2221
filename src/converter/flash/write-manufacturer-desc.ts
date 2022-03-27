import { WriteFlashDataUSBManufacturerRequest } from '../../messages/flash.request.js'
import { WriteFlashDataResponse } from '../../messages/flash.response.js'
import { WRITE_FLASH_DATA_COMMAND, WRITE_FLASH_DATA_MANUFACTURER_SUB_COMMAND } from '../../messages/message.consts.js'
import { DecoderBufferSource } from '../converter.js'

import { decodeStatusResponse, isStatusSuccess } from '../decoders.js'
import { encodeFlashDataUSBStringRequest } from '../encoders.js'
import { Unused } from '../throw.js'

export class WriteFlashDataUSBManufacturerResponseCoder {
	static encode(res: WriteFlashDataResponse): ArrayBuffer { throw new Unused() }
	static decode(bufferSource: DecoderBufferSource): WriteFlashDataResponse {
		const response = decodeStatusResponse(WRITE_FLASH_DATA_COMMAND, bufferSource) as WriteFlashDataResponse
		if(!isStatusSuccess(response)) { return response }

		return {
			...response,
			opaque: '__hello_there__',
			subCommand: WRITE_FLASH_DATA_MANUFACTURER_SUB_COMMAND,
		}
	}
}

export class WriteFlashDataUSBManufacturerRequestCoder {
	static encode(req: WriteFlashDataUSBManufacturerRequest): ArrayBuffer {
		const { descriptor } = req
		return encodeFlashDataUSBStringRequest(
			WRITE_FLASH_DATA_COMMAND,
			WRITE_FLASH_DATA_MANUFACTURER_SUB_COMMAND,
			descriptor)
	}
	static decode(bufferSource: DecoderBufferSource): WriteFlashDataUSBManufacturerRequest { throw new Unused() }
}
