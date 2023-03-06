import { GetGPIOValuesRequest } from '../../messages/gpio.request.js'
import { GetGPIOValuesResponse } from '../../messages/gpio.response.js'
import { GPIO_GET_COMMAND } from '../../messages/message.constants.js'
import { DecoderBufferSource } from '../converter.js'

import {
	decodeStatusResponse,
	decodeGpioValues,
	isStatusSuccess
} from '../decoders.js'
import { newReportBuffer } from '../encoders.js'
import { Unused } from '../throw.js'

export class GetGPIOValuesResponseCoder {
	static encode(res: GetGPIOValuesResponse): ArrayBuffer { throw new Unused() }
	static decode(bufferSource: DecoderBufferSource): GetGPIOValuesResponse {
		const dv = ArrayBuffer.isView(bufferSource) ?
			new DataView(bufferSource.buffer, bufferSource.byteOffset, bufferSource.byteLength) :
			new DataView(bufferSource)

		const response = decodeStatusResponse(GPIO_GET_COMMAND, bufferSource) as GetGPIOValuesResponse
		const { command, status, statusCode } = response
		if(!isStatusSuccess(response)) { return response }

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
		const report = newReportBuffer()
		const dv = new DataView(report)

		dv.setUint8(0, GPIO_GET_COMMAND)

		return report
	}
	static decode(bufferSource: DecoderBufferSource): GetGPIOValuesRequest { throw new Unused() }
}
