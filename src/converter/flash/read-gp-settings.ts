import { ReadFlashDataGPSettingsRequest, ReadFlashDataRequest } from '../../messages/flash.request.js'
import { ReadFlashDataGPSettingsResponse } from '../../messages/flash.response.js'
import { EXPECTED_GP_BYTE_LENGTH, READ_FLASH_DATA_COMMAND, READ_FLASH_DATA_GP_SETTINGS_SUB_COMMAND } from '../../messages/message.constants.js'
import { DecoderBufferSource } from '../converter.js'

import { decodeGpioByte, decodeStatusResponse, gpio0Designation, gpio1Designation, gpio2Designation, gpio3Designation, isStatusSuccess } from '../decoders.js'
import { newReportBuffer } from '../encoders.js'
import { Invalid, Unused } from '../throw.js'

export class ReadFlashDataGPSettingsResponseCoder {
	static encode(res: ReadFlashDataGPSettingsResponse): ArrayBuffer { throw new Unused() }
	static decode(bufferSource: DecoderBufferSource): ReadFlashDataGPSettingsResponse {
		const dv = ArrayBuffer.isView(bufferSource) ?
			new DataView(bufferSource.buffer, bufferSource.byteOffset, bufferSource.byteLength) :
			new DataView(bufferSource)

		const response = decodeStatusResponse(READ_FLASH_DATA_COMMAND, bufferSource) as ReadFlashDataGPSettingsResponse
		if(!isStatusSuccess(response)) { return response }

		const subCommandByteLength = dv.getUint8(2)
		if(subCommandByteLength !== EXPECTED_GP_BYTE_LENGTH) { throw new Invalid('subcommand length', subCommandByteLength) }

		const gpio0Byte = dv.getUint8(4)
		const gpio1Byte = dv.getUint8(5)
		const gpio2Byte = dv.getUint8(6)
		const gpio3Byte = dv.getUint8(7)

		const gpio0 = decodeGpioByte(gpio0Byte, gpio0Designation)
		const gpio1 = decodeGpioByte(gpio1Byte, gpio1Designation)
		const gpio2 = decodeGpioByte(gpio2Byte, gpio2Designation)
		const gpio3 = decodeGpioByte(gpio3Byte, gpio3Designation)

		return {
			...response,
			subCommand: READ_FLASH_DATA_GP_SETTINGS_SUB_COMMAND,
			gpio0, gpio1, gpio2, gpio3
		}
	}
}

export class ReadFlashDataGPSettingsRequestCoder {
	static encode(req: ReadFlashDataRequest): ArrayBuffer {
		const report = newReportBuffer()
		const dv = new DataView(report)

		dv.setUint8(0, READ_FLASH_DATA_COMMAND)
		dv.setUint8(1, READ_FLASH_DATA_GP_SETTINGS_SUB_COMMAND)

		return report
	}
	static decode(bufferSource: DecoderBufferSource): ReadFlashDataGPSettingsRequest { throw new Unused() }
}
