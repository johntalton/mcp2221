import { Request, COMMAND_CODE } from './message'


// Status/Set Parameters
export type StatusParametersRequest = Request & {
  command: COMMAND_CODE.STATUS_SET_PARAMETERS,

  cancleI2c?: boolean,
  i2cClock?: number
}


// Reset Chip
export type ResetChipRequest = Request & {
  command: COMMAND_CODE.RESET
  // 0xAB, 0xCD, 0xEF
}
