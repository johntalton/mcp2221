import { ReadFlashDataRequest, ReadFlashDataUSBProductRequest } from '../../messages/flash.request.js'
import { ReadFlashDataUSBProductResponse } from '../../messages/flash.response.js'
import { DecoderBufferSource } from '../converter.js'

import { decodeStatusResponse } from '../decoders.js'

export class ReadFlashDataUSBProductResponseCoder {
	static encode(res: ReadFlashDataUSBProductResponse): ArrayBuffer { throw new Error('unused') }
	static decode(bufferSource: DecoderBufferSource): ReadFlashDataUSBProductResponse {
		const dv = ArrayBuffer.isView(bufferSource) ?
			new DataView(bufferSource.buffer, bufferSource.byteOffset, bufferSource.byteLength) :
			new DataView(bufferSource)

		const { command, status, statusCode } = decodeStatusResponse(dv, 0xB0) as ReadFlashDataUSBProductResponse

		const subCommandByteLength = dv.getUint8(2)
		throw new Error('😟')
	}
}

export class ReadFlashDataUSBProductRequestCoder {
	static encode(req: ReadFlashDataRequest): ArrayBuffer {
		return Uint8ClampedArray.from([ 0xB0, 0x03 ])
	}
	static decode(bufferSource: DecoderBufferSource): ReadFlashDataUSBProductRequest { throw new Error('unused') }
}
