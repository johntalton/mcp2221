import { ReadFlashDataRequest, ReadFlashDataUSBSerialNumberRequest } from '../../messages/flash.request.js'
import { ReadFlashDataUSBSerialNumberResponse } from '../../messages/flash.response.js'
import { DecoderBufferSource } from '../converter.js'

import { decodeStatusResponse, decodeUSBString } from '../decoders.js'

export class ReadFlashDataUSBSerialNumberResponseCoder {
	static encode(res: ReadFlashDataUSBSerialNumberResponse): ArrayBuffer { throw new Error('unused') }
	static decode(bufferSource: DecoderBufferSource): ReadFlashDataUSBSerialNumberResponse {
		const dv = ArrayBuffer.isView(bufferSource) ?
			new DataView(bufferSource.buffer, bufferSource.byteOffset, bufferSource.byteLength) :
			new DataView(bufferSource)

		const response = decodeStatusResponse(dv, 0xB0) as ReadFlashDataUSBSerialNumberResponse
		const { command, status, statusCode } = response
		if(statusCode !== 0) { return response }

		const subCommandByteLength = dv.getUint8(2)
		const three = dv.getUint8(3)
		if(three !== 0x03) { throw new Error('serial number sentinal value error') }

		const usbStringLegth = subCommandByteLength - 2
		if(usbStringLegth < 0 || usbStringLegth > 60) { throw new Error('serial number length out of bounds') }

		const usbDv = new DataView(dv.buffer, dv.byteOffset + 4)
		const descriptor = decodeUSBString(usbDv, usbStringLegth)

		return {
			opaque: '__im_not_a_number_im_a_free_man__',
			command, subCommand: 0x04,
			status, statusCode,

			descriptor, subCommandByteLength
		}
	}
}

export class ReadFlashDataUSBSerialNumberRequestCoder {
	static encode(req: ReadFlashDataRequest): ArrayBuffer {
		return Uint8ClampedArray.from([ 0xB0, 0x04 ])
	}
	static decode(bufferSource: DecoderBufferSource): ReadFlashDataUSBSerialNumberRequest { throw new Error('unused') }
}
