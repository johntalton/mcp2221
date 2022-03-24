import { I2CWriteDataRequest, } from '../../messages/i2c.request.js'
import { I2CWriteDataResponse, } from '../../messages/i2c.response.js'
import { I2C_WRITE_DATA_COMMAND } from '../../messages/message.consts.js'
import { DecoderBufferSource } from '../converter.js'

import { decodeReadWriteResponse } from '../decoders.js'
import { newReportBuffer } from '../encoders.js'
import { Unused } from '../throw.js'

const MAX_BYTES_LENGTH = 60

export class I2CWriteDataResponseCoder {
	static encode(msg: I2CWriteDataResponse): ArrayBuffer { throw new Unused() }
	static decode(bufferSource: DecoderBufferSource): I2CWriteDataResponse {
		return decodeReadWriteResponse(I2C_WRITE_DATA_COMMAND, bufferSource) as I2CWriteDataResponse
	}
}

export class I2CWriteDataRequestCoder {
	static encode(msg: I2CWriteDataRequest): ArrayBuffer {
		const { address, buffer } = msg
		const outBuffer = newReportBuffer()

		const dv = new DataView(outBuffer)

		const userBuffer8 = ArrayBuffer.isView(buffer) ?
			new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength) :
			new Uint8Array(buffer)

		if(userBuffer8.byteLength > MAX_BYTES_LENGTH) { throw new Error('max data limit') }

		dv.setUint8(0, I2C_WRITE_DATA_COMMAND)
		dv.setUint16(1, buffer.byteLength, true)
		dv.setUint8(3, address << 1)
		// user data is the target buffer offset
		// where user data is the re boxxed user provided input
		const outBuffer8 = new Uint8Array(outBuffer, 4)
		outBuffer8.set(userBuffer8)

		return outBuffer
	}
	static decode(bufferSource: DecoderBufferSource): I2CWriteDataRequest { throw new Unused() }
}
