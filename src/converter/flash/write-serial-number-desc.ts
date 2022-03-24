import { WriteFlashDataUSBSerialNumberRequest } from '../../messages/flash.request.js'
import { WriteFlashDataResponse } from '../../messages/flash.response.js'
import { WRITE_FLASH_DATA_COMMAND, WRITE_FLASH_DATA_SERIAL_NUMBER_SUB_COMMAND } from '../../messages/message.consts.js'
import { DecoderBufferSource } from '../converter.js'

import { decodeStatusResponse } from '../decoders.js'
import { encodeFlashDataUSBStringRequest } from '../encoders.js'
import { Unused } from '../throw.js'

export class WriteFlashDataUSBSerialNumberResponseCoder {
	static encode(res: WriteFlashDataResponse): ArrayBuffer { throw new Unused() }
	static decode(bufferSource: DecoderBufferSource): WriteFlashDataResponse {
		const dv = ArrayBuffer.isView(bufferSource) ?
			new DataView(bufferSource.buffer, bufferSource.byteOffset, bufferSource.byteLength) :
			new DataView(bufferSource)

		const response = decodeStatusResponse(dv, WRITE_FLASH_DATA_COMMAND) as WriteFlashDataResponse
		const { command, status, statusCode } = response
		if(statusCode !== 0) { return response }

		return {
			opaque: '__and_now_for_something__',
			command, subCommand: WRITE_FLASH_DATA_SERIAL_NUMBER_SUB_COMMAND,
			status, statusCode
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
