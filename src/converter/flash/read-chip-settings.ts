import { ReadFlashDataChipSettingsRequest, ReadFlashDataRequest } from '../../messages/flash.request.js'
import { ReadFlashDataChipSettingsResponse } from '../../messages/flash.response.js'
import { DecoderBufferSource } from '../converter.js'

import { decodeStatusResponse } from '../decoders.js'

export class ReadFlashDataChipSettingsResponseCoder {
	static encode(res: ReadFlashDataChipSettingsRequest): ArrayBuffer { throw new Error('unused') }
	static decode(bufferSource: DecoderBufferSource): ReadFlashDataChipSettingsResponse {
		const dv = ArrayBuffer.isView(bufferSource) ?
			new DataView(bufferSource.buffer, bufferSource.byteOffset, bufferSource.byteLength) :
			new DataView(bufferSource)

		const { command, status, statusCode } = decodeStatusResponse(dv, 0xB0) as ReadFlashDataChipSettingsResponse

		const subCommandByteLength = dv.getUint8(2)

		throw new Error('😟')
	}
}

export class ReadFlashDataChipSettingsRequestCoder {
	static encode(req:  ReadFlashDataRequest): ArrayBuffer {
		return Uint8ClampedArray.from([ 0xB0, 0x00 ])
	}
	static decode(bufferSource: DecoderBufferSource): ReadFlashDataChipSettingsResponse { throw new Error('unused') }
}
