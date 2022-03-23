import { WriteFlashDataChipSettingsRequest } from '../../messages/flash.request.js'
import { WriteFlashDataResponse } from '../../messages/flash.response.js'
import { DecoderBufferSource } from '../converter.js'

import { decodeStatusResponse } from '../decoders.js'
import { newReportBuffer } from '../encoders.js'

export class WriteFlashDataChipSettingsResponseCoder {
	static encode(res: WriteFlashDataResponse): ArrayBuffer { throw new Error('unused') }
	static decode(bufferSource: DecoderBufferSource): WriteFlashDataResponse {
		const dv = ArrayBuffer.isView(bufferSource) ?
			new DataView(bufferSource.buffer, bufferSource.byteOffset, bufferSource.byteLength) :
			new DataView(bufferSource)

		const response = decodeStatusResponse(dv, 0xB1) as WriteFlashDataResponse
		const { command, status, statusCode } = response
		if(statusCode !== 0) { return response }

		return {
			opaque: '__oh_now_hold_on__',
			command,
			status, statusCode
		}
	}
}

export class WriteFlashDataChipSettingsRequestCoder {
	static encode(req: WriteFlashDataChipSettingsRequest): ArrayBuffer {
		// return Uint8ClampedArray.from([ 0xB1, 0x00 ])

		const { chip, gp, usb, password } = req ?? {}

		//

		//
		const buffer = newReportBuffer()
		const dv = new DataView(buffer)

		dv.setUint8(0, 0xB1)
		dv.setUint8(1, 0x00)
		//dv.setUint8(2, clockOutputByte)





	}
	static decode(bufferSource: DecoderBufferSource): WriteFlashDataChipSettingsRequest { throw new Error('unused') }
}
