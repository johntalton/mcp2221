import { ReadFlashDataFactorySerialNumberRequest, ReadFlashDataRequest } from '../../messages/flash.request.js'
import { ReadFlashDataFactorySerialNumberResponse } from '../../messages/flash.response.js'
import { DecoderBufferSource } from '../converter.js'

import { decodeStatusResponse } from '../decoders.js'


export class ReadFlashDataFactorySerialNumberResponseCoder {
	static encode(res: ReadFlashDataFactorySerialNumberResponse): ArrayBuffer { throw new Error('unused') }
	static decode(bufferSource: DecoderBufferSource): ReadFlashDataFactorySerialNumberResponse {
		const dv = ArrayBuffer.isView(bufferSource) ?
			new DataView(bufferSource.buffer, bufferSource.byteOffset, bufferSource.byteLength) :
			new DataView(bufferSource)

		const response = decodeStatusResponse(dv, 0xB0) as ReadFlashDataFactorySerialNumberResponse
		const { command, status, statusCode } = response
		if(statusCode !== 0) { return response }

		const subCommandByteLength = dv.getUint8(2)

		const byteOffset = 4
		const begin = dv.byteOffset + byteOffset
		const end = subCommandByteLength
		const factorySN = new Uint8Array(dv.buffer, begin, end)

		return {
			opaque: '__direct_from_the_facts__',
			command, subCommand: 0x05,
			status, statusCode,

			descriptor: String.fromCharCode(...factorySN),
			//factorySN
		}
	}
}

export class ReadFlashDataFactorySerialNumberRequestCoder {
	static encode(req: ReadFlashDataRequest): ArrayBuffer {
		return Uint8ClampedArray.from([ 0xB0, 0x05 ])
	}
	static decode(bufferSource: DecoderBufferSource): ReadFlashDataFactorySerialNumberRequest { throw new Error('unused') }
}
