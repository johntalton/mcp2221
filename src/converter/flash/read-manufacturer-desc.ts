import { ReadFlashDataRequest, ReadFlashDataUSBManufacturerRequest } from '../../messages/flash.request.js'
import { ReadFlashDataUSBManufacturerResponse } from '../../messages/flash.response.js'
import { DecoderBufferSource } from '../converter.js'

import { decodeStatusResponse, decodeUSBString } from '../decoders.js'

export class ReadFlashDataUSBManufacturerResponseCoder {
	static encode(res: ReadFlashDataUSBManufacturerResponse): ArrayBuffer { throw new Error('unused') }
	static decode(bufferSource: DecoderBufferSource): ReadFlashDataUSBManufacturerResponse {
		console.log(bufferSource)
		const dv = ArrayBuffer.isView(bufferSource) ?
			new DataView(bufferSource.buffer, bufferSource.byteOffset, bufferSource.byteLength) :
			new DataView(bufferSource)

		const response = decodeStatusResponse(dv, 0xB0) as ReadFlashDataUSBManufacturerResponse
		const { command, status, statusCode } = response
		if(statusCode !== 0) { return response }

		const subCommandByteLength = dv.getUint8(2)
		const three = dv.getUint8(3)
		if(three !== 0x03) { throw new Error('manufacturer sentinal value error') }

		const usbStringLegth = subCommandByteLength - 2
		if(usbStringLegth < 0 || usbStringLegth > 60) { throw new Error('manufacturer length out of bounds') }

		const usbDv = new DataView(dv.buffer, dv.byteOffset + 4)
		const descriptor = decodeUSBString(usbDv, usbStringLegth)

		return {
			opaque: '__man_your_facuturer__',
			command, subCommand: 0x02,
			status, statusCode,

			descriptor, subCommandByteLength
		}
	}
}

export class ReadFlashDataUSBManufacturerRequestCoder {
	static encode(req: ReadFlashDataRequest): ArrayBuffer {
		return Uint8ClampedArray.from([ 0xB0, 0x02 ])
	}
	static decode(bufferSource: DecoderBufferSource): ReadFlashDataUSBManufacturerRequest { throw new Error('unused') }
}
