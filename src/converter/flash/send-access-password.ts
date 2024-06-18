import { SendFlashAccessPasswordRequest } from '../../messages/flash.request.js'
import { SendFlashAccessPasswordResponse } from '../../messages/flash.response.js'
import { ACCESS_PASSWORD_BYTE_LENGTH, SEND_FLASH_ACCESS_COMMAND, dont_care } from '../../messages/message.constants.js'
import { DecoderBufferSource } from '../converter.js'

import { decodeStatusResponse, isStatusSuccess } from '../decoders.js'
import { encodeAccessPassword, newReportBuffer } from '../encoders.js'
import { Unimplemented, Unused } from '../throw.js'

export class SendFlashAccessPasswordResponseCoder {
	static encode(res: SendFlashAccessPasswordResponse): ArrayBuffer { throw new Unused() }
	static decode(bufferSource: DecoderBufferSource): SendFlashAccessPasswordResponse {
		const response = decodeStatusResponse(SEND_FLASH_ACCESS_COMMAND, bufferSource) as SendFlashAccessPasswordResponse
		if(!isStatusSuccess(response)) { return response }

		return response
	}
}

export class SendFlashAccessPasswordRequestCoder {
	static encode(req: SendFlashAccessPasswordRequest): ArrayBuffer {
		const { password } = req ?? {}

		const report = newReportBuffer()
		const dv = new DataView(report)

		dv.setUint8(0, SEND_FLASH_ACCESS_COMMAND)
		dv.setUint8(1, dont_care())

		encodeAccessPassword(password, new Uint8Array(report, 2, ACCESS_PASSWORD_BYTE_LENGTH))

		return report
	}

	static decode(bufferSource: DecoderBufferSource): SendFlashAccessPasswordRequest { throw new Unused() }
}
