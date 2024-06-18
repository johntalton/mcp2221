import { WriteFlashDataUSBSerialNumberRequest } from '../../messages/flash.request.js'
import { WriteFlashDataResponse } from '../../messages/flash.response.js'
import { WRITE_FLASH_DATA_COMMAND, WRITE_FLASH_DATA_SERIAL_NUMBER_SUB_COMMAND } from '../../messages/message.constants.js'
import { DecoderBufferSource } from '../converter.js'

import { decodeStatusResponse, isStatusSuccess } from '../decoders.js'
import { encodeFlashDataUSBStringRequest } from '../encoders.js'
import { Unused } from '../throw.js'

export class WriteFlashDataUSBSerialNumberResponseCoder {
	static encode(res: WriteFlashDataResponse): ArrayBuffer { throw new Unused() }
	static decode(bufferSource: DecoderBufferSource): WriteFlashDataResponse {
		const response = decodeStatusResponse(WRITE_FLASH_DATA_COMMAND, bufferSource) as WriteFlashDataResponse
		if(!isStatusSuccess(response)) { return response }

		return {
			...response,
			subCommand: WRITE_FLASH_DATA_SERIAL_NUMBER_SUB_COMMAND
		}
	}
}

export class WriteFlashDataUSBSerialNumberRequestCoder {
	static encode(req: WriteFlashDataUSBSerialNumberRequest): ArrayBuffer {
		const { descriptor } = req
		return encodeFlashDataUSBStringRequest(
			WRITE_FLASH_DATA_COMMAND,
			WRITE_FLASH_DATA_SERIAL_NUMBER_SUB_COMMAND,
			descriptor)
	}
	static decode(bufferSource: DecoderBufferSource): WriteFlashDataUSBSerialNumberRequest { throw new Unused() }
}
