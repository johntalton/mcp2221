import { GetGPIOValuesRequest } from '../../messages/gpio.request.js'
import { GetGPIOValuesResponse } from '../../messages/gpio.response.js'
import { DecoderBufferSource } from '../converter.js'

import {
	decodeStatusResponse,
	decodeGpioValues
} from '../decoders.js'

export class GetGPIOValuesResponseCoder {
	static encode(res: GetGPIOValuesResponse): ArrayBuffer { throw new Error('unused') }
	static decode(bufferSource: DecoderBufferSource): GetGPIOValuesResponse {
		const dv = ArrayBuffer.isView(bufferSource) ?
			new DataView(bufferSource.buffer, bufferSource.byteOffset, bufferSource.byteLength) :
			new DataView(bufferSource)

		const response = decodeStatusResponse(dv, 0x51) as GetGPIOValuesResponse
		const { command, status, statusCode } = response
		if(statusCode !== 0) { return response }

		const gpio0Value = dv.getUint8(2)
		const gpio0Direction = dv.getUint8(3)

		const gpio1Value = dv.getUint8(4)
		const gpio1Direction = dv.getUint8(5)

		const gpio2Value = dv.getUint8(6)
		const gpio2Direction = dv.getUint8(7)

		const gpio3Value = dv.getUint8(8)
		const gpio3Direction = dv.getUint8(9)

		const gpio0 = decodeGpioValues(gpio0Value, gpio0Direction)
		const gpio1 = decodeGpioValues(gpio1Value, gpio1Direction)
		const gpio2 = decodeGpioValues(gpio2Value, gpio2Direction)
		const gpio3 = decodeGpioValues(gpio3Value, gpio3Direction)

		return {
			opaque: '__here_are_your_ios__',
			command,
			status,
			statusCode,

			gpio0, gpio1, gpio2, gpio3
		}
	}
}

export class GetGPIOValuesRequestCoder {
	static encode(res: GetGPIOValuesRequest): ArrayBuffer {
		return Uint8ClampedArray.from([
			0x51
		])
	}
	static decode(bufferSource: DecoderBufferSource): GetGPIOValuesRequest { throw new Error('unused') }
}
