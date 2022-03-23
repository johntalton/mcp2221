import { ReadFlashDataRequest, ReadFlashDataUSBProductRequest } from '../../messages/flash.request.js'
import { ReadFlashDataUSBProductResponse } from '../../messages/flash.response.js'
import { DecoderBufferSource } from '../converter.js'

import { decodeStatusResponse, decodeUSBString } from '../decoders.js'

export class ReadFlashDataUSBProductResponseCoder {
	static encode(res: ReadFlashDataUSBProductResponse): ArrayBuffer { throw new Error('unused') }
	static decode(bufferSource: DecoderBufferSource): ReadFlashDataUSBProductResponse {
		const dv = ArrayBuffer.isView(bufferSource) ?
			new DataView(bufferSource.buffer, bufferSource.byteOffset, bufferSource.byteLength) :
			new DataView(bufferSource)

		const response = decodeStatusResponse(dv, 0xB0) as ReadFlashDataUSBProductResponse
		const { command, status, statusCode } = response
		if(statusCode !== 0) { return response }

		const subCommandByteLength = dv.getUint8(2)
		const three = dv.getUint8(3)
		if(three !== 0x03) { throw new Error('product sentinal value error') }

		const usbByteLength = subCommandByteLength - 2
		if(usbByteLength < 0 || usbByteLength > 60) { throw new Error('product length out of bounds') }

		const usbDv = new DataView(dv.buffer, dv.byteOffset + 4)
		const descriptor = decodeUSBString(usbDv, usbByteLength)

		return {
			opaque: '__pro_duct_work__',
			command, subCommand: 0x03,
			status, statusCode,

			descriptor, subCommandByteLength
		}
	}
}

export class ReadFlashDataUSBProductRequestCoder {
	static encode(req: ReadFlashDataRequest): ArrayBuffer {
		return Uint8ClampedArray.from([ 0xB0, 0x03 ])
	}
	static decode(bufferSource: DecoderBufferSource): ReadFlashDataUSBProductRequest { throw new Error('unused') }
}
