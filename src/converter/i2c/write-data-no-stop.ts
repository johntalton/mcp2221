import { I2CWriteDataNoSTOPRequest } from '../../messages/i2c.request.js'
import { I2CWriteDataNoSTOPResponse } from '../../messages/i2c.response.js'
import { DecoderBufferSource } from '../converter.js'

import { decodeReadWriteResponse } from '../_.js'

export class I2CWriteDataNoSTOPResponseCoder {
	static encode(_msg: I2CWriteDataNoSTOPResponse): ArrayBuffer { throw new Error('unused') }
	static decode(bufferSource: DecoderBufferSource): I2CWriteDataNoSTOPResponse {
		return decodeReadWriteResponse(0x94, bufferSource) as I2CWriteDataNoSTOPResponse
	}
}

export class I2CWriteDataNoSTOPRequestCoder {
	static encode(msg: I2CWriteDataNoSTOPRequest): ArrayBuffer {

		const buffer = new ArrayBuffer(64)
		const dv = new DataView(buffer)

		const userData = new Uint8Array(buffer, 4)
		const inputUserData = ArrayBuffer.isView(msg.buffer) ?
			new Uint8Array(msg.buffer.buffer, msg.buffer.byteOffset, msg.buffer.byteLength) :
			new Uint8Array(msg.buffer)

		userData.set(inputUserData)

		dv.setUint8(0, 0x94)
		dv.setUint16(1, inputUserData.byteLength, true)
		dv.setUint8(3, (msg.address << 1) | 0)

		return buffer
	}
	static decode(_bufferSource: DecoderBufferSource): I2CWriteDataNoSTOPRequest { throw new Error('unused') }
}

