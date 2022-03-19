import { I2CReadGetDataRequest } from '../../messages/i2c.request.js'
import { I2CReadGetDataResponse } from '../../messages/i2c.response.js'
import { DecoderBufferSource } from '../converter.js'

import { decodeReadWriteResponse } from '../_.js'

export class I2CReadGetDataResponseCoder {
	static encode(_msg: I2CReadGetDataResponse): ArrayBuffer { throw new Error('unused') }
	static decode(bufferSource: DecoderBufferSource): I2CReadGetDataResponse {
		return decodeReadWriteResponse(0x40, bufferSource) as I2CReadGetDataResponse
	}
}

export class I2CReadGetDataRequestCoder {
	static encode(msg: I2CReadGetDataRequest): ArrayBuffer {
		return Uint8Array.from([
			0x40
		])
	}
	static decode(_bufferSource: DecoderBufferSource): I2CReadGetDataRequest { throw new Error('unused') }
}
