import { ReadFlashDataRequest, ReadFlashDataUSBManufacturerRequest } from '../../messages/flash.request.js'
import { ReadFlashDataUSBManufacturerResponse } from '../../messages/flash.response.js'
import { DecoderBufferSource } from '../converter.js'

import { decodeStatusResponse } from '../decoders.js'

export class ReadFlashDataUSBManufacturerResponseCoder {
	static encode(res: ReadFlashDataUSBManufacturerResponse): ArrayBuffer { throw new Error('unused') }
	static decode(bufferSource: DecoderBufferSource): ReadFlashDataUSBManufacturerResponse {
		const dv = ArrayBuffer.isView(bufferSource) ?
			new DataView(bufferSource.buffer, bufferSource.byteOffset, bufferSource.byteLength) :
			new DataView(bufferSource)

		const { command, status, statusCode } = decodeStatusResponse(dv, 0xB0) as ReadFlashDataUSBManufacturerResponse

		const subCommandByteLength = dv.getUint8(2)
		throw new Error('😟')
	}
}

export class ReadFlashDataUSBManufacturerRequestCoder {
	static encode(req: ReadFlashDataRequest): ArrayBuffer {
		return Uint8ClampedArray.from([ 0xB0, 0x02 ])
	}
	static decode(bufferSource: DecoderBufferSource): ReadFlashDataUSBManufacturerRequest { throw new Error('unused') }
}
