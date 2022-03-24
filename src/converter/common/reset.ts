import { ResetChipRequest } from '../../messages/common.request.js'
import { DecoderBufferSource } from '../converter.js'

import { RESET_CHIP_COMMAND, RESET_MAGIC } from '../../messages/message.consts.js'
import { Unused } from '../throw.js'

export class ResetChipRequestCoder {
	static encode(req: ResetChipRequest): ArrayBuffer {
		return Uint8ClampedArray.from([ RESET_CHIP_COMMAND, ...RESET_MAGIC ])
	}

	static decode(bufferSource: DecoderBufferSource): ResetChipRequest { throw new Unused() }
}

export class ResetChipResponseCoder {
	static encode(res: void): ArrayBuffer { throw new Unused() }
	static decode(bufferSource: DecoderBufferSource): void { return }
}
