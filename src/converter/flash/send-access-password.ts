import { SendFlashAccessPasswordRequest } from '../../messages/flash.request.js'
import { SendFlashAccessPasswordResponse } from '../../messages/flash.response.js'
import { SEND_FLASH_ACCESS_COMMAND } from '../../messages/message.consts.js'
import { DecoderBufferSource } from '../converter.js'

import { decodeStatusResponse, isStatusSuccess } from '../decoders.js'
import { newReportBuffer } from '../encoders.js'
import { Unimplemented, Unused } from '../throw.js'

export class SendFlashAccessPasswordResponseCoder {
	static encode(res: SendFlashAccessPasswordResponse): ArrayBuffer { throw new Unused() }
	static decode(bufferSource: DecoderBufferSource): SendFlashAccessPasswordResponse {
		const response = decodeStatusResponse(SEND_FLASH_ACCESS_COMMAND, bufferSource) as SendFlashAccessPasswordResponse
		if(!isStatusSuccess(response)) { return response }

		throw new Unimplemented()
	}
}

export class SendFlashAccessPasswordRequestCoder {
	static encode(req: SendFlashAccessPasswordRequest): ArrayBuffer {
		const report = newReportBuffer()
		const dv = new DataView(report)

		dv.setUint8(0, SEND_FLASH_ACCESS_COMMAND)

		//return report

		throw new Unimplemented()
	}

	static decode(bufferSource: DecoderBufferSource): SendFlashAccessPasswordRequest { throw new Unused() }
}
