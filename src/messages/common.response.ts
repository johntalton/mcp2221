import { Response, Success } from './message'

export type StatusParametersResponse = Response & Success & {
  command: 0x10,

  i2cCancelled?: boolean,
  i2cClock?: number,

  i2c: {
    address: number,
    requestedTransferLength: number,

    transferredBytes: number,
    dataBufferCounter: number,
    communicationSpeedDivider: number,
    timeoutMs: number,

    SCL: number,
    SDA: number,

    pendingValue: 0 | 1 | 2
  },

  adc: {
    ch0: number,
    ch1: number,
    ch2: number
  },

  interruptEdgeDetectorState: 0 | 1,

  revision: {
    hardware: { major: 'A', minor: '6' },
    firmware: { major: '1', minor: '1' }
  }
}
