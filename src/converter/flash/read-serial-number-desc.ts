import { ReadFlashDataRequest, ReadFlashDataUSBSerialNumberRequest } from '../../messages/flash.request.js'
import { ReadFlashDataUSBSerialNumberResponse } from '../../messages/flash.response.js'
import { READ_FLASH_DATA_COMMAND, READ_FLASH_USB_SERIAL_NUMBER_SUB_COMMAND_CODE } from '../../messages/message.consts.js'
import { DecoderBufferSource } from '../converter.js'

import { decodeFlashDataUSBStringResponse } from '../decoders.js'
import { Unused } from '../throw.js'

export class ReadFlashDataUSBSerialNumberResponseCoder {
	static encode(res: ReadFlashDataUSBSerialNumberResponse): ArrayBuffer { throw new Unused() }
	static decode(bufferSource: DecoderBufferSource): ReadFlashDataUSBSerialNumberResponse {
		return decodeFlashDataUSBStringResponse(
			//opaque: '__im_not_a_number_im_a_free_man__',
			READ_FLASH_DATA_COMMAND,
			READ_FLASH_USB_SERIAL_NUMBER_SUB_COMMAND_CODE,
			bufferSource) as ReadFlashDataUSBSerialNumberResponse
	}
}

export class ReadFlashDataUSBSerialNumberRequestCoder {
	static encode(req: ReadFlashDataRequest): ArrayBuffer {
		return Uint8ClampedArray.from([ READ_FLASH_DATA_COMMAND, READ_FLASH_USB_SERIAL_NUMBER_SUB_COMMAND_CODE ])
	}
	static decode(bufferSource: DecoderBufferSource): ReadFlashDataUSBSerialNumberRequest { throw new Unused() }
}
