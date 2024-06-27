import { I2CWriteDataRepeatedSTARTRequest } from '../../messages/i2c.request.js'
import { I2CWriteDataRepeatedSTARTResponse } from '../../messages/i2c.response.js'
import { I2C_WRITE_DATA_REPEATED_START_COMMAND } from '../../messages/message.constants.js'
import { DecoderBufferSource } from '../converter.js'
import { decodeWriteWithI2CStateResponse } from '../decoders.js'
import { newReportBuffer } from '../encoders.js'
import { Unimplemented, Unused } from '../throw.js'

export class I2CWriteDataRepeatedSTARTResponseCoder {
	static encode(msg: I2CWriteDataRepeatedSTARTResponse): ArrayBuffer { throw new Unused() }
	static decode(bufferSource: DecoderBufferSource): I2CWriteDataRepeatedSTARTResponse {
		return decodeWriteWithI2CStateResponse(I2C_WRITE_DATA_REPEATED_START_COMMAND, bufferSource) as I2CWriteDataRepeatedSTARTResponse
	}
}

export class I2CWriteDataRepeatedSTARTRequestCoder {
	static encode(msg: I2CWriteDataRepeatedSTARTRequest): ArrayBuffer {
		const { address, buffer } = msg

		const report = newReportBuffer()
		const dv = new DataView(report)

		dv.setUint8(0, I2C_WRITE_DATA_REPEATED_START_COMMAND)
		dv.setUint16(1, buffer.byteLength, true)
		dv.setUint8(3, address << 1 | 0b0)

		const userBuffer8 = ArrayBuffer.isView(buffer) ?
			new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength) :
			new Uint8Array(buffer)

		const userDataTarget8 = new Uint8Array(report, 4)
		userDataTarget8.set(userBuffer8)

		return report
	}
	static decode(bufferSource: DecoderBufferSource): I2CWriteDataRepeatedSTARTRequest { throw new Unused() }
}
