import { StatusParametersRequest } from '../../messages/common.request.js'
import { StatusParametersResponse } from '../../messages/common.response.js'
import { DecoderBufferSource } from '../converter.js'

import { dont_care, any_other, I2CReadPending2, I2CReadPending0, I2CReadPending1 } from '../../messages/message.consts.js'

import { decodeStatusResponse } from '../decoders.js'
import { I2CReadPending } from '../../messages/message.fragments.js'

// 50 - 400
const calcI2CDivider = (freq: number) => Math.floor((12000000 / (freq * 1000)) - 3);

export class StatusParametersResponseCoder {
  static encode(_res: StatusParametersResponse): ArrayBuffer { throw new Error('unused') }

  static decode(bufferSource: DecoderBufferSource): StatusParametersResponse {
    const dv = ArrayBuffer.isView(bufferSource) ?
      new DataView(bufferSource.buffer, bufferSource.byteOffset, bufferSource.byteLength) :
      new DataView(bufferSource)


    const { command, status, statusCode } = decodeStatusResponse(dv, 0x10) as StatusParametersResponse

    const cancelTransferByte = dv.getUint8(2)
    const setSpeedByte = dv.getUint8(3)
    const speedDividerByte = dv.getUint8(4)

    const i2cState = dv.getUint8(8)

    const requestedTransferLength = dv.getUint16(9, true)
    const transferredBytes = dv.getUint16(11, true)

    const dataBufferCounter = dv.getUint8(13)
    const communicationSpeedDivider = dv.getUint8(14)
    const timeoutMs = dv.getUint8(15)

    const address = dv.getUint16(16, true)

    const SCL = dv.getUint8(22)
    const SDA = dv.getUint8(23)

    const interruptEdgeDetectorStateByte = dv.getUint8(24)
    const pendingValue = dv.getUint8(25) as I2CReadPending

    const rhmaj = String.fromCharCode(dv.getUint8(46))
    const rhmin = String.fromCharCode(dv.getUint8(47))
    const rfmaj = String.fromCharCode(dv.getUint8(48))
    const rfmin = String.fromCharCode(dv.getUint8(49))

    const ch0 = dv.getUint16(50, true)
    const ch1 = dv.getUint16(52, true)
    const ch2 = dv.getUint16(54, true)

    //
    const interruptEdgeDetectorState = interruptEdgeDetectorStateByte === 1

    const i2cCancelled = cancelTransferByte !== 0x00

    const setSpeedRequested = setSpeedByte !== 0x00
    const setSpeedSuccessfull = setSpeedByte === 0x20

    const i2cClock = setSpeedSuccessfull ? speedDividerByte : undefined

    //const newSpeed = setSpeedSet ? speedDividerByte : undefined
    //console.log('________', i2cClock)

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
      status,
      statusCode,


      i2cCancelled,

      setSpeedByte, speedDividerByte,
      setSpeedRequested,
      setSpeedSuccessfull,
      i2cClock,

      i2cState,

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
    }
  }
}

export class StatusParametersRequestCoder {
  static encode(req: StatusParametersRequest): ArrayBuffer {
    const { cancelI2c, i2cClock } = req ?? {}

    const shouldCancel = cancelI2c !== undefined && cancelI2c === true
    const shouldClock = i2cClock !== undefined

    const cancleValue = shouldCancel ? 0x10 : any_other()
    const setClockValue = shouldClock ? 0x20 : any_other()
    const clockValue = shouldClock ? calcI2CDivider(i2cClock) : any_other()
    //console.log('>>>', shouldClock, setClockValue, clockValue, 12000000 / 100000 - 3)

    const buffer = new ArrayBuffer(64)
    const dv = new DataView(buffer)

    dv.setUint8(0, 0x10)
    dv.setUint8(1, dont_care())
    dv.setUint8(2, cancleValue)
    dv.setUint8(3, setClockValue)
    dv.setUint8(4, clockValue)

    return buffer
  }

  static decode(bufferSource: DecoderBufferSource): StatusParametersRequest { throw new Error('unused') }
}