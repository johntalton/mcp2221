import { WriteFlashDataUSBSerialNumberRequest } from '../../messages/flash.request.js'
import { WriteFlashDataResponse } from '../../messages/flash.response.js'
import { DecoderBufferSource } from '../converter.js'

import { decodeStatusResponse } from '../decoders.js'
import { encodeUSBString, newReportBuffer } from '../encoders.js'

export class WriteFlashDataUSBSerialNumberResponseCoder {
	static encode(res: WriteFlashDataResponse): ArrayBuffer { throw new Error('unused') }
	static decode(bufferSource: DecoderBufferSource): WriteFlashDataResponse {
		const dv = ArrayBuffer.isView(bufferSource) ?
			new DataView(bufferSource.buffer, bufferSource.byteOffset, bufferSource.byteLength) :
			new DataView(bufferSource)

		const response = decodeStatusResponse(dv, 0xB1) as WriteFlashDataResponse
		const { command, status, statusCode } = response
		if(statusCode !== 0) { return response }

		return {
			opaque: '_and_now_for_something__',
			command,
			status, statusCode
		}
	}
}

export class WriteFlashDataUSBSerialNumberRequestCoder {
	static encode(req: WriteFlashDataUSBSerialNumberRequest): ArrayBuffer {
		const { descriptor } = req

		const strBuffer = encodeUSBString(descriptor)
		const str16 = new Uint16Array(strBuffer)

		const report = newReportBuffer()

		const dv = new DataView(report)
		dv.setUint8(0, 0xB1)
		dv.setUint8(1, 0x04)
		dv.setUint8(2, strBuffer.byteLength + 2)
		dv.setUint8(3, 0x03)

		const report16 = new Uint16Array(report, 4)
		report16.set(str16)

		return report
	}
	static decode(bufferSource: DecoderBufferSource): WriteFlashDataUSBSerialNumberRequest { throw new Error('unused') }
}
