/* eslint-disable sort-imports */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-classes-per-file */
import { StatusParametersRequest, ResetChipRequest } from '../messages/common.request.js'
import { StatusParametersResponse } from '../messages/common.response.js'
import { Converter, DecoderBufferSource } from './converter.js'

function dont_care() { return 0x00 }

function any_other() { return 0x00 }

export class StatusParametersResponseCoder {
  static encode(_res: StatusParametersResponse): ArrayBuffer { throw new Error('unused') }

  static decode(bufferSource: DecoderBufferSource): StatusParametersResponse {
    const dv = ArrayBuffer.isView(bufferSource) ?
      new DataView(bufferSource.buffer, bufferSource.byteOffset, bufferSource.byteLength) :
      new DataView(bufferSource)

    const command = dv.getUint8(0)
    const statusCode = dv.getUint8(1)

    if(command !== 0x10) { throw new Error('invalid command byte decoded') }
    if(statusCode !== 0x00) {
      throw new Error('invalid statusCode')
    }

    const cancelTransferByte = dv.getUint8(2)
    const setSpeedByte = dv.getUint8(3)
    const speedDividerByte = dv.getUint8(4)

    const requestedTransferLength = dv.getUint16(9, true)
    const transferredBytes = dv.getUint16(11, true)

    const dataBufferCounter = dv.getUint8(13)
    const communicationSpeedDivider = dv.getUint8(14)
    const timeoutMs = dv.getUint8(15)

    const address = dv.getUint16(16, true)

    const SCL = dv.getUint8(22)
    const SDA = dv.getUint8(23)

    const interruptEdgeDetectorStateByte = dv.getUint8(24)
    const pendingValue = dv.getUint8(25)

    const rhmaj = String.fromCharCode(dv.getUint8(46))
    const rhmin = String.fromCharCode(dv.getUint8(47))
    const rfmaj = String.fromCharCode(dv.getUint8(48))
    const rfmin = String.fromCharCode(dv.getUint8(49))

    const ch0 = dv.getUint16(50, true)
    const ch1 = dv.getUint16(52, true)
    const ch2 = dv.getUint16(54, true)

    //
    const interruptEdgeDetectorState = interruptEdgeDetectorStateByte === 1
    const setSpeedSet = setSpeedByte !== 0x00
    const i2cCancelled = cancelTransferByte !== 0x00
    const i2cClock = setSpeedSet ? speedDividerByte : undefined

    //
    if(rhmaj !== 'A') { throw new Error('invalid hardware major byte decoded') }
    if(rhmin !== '6') { throw new Error('invalid hardware minor byte decoded') }
    if(rfmaj !== '1') { throw new Error('invalid firmware major byte decoded') }
    if(!['1', '2'].includes(rfmin)) { console.log('invalid firmware minor byte decoded') }

    const revision = {
      hardware: { major: rhmaj, minor: rhmin },
      firmware: { major: rfmaj, minor: rfmin }
    }

    return {
      opaque: '__kinda_mostly_close__',
      command,
      status: 'success',
      statusCode,

      i2cCancelled,
      i2cClock,

      i2c: {
        address,

        requestedTransferLength,
        transferredBytes,

        dataBufferCounter,
        communicationSpeedDivider,
        timeoutMs,

        SCL,
        SDA,

        pendingValue
      },

      adc: {
        ch0,
        ch1,
        ch2
      },

      interruptEdgeDetectorState,

      revision
    } as StatusParametersResponse
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

  static decode(bufferSource: DecoderBufferSource): StatusParametersRequest { throw new Error('unused') }
}

export class ResetChipRequestCoder {
  static encode(req: ResetChipRequest): ArrayBuffer {
    const magic = [ 0xAB, 0xCD, 0xEF]

    return Uint8ClampedArray.from([
      0x70,
      ...magic
    ])
  }

  static decode(bufferSource: DecoderBufferSource): ResetChipRequest { throw new Error('unused') }
}

export class ResetChipResponseCoder {
  static encode(res: void): ArrayBuffer { throw new Error('unused') }
  static decode(bufferSource: DecoderBufferSource): void { return }
}

export const StatusParameter: Converter<StatusParametersRequest, StatusParametersResponse> = {
  to: StatusParametersResponseCoder.decode,
  from: StatusParametersRequestCoder.encode
}

export const ResetChip: Converter<ResetChipRequest, void> = {
  to: ResetChipResponseCoder.decode,
  from: ResetChipRequestCoder.encode
}
