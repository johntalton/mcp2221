import { SetGPIOOutputValuesRequest } from '../../messages/gpio.request.js'
import { SetGPIOOutputValuesResponse } from '../../messages/gpio.response.js'
import { GPIO_SET_COMMAND } from '../../messages/message.constants.js'
import { DecoderBufferSource } from '../converter.js'

import {
	decodeStatusResponse, isStatusSuccess
} from '../decoders.js'
import { newReportBuffer } from '../encoders.js'
import { Unimplemented, Unused } from '../throw.js'

export class SetGPIOOutputValuesResponseCoder {
	static encode(res: SetGPIOOutputValuesResponse): ArrayBuffer { throw new Unused() }
	static decode(bufferSource: DecoderBufferSource): SetGPIOOutputValuesResponse {
		const dv = ArrayBuffer.isView(bufferSource) ?
			new DataView(bufferSource.buffer, bufferSource.byteOffset, bufferSource.byteLength) :
			new DataView(bufferSource)

		const response = decodeStatusResponse(GPIO_SET_COMMAND, bufferSource) as SetGPIOOutputValuesResponse
		const { command, status, statusCode } = response
		if(!isStatusSuccess(response)) { return response }

		throw new Unimplemented()
	}
}

export class SetGPIOOutputValuesRequestCoder {
	static encode(res: SetGPIOOutputValuesRequest): ArrayBuffer {
		const report = newReportBuffer()
		const dv = new DataView(report)

		dv.setUint8(0, GPIO_SET_COMMAND)

		// return report

		throw new Unimplemented()
	}
	static decode(bufferSource: DecoderBufferSource): SetGPIOOutputValuesRequest { throw new Unused() }
}
