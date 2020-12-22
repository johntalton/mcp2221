
import { StatusParametersRequest, ResetChipRequest } from '../messages/common.request'
import { StatusParametersResponse } from '../messages/common.response'

function dont_care() { return 0x00 }
function any_other() { return 0x00 }

export class StatusParameter {
  static to(buffer: ArrayBuffer): StatusParametersResponse {
    return {
      opaque: '',
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

      interruptEdgeDetectorState: 0,

      revision: {
        hardware: { major: 'A', minor: '6' },
        firmware: { major: '1', minor: '1' }
      }
    }
  }

  static from(req: StatusParametersRequest): ArrayBuffer {
    return Uint8ClampedArray.from([
      0x10,
      dont_care(),
      req.cancelI2c ? 0x10 : any_other(),
      req.i2cClock ? 0x20 : any_other(),
      req.i2cClock ? req.i2cClock : 0x00
    ])
  }
}

export class ResetChip {
  static to(buffer: ArrayBuffer): void {
    return
  }

  static from(req: ResetChipRequest): ArrayBuffer {
    return Uint8ClampedArray.from([
      0x10,
      dont_care()
    ])
  }
}
