import { ReadFlashDataFactorySerialNumberRequest, ReadFlashDataRequest } from '../../messages/flash.request.js'
import { ReadFlashDataFactorySerialNumberResponse } from '../../messages/flash.response.js'
import { READ_FLASH_DATA_COMMAND, READ_FLASH_DATA_FACTORY_SERIAL_NUMBER_SUB_COMMAND } from '../../messages/message.consts.js'
import { DecoderBufferSource } from '../converter.js'

import { decodeStatusResponse } from '../decoders.js'
import { Unused } from '../throw.js'

export class ReadFlashDataFactorySerialNumberResponseCoder {
	static encode(res: ReadFlashDataFactorySerialNumberResponse): ArrayBuffer { throw new Unused() }
	static decode(bufferSource: DecoderBufferSource): ReadFlashDataFactorySerialNumberResponse {
		const dv = ArrayBuffer.isView(bufferSource) ?
			new DataView(bufferSource.buffer, bufferSource.byteOffset, bufferSource.byteLength) :
			new DataView(bufferSource)

		const response = decodeStatusResponse(dv, READ_FLASH_DATA_COMMAND) as ReadFlashDataFactorySerialNumberResponse
		const { command, status, statusCode } = response
		if(statusCode !== 0) { return response }

		const subCommandByteLength = dv.getUint8(2)

		const byteOffset = 4
		const begin = dv.byteOffset + byteOffset
		const end = subCommandByteLength
		const factorySN = new Uint8Array(dv.buffer, begin, end)

		return {
			opaque: '__direct_from_the_facts__',
			command, subCommand: READ_FLASH_DATA_FACTORY_SERIAL_NUMBER_SUB_COMMAND,
			status, statusCode,

			descriptor: String.fromCharCode(...factorySN),
			//factorySN
		}
	}
}

export class ReadFlashDataFactorySerialNumberRequestCoder {
	static encode(req: ReadFlashDataRequest): ArrayBuffer {
		return Uint8ClampedArray.from([ READ_FLASH_DATA_COMMAND, READ_FLASH_DATA_FACTORY_SERIAL_NUMBER_SUB_COMMAND ])
	}
	static decode(bufferSource: DecoderBufferSource): ReadFlashDataFactorySerialNumberRequest { throw new Unused() }
}
