import { SetGPIOOutputValuesRequest } from '../../messages/gpio.request.js'
import { SetGPIOOutputValuesResponse } from '../../messages/gpio.response.js'
import { GPIO_SET_COMMAND, dont_care } from '../../messages/message.constants.js'
import { DecoderBufferSource } from '../converter.js'

import {
	decodeGpioVariableAlter,
	decodeStatusResponse, isStatusSuccess
} from '../decoders.js'
import { encodeGpioVariableAlter, newReportBuffer } from '../encoders.js'
import { Unused } from '../throw.js'

export class SetGPIOOutputValuesResponseCoder {
	static encode(res: SetGPIOOutputValuesResponse): ArrayBuffer { throw new Unused() }
	static decode(bufferSource: DecoderBufferSource): SetGPIOOutputValuesResponse {
		const u8 = ArrayBuffer.isView(bufferSource) ?
			new Uint8Array(bufferSource.buffer, bufferSource.byteOffset, bufferSource.byteLength) :
			new Uint8Array(bufferSource)

		const response = decodeStatusResponse(GPIO_SET_COMMAND, bufferSource) as SetGPIOOutputValuesResponse
		if(!isStatusSuccess(response)) { return response }

		const gpio0 = decodeGpioVariableAlter(u8.subarray(2, 6))
		const gpio1 = decodeGpioVariableAlter(u8.subarray(6, 10))
		const gpio2 = decodeGpioVariableAlter(u8.subarray(10, 14))
		const gpio3 = decodeGpioVariableAlter(u8.subarray(14, 18))

		return {
			...response,

			gpio0, gpio1, gpio2, gpio3
		}
	}
}

export class SetGPIOOutputValuesRequestCoder {
	static encode(req: SetGPIOOutputValuesRequest): ArrayBuffer {
		const { gpio0, gpio1, gpio2, gpio3 } = req
		const report = newReportBuffer()

		const u8 = new Uint8Array(report)

		u8[0] = GPIO_SET_COMMAND
		u8[1] = dont_care()

		encodeGpioVariableAlter(gpio0, u8.subarray(2, 6))
		encodeGpioVariableAlter(gpio1, u8.subarray(6, 10))
		encodeGpioVariableAlter(gpio2, u8.subarray(10, 14))
		encodeGpioVariableAlter(gpio3, u8.subarray(14, 18))

		console.log(u8)

		return report
	}
	static decode(bufferSource: DecoderBufferSource): SetGPIOOutputValuesRequest { throw new Unused() }
}
