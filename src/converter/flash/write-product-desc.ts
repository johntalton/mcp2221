import { WriteFlashDataUSBProductRequest } from '../../messages/flash.request.js'
import { WriteFlashDataResponse } from '../../messages/flash.response.js'
import { DecoderBufferSource } from '../converter.js'

import { decodeStatusResponse } from '../decoders.js'
import { encodeUSBString, newReportBuffer } from '../encoders.js'

export class WriteFlashDataUSBProductResponseCoder {
	static encode(res: WriteFlashDataResponse): ArrayBuffer { throw new Error('unused') }
	static decode(bufferSource: DecoderBufferSource): WriteFlashDataResponse {
		const dv = ArrayBuffer.isView(bufferSource) ?
			new DataView(bufferSource.buffer, bufferSource.byteOffset, bufferSource.byteLength) :
			new DataView(bufferSource)

		const response = decodeStatusResponse(dv, 0xB1) as WriteFlashDataResponse
		const { command, status, statusCode } = response
		if(statusCode !== 0) { return response }

		return {
			opaque: '__this_is_the_result__',
			command,
			status, statusCode
		}
	}
}

export class WriteFlashDataUSBProductRequestCoder {
	static encode(req: WriteFlashDataUSBProductRequest): ArrayBuffer {
		const { descriptor } = req

		const strBuffer = encodeUSBString(descriptor)
		const str16 = new Uint16Array(strBuffer)

		if(str16.length > 30) { throw new Error('descriptor too long') }

		const report = newReportBuffer()

		const dv = new DataView(report)
		dv.setUint8(0, 0xB1)
		dv.setUint8(1, 0x03)
		dv.setUint8(2, strBuffer.byteLength + 2)
		dv.setUint8(3, 0x03)

		const report16 = new Uint16Array(report, 4)
		report16.set(str16)

		return report
	}
	static decode(bufferSource: DecoderBufferSource): WriteFlashDataUSBProductRequest { throw new Error('unused') }
}
