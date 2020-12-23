
import { StatusParametersRequest, ResetChipRequest } from '../messages/common.request'
import { StatusParametersResponse } from '../messages/common.response'
import { Converter } from './converter'

function dont_care() { return 0x00 }
function any_other() { return 0x00 }

export class StatusParametersResponseCoder {
  static encode(res: StatusParametersResponse): ArrayBuffer { throw new Error('unused') }

  static decode(buffer: ArrayBuffer): StatusParametersResponse {
    return {
      opaque: '__incorrect__',
      command: 0x10,
      status: 'success',
      statusCode: 0x00,

      i2c: {
        address: 0,
        requestedTransferLength: 0,

        transferredBytes: 0,
        dataBufferCounter: 0,
        communicationSpeedDivider: 0,
        timeoutMs: 0,

        SCL: 0,
        SDA: 0,

        pendingValue: 0
      },

      adc: {
        ch0: 0,
        ch1: 0,
        ch2: 0
      },

      interruptEdgeDetectorState: false,

      revision: {
        hardware: { major: 'A', minor: '6' },
        firmware: { major: '1', minor: '1' }
      }
    }
  }
}

export class StatusParametersRequestCoder {
  static encode(req: StatusParametersRequest): ArrayBuffer {
    return Uint8ClampedArray.from([
      0x10,
      dont_care(),
      req.cancelI2c ? 0x10 : any_other(),
      req.i2cClock ? 0x20 : any_other(),
      req.i2cClock ? req.i2cClock : 0x00
    ])
  }

  static decode(buffer: ArrayBuffer): StatusParametersRequest { throw new Error('unused') }
}

export class ResetChipRequestCoder {
  static encode(req: ResetChipRequest): ArrayBuffer {
    const magic = [ 0xAB, 0xCD, 0xEF]

    return Uint8ClampedArray.from([
      0x70,
      dont_care(),
      ...magic
    ])
  }

  static decode(buffer: ArrayBuffer): ResetChipRequest { throw new Error('unused') }
}

export class ResetChipResponseCoder {
  static encode(res: void): ArrayBuffer { throw new Error('unused') }
  static decode(buffer: ArrayBuffer): void { return }
}

export const StatusParameter: Converter<StatusParametersRequest, StatusParametersResponse> = {
  to: StatusParametersResponseCoder.decode,
  from: StatusParametersRequestCoder.encode
}

export const ResetChip: Converter<ResetChipRequest, void> = {
  to: ResetChipResponseCoder.decode,
  from: ResetChipRequestCoder.encode
}
