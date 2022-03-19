import { I2CReadDataRepeatedSTARTRequest } from '../../messages/i2c.request.js'
import { I2CReadDataRepeatedSTARTResponse } from '../../messages/i2c.response.js'
import { DecoderBufferSource } from '../converter.js'

export class I2CReadDataRepeatedSTARTResponseCoder {
	static encode(_msg: I2CReadDataRepeatedSTARTResponse): ArrayBuffer { throw new Error('unused') }
	static decode(bufferSource: DecoderBufferSource): I2CReadDataRepeatedSTARTResponse {
		throw new Error('invalid')
	}
}

export class I2CReadDataRepeatedSTARTRequestCoder {
	static encode(msg: I2CReadDataRepeatedSTARTRequest): ArrayBuffer {
		return Uint8Array.from([
			0x93,

		])
	}
	static decode(_bufferSource: DecoderBufferSource): I2CReadDataRepeatedSTARTRequest { throw new Error('unused') }
}
