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

		const { command, status, statusCode } = decodeStatusResponse(dv, 0xB0) as ReadFlashDataFactorySerialNumberResponse

		const subCommandByteLength = dv.getUint8(2)
		throw new Error('😟')
	}
}

export class ReadFlashDataFactorySerialNumberRequestCoder {
	static encode(req: ReadFlashDataRequest): ArrayBuffer {
		return Uint8ClampedArray.from([ 0xB0, 0x05 ])
	}
	static decode(bufferSource: DecoderBufferSource): ReadFlashDataFactorySerialNumberRequest { throw new Error('unused') }
}
