import { ReadFlashDataRequest, ReadFlashDataUSBManufacturerRequest } from '../../messages/flash.request.js'
import { ReadFlashDataUSBManufacturerResponse } from '../../messages/flash.response.js'
import { READ_FLASH_DATA_COMMAND, READ_FLASH_USB_MANUFACTURER_SUB_COMMAND_CODE } from '../../messages/message.constants.js'
import { DecoderBufferSource } from '../converter.js'

import { decodeFlashDataUSBStringResponse } from '../decoders.js'
import { newReportBuffer } from '../encoders.js'
import { Unused } from '../throw.js'

export class ReadFlashDataUSBManufacturerResponseCoder {
	static encode(res: ReadFlashDataUSBManufacturerResponse): ArrayBuffer { throw new Unused() }
	static decode(bufferSource: DecoderBufferSource): ReadFlashDataUSBManufacturerResponse {
		return decodeFlashDataUSBStringResponse(
			READ_FLASH_DATA_COMMAND,
			READ_FLASH_USB_MANUFACTURER_SUB_COMMAND_CODE,
			bufferSource) as ReadFlashDataUSBManufacturerResponse
	}
}

export class ReadFlashDataUSBManufacturerRequestCoder {
	static encode(req: ReadFlashDataRequest): ArrayBuffer {
		const report = newReportBuffer()
		const dv = new DataView(report)

		dv.setUint8(0, READ_FLASH_DATA_COMMAND)
		dv.setUint8(1, READ_FLASH_USB_MANUFACTURER_SUB_COMMAND_CODE)

		return report
	}
	static decode(bufferSource: DecoderBufferSource): ReadFlashDataUSBManufacturerRequest { throw new Unused() }
}
