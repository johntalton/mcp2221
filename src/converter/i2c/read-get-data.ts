import { I2CReadGetDataRequest } from '../../messages/i2c.request.js'
import { I2CReadGetDataResponse } from '../../messages/i2c.response.js'
import { I2C_READ_GET_DATA_COMMAND, MAX_I2C_READ_BYTES_LENGTH, READ_BACK_BYTES_I2C_ERROR_FLAG } from '../../messages/message.constants.js'
import { DecoderBufferSource, DecoderBufferTarget } from '../converter.js'

import { decodeReadWithI2CStateResponse, isStatusSuccess } from '../decoders.js'
import { newReportBuffer } from '../encoders.js'
import { Invalid, Unused } from '../throw.js'

export class I2CReadGetDataResponseCoder {
	static encode(_msg: I2CReadGetDataResponse): ArrayBuffer { throw new Unused() }
	static decode(bufferSource: DecoderBufferSource, bufferTarget?: DecoderBufferTarget): I2CReadGetDataResponse {

		const response = decodeReadWithI2CStateResponse(I2C_READ_GET_DATA_COMMAND, bufferSource) as I2CReadGetDataResponse
		if(!isStatusSuccess(response)) { return response }

		//
		const dv = ArrayBuffer.isView(bufferSource) ?
			new DataView(bufferSource.buffer, bufferSource.byteOffset, bufferSource.byteLength) :
			new DataView(bufferSource)

		const readBackBytesByte = dv.getUint8(3)

		//
		const validData = readBackBytesByte !== READ_BACK_BYTES_I2C_ERROR_FLAG
		if(!validData) { throw new Invalid('data', readBackBytesByte) }

		const readBackBytes = readBackBytesByte
		if((readBackBytes < 0 || readBackBytes > MAX_I2C_READ_BYTES_LENGTH)) { throw new Invalid('readBytes out of range', readBackBytes) }

		const user8 = new Uint8Array(dv.buffer, dv.byteOffset + 4, readBackBytes)

		if(bufferTarget !== undefined) {
			// console.log('🎯')

			const target8 = ArrayBuffer.isView(bufferTarget) ?
				new Uint8Array(bufferTarget.buffer, bufferTarget.byteOffset, readBackBytes) :
				new Uint8Array(bufferTarget, 0, readBackBytes)

			// copy buffer
			target8.set(user8)

			return {
				...response,
				validData,
				readBackBytes,
				buffer: target8
			}

		}

		// console.log('no target, you get a view')

		return {
			...response,
			validData,
			readBackBytes,
			buffer: user8
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
