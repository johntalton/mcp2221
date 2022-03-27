import { ReadFlashDataRequest, ReadFlashDataUSBProductRequest } from '../../messages/flash.request.js'
import { ReadFlashDataUSBProductResponse } from '../../messages/flash.response.js'
import { READ_FLASH_DATA_COMMAND, READ_FLASH_USB_PRODUCT_SUB_COMMAND_CODE } from '../../messages/message.consts.js'
import { DecoderBufferSource } from '../converter.js'

import { decodeFlashDataUSBStringResponse } from '../decoders.js'
import { newReportBuffer } from '../encoders.js'
import { Unused } from '../throw.js'


export class ReadFlashDataUSBProductResponseCoder {
	static encode(res: ReadFlashDataUSBProductResponse): ArrayBuffer { throw new Unused() }
	static decode(bufferSource: DecoderBufferSource): ReadFlashDataUSBProductResponse {
		return decodeFlashDataUSBStringResponse(
			// opaque: '__pro_duct_work__',
			READ_FLASH_DATA_COMMAND,
			READ_FLASH_USB_PRODUCT_SUB_COMMAND_CODE,
			bufferSource) as ReadFlashDataUSBProductResponse
	}
}

export class ReadFlashDataUSBProductRequestCoder {
	static encode(req: ReadFlashDataRequest): ArrayBuffer {
		const report = newReportBuffer()
		const dv = new DataView(report)

		dv.setUint8(0, READ_FLASH_DATA_COMMAND)
		dv.setUint8(1, READ_FLASH_USB_PRODUCT_SUB_COMMAND_CODE)

		return report
	}
	static decode(bufferSource: DecoderBufferSource): ReadFlashDataUSBProductRequest { throw new Unused() }
}
