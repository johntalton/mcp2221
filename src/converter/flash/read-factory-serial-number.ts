import { ReadFlashDataFactorySerialNumberRequest, ReadFlashDataRequest } from '../../messages/flash.request.js'
import { ReadFlashDataFactorySerialNumberResponse } from '../../messages/flash.response.js'
import { READ_FLASH_DATA_COMMAND, READ_FLASH_DATA_FACTORY_SERIAL_NUMBER_SUB_COMMAND } from '../../messages/message.consts.js'
import { DecoderBufferSource } from '../converter.js'

import { decodeStatusResponse, isStatusSuccess } from '../decoders.js'
import { newReportBuffer } from '../encoders.js'
import { Unused } from '../throw.js'

export class ReadFlashDataFactorySerialNumberResponseCoder {
	static encode(res: ReadFlashDataFactorySerialNumberResponse): ArrayBuffer { throw new Unused() }
	static decode(bufferSource: DecoderBufferSource): ReadFlashDataFactorySerialNumberResponse {
		const dv = ArrayBuffer.isView(bufferSource) ?
			new DataView(bufferSource.buffer, bufferSource.byteOffset, bufferSource.byteLength) :
			new DataView(bufferSource)

		const response = decodeStatusResponse(READ_FLASH_DATA_COMMAND, bufferSource) as ReadFlashDataFactorySerialNumberResponse
		const { command, status, statusCode } = response
		if(!isStatusSuccess(response)) { return response }

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
		const report = newReportBuffer()
		const dv = new DataView(report)

		dv.setUint8(0, READ_FLASH_DATA_COMMAND)
		dv.setUint8(1, READ_FLASH_DATA_FACTORY_SERIAL_NUMBER_SUB_COMMAND)

		return report
	}
	static decode(bufferSource: DecoderBufferSource): ReadFlashDataFactorySerialNumberRequest { throw new Unused() }
}
