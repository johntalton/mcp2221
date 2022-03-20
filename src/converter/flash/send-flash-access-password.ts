import { SendFlashAccessPasswordRequest } from '../../messages/flash.request.js'
import { SendFlashAccessPasswordResponse } from '../../messages/flash.response.js'
import { DecoderBufferSource } from '../converter.js'

import { decodeStatusResponse } from '../decoders.js'

export class SendFlashAccessPasswordResponseCoder {
	static encode(res: SendFlashAccessPasswordResponse): ArrayBuffer { throw new Error('unused') }
	static decode(bufferSource: DecoderBufferSource): SendFlashAccessPasswordResponse {
		const dv = ArrayBuffer.isView(bufferSource) ?
			new DataView(bufferSource.buffer, bufferSource.byteOffset, bufferSource.byteLength) :
			new DataView(bufferSource)

		const { command, status, statusCode } = decodeStatusResponse(dv, 0xB2) as SendFlashAccessPasswordResponse


		throw new Error(' incomplete :( ')
	}
}

export class SendFlashAccessPasswordRequestCoder {
	static encode(req: SendFlashAccessPasswordRequest): ArrayBuffer {
		return Uint8ClampedArray.from([
			0xB2
		])
	}

	static decode(bufferSource: DecoderBufferSource): SendFlashAccessPasswordRequest { throw new Error('unused') }
}
