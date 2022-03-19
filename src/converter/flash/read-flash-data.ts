import { ReadFlashDataRequest } from '../../messages/flash.request.js'
import { ReadFlashDataResponse } from '../../messages/flash.response.js'
import { DecoderBufferSource } from '../converter.js'

import { decodeStatusResponse } from '../_.js'

export class ReadFlashDataResponseCoder {
	static encode(res: ReadFlashDataResponse): ArrayBuffer { throw new Error('unused') }
	static decode(bufferSource: DecoderBufferSource): ReadFlashDataResponse {
		const dv = ArrayBuffer.isView(bufferSource) ?
			new DataView(bufferSource.buffer, bufferSource.byteOffset, bufferSource.byteLength) :
			new DataView(bufferSource)

		const { command, status, statusCode } = decodeStatusResponse(dv, 0xB0) as ReadFlashDataResponse

		const subCommandByteLength = dv.getUint8(2)

		const subCommandSpecific = dv.getUint8(2)

		throw new Error(' incomplete :( ')

		//  itStatusByte()

		//
		// const chipMaskByte = dv.getUint8(4)
		// const clockDividerByte = dv.getUint8(5)

		// console.log({ subCommandByteLength, chipMaskByte , clockDividerByte })


		// const chip = spl
		// return {
		//   opaque: '__can_you_guess__',
		//   command,
		//   status,
		//   statusCode,

		//   subCommand,

		//   chip,
		//   gp: {
		//     clock,
		//     dac,
		//     adc,
		//     interrupt
		//   },
		//   usb: {
		//     vendorId: 0,
		//     productId: 0,
		//     powerAttribute: 0,
		//     mARequested: 0
		//   }
		// }
	}
}

export class ReadFlashDataRequestCoder {
	static encode(req: ReadFlashDataRequest): ArrayBuffer {
		return Uint8ClampedArray.from([
			0xB0, req.subCommand
		])
	}
	static decode(bufferSource: DecoderBufferSource): ReadFlashDataRequest { throw new Error('unused') }
}
