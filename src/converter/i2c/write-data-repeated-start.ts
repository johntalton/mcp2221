import { I2CWriteDataRepeatedSTARTRequest } from '../../messages/i2c.request.js'
import { I2CWriteDataRepeatedSTARTResponse } from '../../messages/i2c.response.js'
import { DecoderBufferSource } from '../converter.js'

export class I2CWriteDataRepeatedSTARTResponseCoder {
	static encode(msg: I2CWriteDataRepeatedSTARTResponse): ArrayBuffer { throw new Error('unused') }
	static decode(bufferSource: DecoderBufferSource): I2CWriteDataRepeatedSTARTResponse {
		throw new Error('invalid')
	}
}

export class I2CWriteDataRepeatedSTARTRequestCoder {
	static encode(msg: I2CWriteDataRepeatedSTARTRequest): ArrayBuffer {
		return Uint8ClampedArray.from([
			0x92,
		])
	}
	static decode(bufferSource: DecoderBufferSource): I2CWriteDataRepeatedSTARTRequest { throw new Error('unused') }
}
