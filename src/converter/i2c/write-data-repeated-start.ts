import { I2CWriteDataRepeatedSTARTRequest } from '../../messages/i2c.request.js'
import { I2CWriteDataRepeatedSTARTResponse } from '../../messages/i2c.response.js'
import { DecoderBufferSource } from '../converter.js'
import { Unimplemented, Unused } from '../throw.js'

export class I2CWriteDataRepeatedSTARTResponseCoder {
	static encode(msg: I2CWriteDataRepeatedSTARTResponse): ArrayBuffer { throw new Unused() }
	static decode(bufferSource: DecoderBufferSource): I2CWriteDataRepeatedSTARTResponse {
		throw new Unimplemented()
	}
}

export class I2CWriteDataRepeatedSTARTRequestCoder {
	static encode(msg: I2CWriteDataRepeatedSTARTRequest): ArrayBuffer {
		// return Uint8ClampedArray.from([
		// 	I2C_WRITE_DATA_REPEATED_START_COMMAND,
		// ])
		throw new Unimplemented()
	}
	static decode(bufferSource: DecoderBufferSource): I2CWriteDataRepeatedSTARTRequest { throw new Unused() }
}
