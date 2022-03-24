import { I2CWriteDataNoSTOPRequest } from '../../messages/i2c.request.js'
import { I2CWriteDataNoSTOPResponse } from '../../messages/i2c.response.js'
import { I2C_READ_DATA_NO_STOP_COMMAND } from '../../messages/message.consts.js'
import { DecoderBufferSource } from '../converter.js'

import { decodeReadWriteResponse } from '../decoders.js'
import { newReportBuffer } from '../encoders.js'
import { Unused } from '../throw.js'

export class I2CWriteDataNoSTOPResponseCoder {
	static encode(_msg: I2CWriteDataNoSTOPResponse): ArrayBuffer { throw new Unused() }
	static decode(bufferSource: DecoderBufferSource): I2CWriteDataNoSTOPResponse {
		return decodeReadWriteResponse(I2C_READ_DATA_NO_STOP_COMMAND, bufferSource) as I2CWriteDataNoSTOPResponse
	}
}

export class I2CWriteDataNoSTOPRequestCoder {
	static encode(msg: I2CWriteDataNoSTOPRequest): ArrayBuffer {
		const buffer = newReportBuffer()
		const dv = new DataView(buffer)

		const userData = new Uint8Array(buffer, 4)
		const inputUserData = ArrayBuffer.isView(msg.buffer) ?
			new Uint8Array(msg.buffer.buffer, msg.buffer.byteOffset, msg.buffer.byteLength) :
			new Uint8Array(msg.buffer)

		userData.set(inputUserData)

		dv.setUint8(0, I2C_READ_DATA_NO_STOP_COMMAND)
		dv.setUint16(1, inputUserData.byteLength, true)
		dv.setUint8(3, (msg.address << 1) | 0)

		return buffer
	}
	static decode(_bufferSource: DecoderBufferSource): I2CWriteDataNoSTOPRequest { throw new Unused() }
}

