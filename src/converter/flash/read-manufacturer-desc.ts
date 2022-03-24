import { ReadFlashDataRequest, ReadFlashDataUSBManufacturerRequest } from '../../messages/flash.request.js'
import { ReadFlashDataUSBManufacturerResponse } from '../../messages/flash.response.js'
import { READ_FLASH_DATA_COMMAND, READ_FLASH_USB_MANUFACTURER_SUB_COMMAND_CODE } from '../../messages/message.consts.js'
import { DecoderBufferSource } from '../converter.js'

import { decodeFlashDataUSBStringResponse } from '../decoders.js'
import { Unused } from '../throw.js'

export class ReadFlashDataUSBManufacturerResponseCoder {
	static encode(res: ReadFlashDataUSBManufacturerResponse): ArrayBuffer { throw new Unused() }
	static decode(bufferSource: DecoderBufferSource): ReadFlashDataUSBManufacturerResponse {
		return decodeFlashDataUSBStringResponse(
			// opaque: '__man_your_facturer__'
			READ_FLASH_DATA_COMMAND,
			READ_FLASH_USB_MANUFACTURER_SUB_COMMAND_CODE,
			bufferSource) as ReadFlashDataUSBManufacturerResponse
	}
}

export class ReadFlashDataUSBManufacturerRequestCoder {
	static encode(req: ReadFlashDataRequest): ArrayBuffer {
		return Uint8ClampedArray.from([ READ_FLASH_DATA_COMMAND, READ_FLASH_USB_MANUFACTURER_SUB_COMMAND_CODE ])
	}
	static decode(bufferSource: DecoderBufferSource): ReadFlashDataUSBManufacturerRequest { throw new Unused() }
}
