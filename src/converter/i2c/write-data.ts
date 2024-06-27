import { I2CWriteDataRequest, } from '../../messages/i2c.request.js'
import { I2CWriteDataResponse, } from '../../messages/i2c.response.js'
import { I2C_WRITE_DATA_COMMAND, MAX_I2C_WRITE_BYTES_LENGTH } from '../../messages/message.constants.js'
import { DecoderBufferSource } from '../converter.js'

import { decodeWriteWithI2CStateResponse } from '../decoders.js'
import { newReportBuffer } from '../encoders.js'
import { Invalid, Unused } from '../throw.js'



export class I2CWriteDataResponseCoder {
	static encode(msg: I2CWriteDataResponse): ArrayBuffer { throw new Unused() }
	static decode(bufferSource: DecoderBufferSource): I2CWriteDataResponse {
		return decodeWriteWithI2CStateResponse(I2C_WRITE_DATA_COMMAND, bufferSource) as I2CWriteDataResponse
	}
}

export class I2CWriteDataRequestCoder {
	static encode(msg: I2CWriteDataRequest): ArrayBuffer {
		const { address, buffer } = msg

		if(buffer.byteLength > MAX_I2C_WRITE_BYTES_LENGTH) { throw new Invalid('byte length over limit', buffer.byteLength) }

		const report = newReportBuffer()
		const dv = new DataView(report)

		dv.setUint8(0, I2C_WRITE_DATA_COMMAND)
		dv.setUint16(1, buffer.byteLength, true)
		dv.setUint8(3, address << 1 | 0b0)

		const userBuffer8 = ArrayBuffer.isView(buffer) ?
			new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength) :
			new Uint8Array(buffer)

		const userDataTarget8 = new Uint8Array(report, 4)
		userDataTarget8.set(userBuffer8)

		return report
	}
	static decode(bufferSource: DecoderBufferSource): I2CWriteDataRequest { throw new Unused() }
}
