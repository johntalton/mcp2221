import { Response, Success, Busy } from './message'

//
export type I2CWriteDataResponse = Response & (Success | Busy) & {
  command: 0x90
}

export type I2CWriteDataSuccessResponse = I2CWriteDataResponse & Success & {
}

export type I2CWriteDataBusyResponse = I2CWriteDataResponse & Busy & {
}

//
export type I2CWriteDataRepeatedSTARTResponse = Response & (Success | Busy) & {
  command: 0x92
}

export type I2CWriteDataRepeatedSTARTSuccessResponse = I2CWriteDataRepeatedSTARTResponse & Success & {
}

export type I2CWriteDataRepeatedSTARTBusyResponse = I2CWriteDataRepeatedSTARTResponse & Busy & {
}

//
export type I2CWriteDataNoSTOPResponse = Response & (Success | Busy) & {
  command: 0x94
}

export type I2CWriteDataNoSTOPSuccessResponse = I2CWriteDataNoSTOPResponse & Success & {
}

export type I2CWriteDataNoSTOPBusyResponse = I2CWriteDataNoSTOPResponse & Busy & {
}

//
export type I2CReadDataResponse = Response | (Success | Busy) & {
  command: 0x91
}

export type I2CReadDataSuccessResponse = I2CReadDataResponse & Success & {
}

export type I2CReadDataBusyResponse = I2CReadDataResponse & Busy & {
}

//
export type I2CReadDataRepeatedSTARTResponse = Response | (Success | Busy) & {
  command: 0x91
}

export type I2CReadDataRepeatedSTARTSuccessResponse = I2CReadDataRepeatedSTARTResponse & Success & {
}

export type I2CReadDataRepeatedSTARTBusyResponse = I2CReadDataRepeatedSTARTResponse & Busy & {
}

//
export type I2CReadGetDataResponse = Response & (Success | Error) & {
  command: 0x40
  buffer?: ArrayBuffer
}
