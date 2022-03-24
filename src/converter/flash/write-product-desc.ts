import { WriteFlashDataUSBProductRequest } from '../../messages/flash.request.js'
import { WriteFlashDataResponse } from '../../messages/flash.response.js'
import { WRITE_FLASH_DATA_COMMAND, WRITE_FLASH_DATA_PRODUCT_SUB_COMMAND } from '../../messages/message.consts.js'
import { DecoderBufferSource } from '../converter.js'

import { decodeStatusResponse } from '../decoders.js'
import { encodeFlashDataUSBStringRequest } from '../encoders.js'
import { Unused } from '../throw.js'

export class WriteFlashDataUSBProductResponseCoder {
	static encode(res: WriteFlashDataResponse): ArrayBuffer { throw new Unused() }
	static decode(bufferSource: DecoderBufferSource): WriteFlashDataResponse {
		const dv = ArrayBuffer.isView(bufferSource) ?
			new DataView(bufferSource.buffer, bufferSource.byteOffset, bufferSource.byteLength) :
			new DataView(bufferSource)

		const response = decodeStatusResponse(dv, WRITE_FLASH_DATA_COMMAND) as WriteFlashDataResponse
		const { command, status, statusCode } = response
		if(statusCode !== 0) { return response }

		return {
			opaque: '__this_is_the_result__',
			command, subCommand: WRITE_FLASH_DATA_PRODUCT_SUB_COMMAND,
			status, statusCode
		}
	}
}

export class WriteFlashDataUSBProductRequestCoder {
	static encode(req: WriteFlashDataUSBProductRequest): ArrayBuffer {
		const { descriptor } = req
		return encodeFlashDataUSBStringRequest(
			WRITE_FLASH_DATA_COMMAND,
			WRITE_FLASH_DATA_PRODUCT_SUB_COMMAND,
			descriptor)

	}
	static decode(bufferSource: DecoderBufferSource): WriteFlashDataUSBProductRequest { throw new Unused() }
}
