import { Request } from './message'


// Status/Set Parameters
export type StatusParametersRequest = Request & {
  command: 0x10,

  cancelI2c?: boolean,
  i2cClock?: number
}


// Reset Chip
export type ResetChipRequest = Request & {
  command: 0x70
  // 0xAB, 0xCD, 0xEF
}
