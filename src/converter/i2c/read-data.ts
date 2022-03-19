import { I2CReadDataRequest } from '../../messages/i2c.request.js'
import { I2CReadDataResponse } from '../../messages/i2c.response.js'
import { DecoderBufferSource } from '../converter.js'

import { decodeReadWriteResponse } from '../_.js'

export class I2CReadDataResponseCoder {
	static encode(_msg: I2CReadDataResponse): ArrayBuffer { throw new Error('unused') }
	static decode(bufferSource: DecoderBufferSource): I2CReadDataResponse {
		return decodeReadWriteResponse(0x91, bufferSource) as I2CReadDataResponse
	}
}

export class I2CReadDataRequestCoder {
	static encode(msg: I2CReadDataRequest): ArrayBuffer {
		const buffer = new ArrayBuffer(64)
		const dv = new DataView(buffer)

		dv.setUint8(0, 0x91)
		dv.setUint16(1, msg.length, true)
		dv.setUint8(3, (msg.address << 1) | 1)

		//console.log('i2c read request buffer', msg.length, msg.address, buffer)

		return buffer
	}
	static decode(_bufferSource: DecoderBufferSource): I2CReadDataRequest { throw new Error('unused') }
}
