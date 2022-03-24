import { WriteFlashDataChipSettingsRequest } from '../../messages/flash.request.js'
import { WriteFlashDataResponse } from '../../messages/flash.response.js'
import { WRITE_FLASH_DATA_COMMAND, WRITE_FLASH_DATA_CHIP_SETTINGS_SUB_COMMAND } from '../../messages/message.consts.js'
import { DecoderBufferSource } from '../converter.js'

import { decodeStatusResponse } from '../decoders.js'
import { newReportBuffer } from '../encoders.js'
import { Unimplemented, Unused } from '../throw.js'

export class WriteFlashDataChipSettingsResponseCoder {
	static encode(res: WriteFlashDataResponse): ArrayBuffer { throw new Unused() }
	static decode(bufferSource: DecoderBufferSource): WriteFlashDataResponse {
		const dv = ArrayBuffer.isView(bufferSource) ?
			new DataView(bufferSource.buffer, bufferSource.byteOffset, bufferSource.byteLength) :
			new DataView(bufferSource)

		const response = decodeStatusResponse(dv, WRITE_FLASH_DATA_COMMAND) as WriteFlashDataResponse
		const { command, status, statusCode } = response
		if(statusCode !== 0) { return response }

		return {
			opaque: '__oh_now_hold_on__',
			command, subCommand: WRITE_FLASH_DATA_CHIP_SETTINGS_SUB_COMMAND,
			status, statusCode
		}
	}
}

export class WriteFlashDataChipSettingsRequestCoder {
	static encode(req: WriteFlashDataChipSettingsRequest): ArrayBuffer {

		const { chip, gp, usb, password } = req ?? {}

		//

		//
		const buffer = newReportBuffer()
		const dv = new DataView(buffer)

		dv.setUint8(0, WRITE_FLASH_DATA_COMMAND)
		dv.setUint8(1, WRITE_FLASH_DATA_CHIP_SETTINGS_SUB_COMMAND)
		//dv.setUint8(2, clockOutputByte)


		throw new Unimplemented()


	}
	static decode(bufferSource: DecoderBufferSource): WriteFlashDataChipSettingsRequest { throw new Unused() }
}
