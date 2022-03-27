import { I2CReadGetDataRequest } from '../../messages/i2c.request.js'
import { I2CReadGetDataResponse } from '../../messages/i2c.response.js'
import { I2C_READ_GET_DATA_COMMAND } from '../../messages/message.consts.js'
import { DecoderBufferSource } from '../converter.js'

import { decodeReadResponse, isStatusSuccess } from '../decoders.js'
import { newReportBuffer } from '../encoders.js'
import { Unused } from '../throw.js'

export const READ_BACK_BYTES_ERROR_FLAG = 127

export class I2CReadGetDataResponseCoder {
	static encode(_msg: I2CReadGetDataResponse): ArrayBuffer { throw new Unused() }
	static decode(bufferSource: DecoderBufferSource): I2CReadGetDataResponse {

		const response = decodeReadResponse(I2C_READ_GET_DATA_COMMAND, bufferSource) as I2CReadGetDataResponse
		if(!isStatusSuccess(response)) { return response }

		//
		const dv = ArrayBuffer.isView(bufferSource) ?
			new DataView(bufferSource.buffer, bufferSource.byteOffset, bufferSource.byteLength) :
			new DataView(bufferSource)

		const readBackBytesByte = dv.getUint8(3)

		//
		const validData = readBackBytesByte !== READ_BACK_BYTES_ERROR_FLAG
		if(!validData) {
			return {
				...response,
				validData: false,
				readBackBytes: -1,
				buffer: undefined
		 }
		}

		const readBackBytes = readBackBytesByte
		if((readBackBytes < 0 || readBackBytes > 60)) { throw new Error('read back bytes out of range') }

		const user8 = new Uint8Array(dv.buffer, dv.byteOffset + 4, readBackBytes)

		// note.  slicing out user data for return (copy)
		const buffer = user8.slice()

		return {
			...response,
			validData,
			readBackBytes,
			buffer
		}
	}
}

export class I2CReadGetDataRequestCoder {
	static encode(msg: I2CReadGetDataRequest): ArrayBuffer {
		const buffer = newReportBuffer()
		const dv = new DataView(buffer)

		dv.setUint8(0, I2C_READ_GET_DATA_COMMAND)

		return buffer
	}
	static decode(_bufferSource: DecoderBufferSource): I2CReadGetDataRequest { throw new Unused() }
}
