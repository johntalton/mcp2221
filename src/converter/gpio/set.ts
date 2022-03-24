import { SetGPIOOutputValuesRequest } from '../../messages/gpio.request.js'
import { SetGPIOOutputValuesResponse } from '../../messages/gpio.response.js'
import { GPIO_SET_COMMAND } from '../../messages/message.consts.js'
import { DecoderBufferSource } from '../converter.js'

import {
	decodeStatusResponse
} from '../decoders.js'
import { Unimplemented, Unused } from '../throw.js'

export class SetGPIOOutputValuesResponseCoder {
	static encode(res: SetGPIOOutputValuesResponse): ArrayBuffer { throw new Unused() }
	static decode(bufferSource: DecoderBufferSource): SetGPIOOutputValuesResponse {
		const dv = ArrayBuffer.isView(bufferSource) ?
			new DataView(bufferSource.buffer, bufferSource.byteOffset, bufferSource.byteLength) :
			new DataView(bufferSource)

		const response = decodeStatusResponse(dv, GPIO_SET_COMMAND) as SetGPIOOutputValuesResponse
		const { command, status, statusCode } = response
		if(statusCode !== 0) { return response }

		throw new Unimplemented()
	}
}

export class SetGPIOOutputValuesRequestCoder {
	static encode(res: SetGPIOOutputValuesRequest): ArrayBuffer {
		// return Uint8ClampedArray.from([
		// 	GPIO_SET_COMMAND,
		// ])

		throw new Unimplemented()
	}
	static decode(bufferSource: DecoderBufferSource): SetGPIOOutputValuesRequest { throw new Unused() }
}
