import { I2CWriteDataRequest, } from '../../messages/i2c.request.js'
import { I2CWriteDataResponse, } from '../../messages/i2c.response.js'
import { I2C_WRITE_DATA_COMMAND } from '../../messages/message.constants.js'
import { DecoderBufferSource } from '../converter.js'

import { decodeWriteResponse } from '../decoders.js'
import { newReportBuffer } from '../encoders.js'
import { Invalid, Unused } from '../throw.js'

export const MAX_BYTES_LENGTH = 60

export class I2CWriteDataResponseCoder {
	static encode(msg: I2CWriteDataResponse): ArrayBuffer { throw new Unused() }
	static decode(bufferSource: DecoderBufferSource): I2CWriteDataResponse {
		return decodeWriteResponse(I2C_WRITE_DATA_COMMAND, bufferSource) as I2CWriteDataResponse
	}
}

export class I2CWriteDataRequestCoder {
	static encode(msg: I2CWriteDataRequest): ArrayBuffer {
		const { address, buffer } = msg
		const report = newReportBuffer()

		const dv = new DataView(report)

		const userBuffer8 = ArrayBuffer.isView(buffer) ?
			new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength) :
			new Uint8Array(buffer)

		if(userBuffer8.byteLength > MAX_BYTES_LENGTH) { throw new Invalid('byte length over limit', userBuffer8.byteLength) }

		dv.setUint8(0, I2C_WRITE_DATA_COMMAND)
		dv.setUint16(1, buffer.byteLength, true)
		dv.setUint8(3, address << 1 | 0b0)
		// user data is the target buffer offset
		// where user data is the re boxxed user provided input
		const report8 = new Uint8Array(report, 4)
		report8.set(userBuffer8)

		return report
	}
	static decode(bufferSource: DecoderBufferSource): I2CWriteDataRequest { throw new Unused() }
}
