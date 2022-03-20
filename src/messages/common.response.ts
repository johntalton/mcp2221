import { Response, Success } from './message.js'
import { I2CReadPending, I2CClock, Revision } from './message.fragments.js'

export type StatusParametersResponse = Response & Success & {
  command: 0x10,

  i2cCancelled?: boolean,
  i2cClock?: I2CClock,

  setSpeedByte?: number, // extra
  speedDividerByte?: number,
  setSpeedRequested?: boolean,
  setSpeedSuccessfull?: boolean,

  i2c: {
    address: number,
    requestedTransferLength: number,

    transferredBytes: number,
    dataBufferCounter: number,
    communicationSpeedDivider: number,
    timeoutMs: number,

    SCL: number,
    SDA: number,

    pendingValue: I2CReadPending
  },

  adc: {
    ch0: number,
    ch1: number,
    ch2: number
  },

  interruptEdgeDetectorState: boolean,

  revision: Revision
}
