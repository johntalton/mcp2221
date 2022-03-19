import { I2CWriteDataRequest, } from '../../messages/i2c.request.js'
import { I2CWriteDataResponse, } from '../../messages/i2c.response.js'
import { DecoderBufferSource } from '../converter.js'

import { decodeReadWriteResponse } from '../_.js'

export class I2CWriteDataResponseCoder {
	static encode(msg: I2CWriteDataResponse): ArrayBuffer { throw new Error('unused') }
	static decode(bufferSource: DecoderBufferSource): I2CWriteDataResponse {
		return decodeReadWriteResponse(0x90, bufferSource) as I2CWriteDataResponse
	}
}

export class I2CWriteDataRequestCoder {
	static encode(msg: I2CWriteDataRequest): ArrayBuffer {

		const buffer = new ArrayBuffer(64)
		const dv = new DataView(buffer)

		const userData = new Uint8Array(buffer, 4)
		const inputUserData = ArrayBuffer.isView(msg.buffer) ?
			new Uint8Array(msg.buffer.buffer, msg.buffer.byteOffset, msg.buffer.byteLength) :
			new Uint8Array(msg.buffer)

		// user data is the target buffer offset
		// where user data is the re boxxed user provided input
		userData.set(inputUserData)

		dv.setUint8(0, 0x90)
		dv.setUint16(1, inputUserData.byteLength, true)

		return buffer
	}
	static decode(bufferSource: DecoderBufferSource): I2CWriteDataRequest { throw new Error('unused') }
}
