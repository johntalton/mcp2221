import { ReadFlashDataGPSettingsRequest, ReadFlashDataRequest } from '../../messages/flash.request.js'
import { ReadFlashDataGPSettingsResponse } from '../../messages/flash.response.js'
import { READ_FLASH_DATA_COMMAND, READ_FLASH_DATA_GP_SETTINGS_SUB_COMMAND } from '../../messages/message.consts.js'
import { DecoderBufferSource } from '../converter.js'

import { decodeGpioByte, decodeStatusResponse, gpio0Designation, gpio1Designation, gpio2Designation, gpio3Designation } from '../decoders.js'
import { Unused } from '../throw.js'

const EXPECTED_GP_BYTE_LENGTH = 4

export class ReadFlashDataGPSettingsResponseCoder {
	static encode(res: ReadFlashDataGPSettingsResponse): ArrayBuffer { throw new Unused() }
	static decode(bufferSource: DecoderBufferSource): ReadFlashDataGPSettingsResponse {
		const dv = ArrayBuffer.isView(bufferSource) ?
			new DataView(bufferSource.buffer, bufferSource.byteOffset, bufferSource.byteLength) :
			new DataView(bufferSource)

		const response = decodeStatusResponse(dv, READ_FLASH_DATA_COMMAND) as ReadFlashDataGPSettingsResponse
		const { command, status, statusCode } = response
		if(statusCode !== 0) { return response }

		const subCommandByteLength = dv.getUint8(2)
		if(subCommandByteLength !== EXPECTED_GP_BYTE_LENGTH) { throw new Error('subcommand length error') }

		const gpio0Byte = dv.getUint8(4)
		const gpio1Byte = dv.getUint8(5)
		const gpio2Byte = dv.getUint8(6)
		const gpio3Byte = dv.getUint8(7)

		const gpio0 = decodeGpioByte(gpio0Byte, gpio0Designation)
		const gpio1 = decodeGpioByte(gpio1Byte, gpio1Designation)
		const gpio2 = decodeGpioByte(gpio2Byte, gpio2Designation)
		const gpio3 = decodeGpioByte(gpio3Byte, gpio3Designation)

		return {
			opaque: '__general_io__',
			command, subCommand: 0x01,
			status, statusCode,

			gpio0, gpio1, gpio2, gpio3
		}
	}
}

export class ReadFlashDataGPSettingsRequestCoder {
	static encode(req: ReadFlashDataRequest): ArrayBuffer {
		return Uint8ClampedArray.from([ READ_FLASH_DATA_COMMAND, READ_FLASH_DATA_GP_SETTINGS_SUB_COMMAND ])
	}
	static decode(bufferSource: DecoderBufferSource): ReadFlashDataGPSettingsRequest { throw new Unused() }
}
