import { SetGPIOOutputValuesRequest } from '../../messages/gpio.request.js'
import { SetGPIOOutputValuesResponse } from '../../messages/gpio.response.js'
import { DecoderBufferSource } from '../converter.js'

import {
	decodeStatusResponse
} from '../decoders.js'

export class SetGPIOOutputValuesResponseCoder {
	static encode(res: SetGPIOOutputValuesResponse): ArrayBuffer { throw new Error('unused') }
	static decode(bufferSource: DecoderBufferSource): SetGPIOOutputValuesResponse {
		const dv = ArrayBuffer.isView(bufferSource) ?
			new DataView(bufferSource.buffer, bufferSource.byteOffset, bufferSource.byteLength) :
			new DataView(bufferSource)

		const { command, status, statusCode } = decodeStatusResponse(dv, 0x50) as SetGPIOOutputValuesResponse

		throw new Error(' un implemented :( ')
	}
}

export class SetGPIOOutputValuesRequestCoder {
	static encode(res: SetGPIOOutputValuesRequest): ArrayBuffer {
		return Uint8ClampedArray.from([
			0x50,
		])
	}
	static decode(bufferSource: DecoderBufferSource): SetGPIOOutputValuesRequest { throw new Error('unused') }
}
