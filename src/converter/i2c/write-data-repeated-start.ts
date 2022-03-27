import { I2CWriteDataRepeatedSTARTRequest } from '../../messages/i2c.request.js'
import { I2CWriteDataRepeatedSTARTResponse } from '../../messages/i2c.response.js'
import { I2C_WRITE_DATA_REPEATED_START_COMMAND } from '../../messages/message.consts.js'
import { DecoderBufferSource } from '../converter.js'
import { decodeWriteResponse } from '../decoders.js'
import { newReportBuffer } from '../encoders.js'
import { Unimplemented, Unused } from '../throw.js'

export class I2CWriteDataRepeatedSTARTResponseCoder {
	static encode(msg: I2CWriteDataRepeatedSTARTResponse): ArrayBuffer { throw new Unused() }
	static decode(bufferSource: DecoderBufferSource): I2CWriteDataRepeatedSTARTResponse {
		return decodeWriteResponse(I2C_WRITE_DATA_REPEATED_START_COMMAND, bufferSource) as I2CWriteDataRepeatedSTARTResponse
	}
}

export class I2CWriteDataRepeatedSTARTRequestCoder {
	static encode(msg: I2CWriteDataRepeatedSTARTRequest): ArrayBuffer {
		const report = newReportBuffer()
		const dv = new DataView(report)

		dv.setUint8(0, I2C_WRITE_DATA_REPEATED_START_COMMAND)

		// return report

		throw new Unimplemented()
	}
	static decode(bufferSource: DecoderBufferSource): I2CWriteDataRepeatedSTARTRequest { throw new Unused() }
}
