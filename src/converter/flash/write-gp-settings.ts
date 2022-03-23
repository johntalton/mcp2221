import { WriteFlashDataGPSettingsRequest } from '../../messages/flash.request.js'
import { WriteFlashDataResponse } from '../../messages/flash.response.js'
import { DecoderBufferSource } from '../converter.js'

import { decodeStatusResponse } from '../decoders.js'

export class WriteFlashDataGPSettingsResponseCoder {
	static encode(res: WriteFlashDataResponse): ArrayBuffer { throw new Error('unused') }
	static decode(bufferSource: DecoderBufferSource): WriteFlashDataResponse {
		const dv = ArrayBuffer.isView(bufferSource) ?
			new DataView(bufferSource.buffer, bufferSource.byteOffset, bufferSource.byteLength) :
			new DataView(bufferSource)

		const response = decodeStatusResponse(dv, 0xB1) as WriteFlashDataResponse
		const { command, status, statusCode } = response
		if(statusCode !== 0) { return response }

		return {
			opaque: '__hold_up_hold_up__',
			command,
			status, statusCode
		}
	}
}

export class WriteFlashDataGPSettingsRequestCoder {
	static encode(req: WriteFlashDataGPSettingsRequest): ArrayBuffer {
		// return Uint8ClampedArray.from([
		// 	0xB1
		// ])






	}
	static decode(bufferSource: DecoderBufferSource): WriteFlashDataGPSettingsRequest { throw new Error('unused') }
}
