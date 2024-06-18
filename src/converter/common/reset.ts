import { ResetChipRequest } from '../../messages/common.request.js'
import { DecoderBufferSource } from '../converter.js'

import { RESET_CHIP_COMMAND, RESET_MAGIC } from '../../messages/message.constants.js'
import { Unused } from '../throw.js'
import { newReportBuffer } from '../encoders.js'

export class ResetChipResponseCoder {
	static encode(res: void): ArrayBuffer { throw new Unused() }
	static decode(bufferSource: DecoderBufferSource): void { return }
}

export class ResetChipRequestCoder {
	static encode(req: ResetChipRequest): ArrayBuffer {
		const report = newReportBuffer()
		const dv = new DataView(report)

		dv.setUint8(0, RESET_CHIP_COMMAND)
		dv.setUint8(1, RESET_MAGIC[0])
		dv.setUint8(2, RESET_MAGIC[1])
		dv.setUint8(3, RESET_MAGIC[2])

		return report
	}

	static decode(bufferSource: DecoderBufferSource): ResetChipRequest { throw new Unused() }
}

