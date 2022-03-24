import { SendFlashAccessPasswordRequest } from '../../messages/flash.request.js'
import { SendFlashAccessPasswordResponse } from '../../messages/flash.response.js'
import { SEND_FLASH_ACCESS_COMMAND } from '../../messages/message.consts.js'
import { DecoderBufferSource } from '../converter.js'

import { decodeStatusResponse } from '../decoders.js'
import { Unimplemented, Unused } from '../throw.js'

export class SendFlashAccessPasswordResponseCoder {
	static encode(res: SendFlashAccessPasswordResponse): ArrayBuffer { throw new Unused() }
	static decode(bufferSource: DecoderBufferSource): SendFlashAccessPasswordResponse {
		const dv = ArrayBuffer.isView(bufferSource) ?
			new DataView(bufferSource.buffer, bufferSource.byteOffset, bufferSource.byteLength) :
			new DataView(bufferSource)

		const response = decodeStatusResponse(dv, SEND_FLASH_ACCESS_COMMAND) as SendFlashAccessPasswordResponse
		const { command, status, statusCode } = response
		if(statusCode !== 0) { return response }

		throw new Unimplemented()
	}
}

export class SendFlashAccessPasswordRequestCoder {
	static encode(req: SendFlashAccessPasswordRequest): ArrayBuffer {
		// return Uint8ClampedArray.from([
		// 	SEND_FLASH_ACCESS_COMMAND
		// ])

		throw new Unimplemented()
	}

	static decode(bufferSource: DecoderBufferSource): SendFlashAccessPasswordRequest { throw new Unused() }
}
