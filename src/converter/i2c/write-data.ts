import { I2CWriteDataRequest, } from '../../messages/i2c.request.js'
import { I2CWriteDataResponse, } from '../../messages/i2c.response.js'
import { DecoderBufferSource } from '../converter.js'

import { decodeReadWriteResponse } from '../decoders.js'

export class I2CWriteDataResponseCoder {
	static encode(msg: I2CWriteDataResponse): ArrayBuffer { throw new Error('unused') }
	static decode(bufferSource: DecoderBufferSource): I2CWriteDataResponse {
		return decodeReadWriteResponse(0x90, bufferSource) as I2CWriteDataResponse
	}
}

export class I2CWriteDataRequestCoder {
	static encode(msg: I2CWriteDataRequest): ArrayBuffer {
		const { address, buffer } = msg

		const outBuffer = new ArrayBuffer(64)

		const dv = new DataView(outBuffer)

		const userBuffer8 = ArrayBuffer.isView(buffer) ?
			new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength) :
			new Uint8Array(buffer)

		if(userBuffer8.byteLength > 60) { throw new Error('max data limit') }

		dv.setUint8(0, 0x90)
		dv.setUint16(1, buffer.byteLength, true)
		dv.setUint8(3, address << 1)
		// user data is the target buffer offset
		// where user data is the re boxxed user provided input
		const outBuffer8 = new Uint8Array(outBuffer, 4)
		outBuffer8.set(userBuffer8)

		return outBuffer
	}
	static decode(bufferSource: DecoderBufferSource): I2CWriteDataRequest { throw new Error('unused') }
}
