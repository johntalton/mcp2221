import { I2CReadDataRepeatedSTARTRequest } from '../../messages/i2c.request.js'
import { I2CReadDataRepeatedSTARTResponse } from '../../messages/i2c.response.js'
import { DecoderBufferSource } from '../converter.js'
import { Unimplemented, Unused } from '../throw.js'


export class I2CReadDataRepeatedSTARTResponseCoder {
	static encode(_msg: I2CReadDataRepeatedSTARTResponse): ArrayBuffer { throw new Unused() }
	static decode(bufferSource: DecoderBufferSource): I2CReadDataRepeatedSTARTResponse {
		throw new Unimplemented()
	}
}

export class I2CReadDataRepeatedSTARTRequestCoder {
	static encode(msg: I2CReadDataRepeatedSTARTRequest): ArrayBuffer {
		// return Uint8Array.from([
		// 	I2C_READ_DATA_REPEATED_START_COMMAND,

		// ])

		throw new Unimplemented()
	}
	static decode(_bufferSource: DecoderBufferSource): I2CReadDataRepeatedSTARTRequest { throw new Unused() }
}
