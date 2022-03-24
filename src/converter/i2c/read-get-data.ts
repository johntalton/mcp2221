import { I2CReadGetDataRequest } from '../../messages/i2c.request.js'
import { I2CReadGetDataResponse } from '../../messages/i2c.response.js'
import { I2C_READ_GET_DATA_COMMAND } from '../../messages/message.consts.js'
import { DecoderBufferSource } from '../converter.js'

import { decodeReadWriteResponse } from '../decoders.js'
import { Unimplemented, Unused } from '../throw.js'


export class I2CReadGetDataResponseCoder {
	static encode(_msg: I2CReadGetDataResponse): ArrayBuffer { throw new Unused() }
	static decode(bufferSource: DecoderBufferSource): I2CReadGetDataResponse {
		return decodeReadWriteResponse(I2C_READ_GET_DATA_COMMAND, bufferSource) as I2CReadGetDataResponse
	}
}

export class I2CReadGetDataRequestCoder {
	static encode(msg: I2CReadGetDataRequest): ArrayBuffer {
		// return Uint8Array.from([
		// 	I2C_READ_GET_DATA
		// ])

		throw new Unimplemented()
	}
	static decode(_bufferSource: DecoderBufferSource): I2CReadGetDataRequest { throw new Unused() }
}
