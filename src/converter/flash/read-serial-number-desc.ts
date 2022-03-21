import { ReadFlashDataRequest, ReadFlashDataUSBSerialNumberRequest } from '../../messages/flash.request.js'
import { ReadFlashDataUSBSerialNumberResponse } from '../../messages/flash.response.js'
import { DecoderBufferSource } from '../converter.js'

import { decodeStatusResponse } from '../decoders.js'

export class ReadFlashDataUSBSerialNumberResponseCoder {
	static encode(res: ReadFlashDataUSBSerialNumberResponse): ArrayBuffer { throw new Error('unused') }
	static decode(bufferSource: DecoderBufferSource): ReadFlashDataUSBSerialNumberResponse {
		const dv = ArrayBuffer.isView(bufferSource) ?
			new DataView(bufferSource.buffer, bufferSource.byteOffset, bufferSource.byteLength) :
			new DataView(bufferSource)

		const { command, status, statusCode } = decodeStatusResponse(dv, 0xB0) as ReadFlashDataUSBSerialNumberResponse

		const subCommandByteLength = dv.getUint8(2)
		throw new Error('😟')
	}
}

export class ReadFlashDataUSBSerialNumberRequestCoder {
	static encode(req: ReadFlashDataRequest): ArrayBuffer {
		return Uint8ClampedArray.from([ 0xB0, 0x04 ])
	}
	static decode(bufferSource: DecoderBufferSource): ReadFlashDataUSBSerialNumberRequest { throw new Error('unused') }
}
