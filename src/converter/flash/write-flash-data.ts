import { WriteFlashDataRequest } from '../../messages/flash.request.js'
import { WriteFlashDataResponse } from '../../messages/flash.response.js'
import { DecoderBufferSource } from '../converter.js'

import { decodeStatusResponse } from '../decoders.js'

export class WriteFlashDataResponseCoder {
	static encode(res: WriteFlashDataResponse): ArrayBuffer { throw new Error('unused') }
	static decode(bufferSource: DecoderBufferSource): WriteFlashDataResponse {
		const dv = ArrayBuffer.isView(bufferSource) ?
			new DataView(bufferSource.buffer, bufferSource.byteOffset, bufferSource.byteLength) :
			new DataView(bufferSource)

		const { command, status, statusCode } = decodeStatusResponse(dv, 0xB2) as WriteFlashDataResponse

		throw new Error(' incomplete :( ')
	}
}

export class WriteFlashDataRequestCoder {
	static encode(req: WriteFlashDataRequest): ArrayBuffer {
		return Uint8ClampedArray.from([
			0xB1
		])
	}
	static decode(bufferSource: DecoderBufferSource): WriteFlashDataRequest { throw new Error('unused') }
}
