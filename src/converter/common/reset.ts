import { ResetChipRequest } from '../../messages/common.request.js'
import { DecoderBufferSource } from '../converter.js'

import { RESET_MAGIC } from '../../messages/message.consts.js'

export class ResetChipRequestCoder {
	static encode(req: ResetChipRequest): ArrayBuffer {
		return Uint8ClampedArray.from([ 0x70, ...RESET_MAGIC ])
	}

	static decode(bufferSource: DecoderBufferSource): ResetChipRequest { throw new Error('unused') }
}

export class ResetChipResponseCoder {
	static encode(res: void): ArrayBuffer { throw new Error('unused') }
	static decode(bufferSource: DecoderBufferSource): void { return }
}
