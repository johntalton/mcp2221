import { ReadFlashDataGPSettingsRequest, ReadFlashDataRequest } from '../../messages/flash.request.js'
import { ReadFlashDataGPSettingsResponse } from '../../messages/flash.response.js'
import { DecoderBufferSource } from '../converter.js'

import { decodeStatusResponse } from '../decoders.js'

export class ReadFlashDataGPSettingsResponseCoder {
	static encode(res: ReadFlashDataGPSettingsResponse): ArrayBuffer { throw new Error('unused') }
	static decode(bufferSource: DecoderBufferSource): ReadFlashDataGPSettingsResponse {
		const dv = ArrayBuffer.isView(bufferSource) ?
			new DataView(bufferSource.buffer, bufferSource.byteOffset, bufferSource.byteLength) :
			new DataView(bufferSource)

		const { command, status, statusCode } = decodeStatusResponse(dv, 0xB0) as ReadFlashDataGPSettingsResponse

		const subCommandByteLength = dv.getUint8(2)
		throw new Error('😟')
	}
}

export class ReadFlashDataGPSettingsRequestCoder {
	static encode(req: ReadFlashDataRequest): ArrayBuffer {
		return Uint8ClampedArray.from([ 0xB0, 0x01 ])
	}
	static decode(bufferSource: DecoderBufferSource): ReadFlashDataGPSettingsRequest { throw new Error('unused') }
}
