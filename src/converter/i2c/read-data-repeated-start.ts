import { I2CReadDataRepeatedSTARTRequest } from '../../messages/i2c.request.js'
import { I2CReadDataRepeatedSTARTResponse } from '../../messages/i2c.response.js'
import { I2C_READ_DATA_REPEATED_START_COMMAND } from '../../messages/message.constants.js'
import { DecoderBufferSource } from '../converter.js'
import { decodeReadResponse } from '../decoders.js'
import { newReportBuffer } from '../encoders.js'
import { Unimplemented, Unused } from '../throw.js'

export class I2CReadDataRepeatedSTARTResponseCoder {
	static encode(_msg: I2CReadDataRepeatedSTARTResponse): ArrayBuffer { throw new Unused() }
	static decode(bufferSource: DecoderBufferSource): I2CReadDataRepeatedSTARTResponse {
		return decodeReadResponse(I2C_READ_DATA_REPEATED_START_COMMAND, bufferSource) as I2CReadDataRepeatedSTARTResponse
	}
}

export class I2CReadDataRepeatedSTARTRequestCoder {
	static encode(msg: I2CReadDataRepeatedSTARTRequest): ArrayBuffer {
		const { address, length } = msg

		const buffer = newReportBuffer()
		const dv = new DataView(buffer)

		dv.setUint8(0, I2C_READ_DATA_REPEATED_START_COMMAND)
		dv.setUint16(1, length, true)
		dv.setUint8(3, (address << 1) | 0b1)

		return buffer
	}
	static decode(_bufferSource: DecoderBufferSource): I2CReadDataRepeatedSTARTRequest { throw new Unused() }
}
