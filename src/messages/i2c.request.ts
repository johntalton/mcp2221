import { Request, COMMAND_CODE } from './message'

// I²C Write Data
export type I2CWriteDataRequest = Request & {
  command: typeof COMMAND_CODE.I2C_WRITE_DATA,
  address: number,
  buffer: ArrayBuffer
}

// I²C Write Data Repeated-STAR
export type I2CWriteDataRepeatedSTARTRequest = Request & {
  command: typeof COMMAND_CODE.I2C_WRITE_DATA_REPEATED_START,
  address: number,
  buffer: ArrayBuffer
}

// I²C Write Data No STOP
export type I2CWriteDataNoSTOPRequest = Request & {
  command: typeof COMMAND_CODE.I2C_WRITE_DATA_NO_STOP,
  address: number,
  buffer: ArrayBuffer
}

// I²C Read Data
export type I2CReadDataRequest = Request & {
  command: typeof COMMAND_CODE.I2C_READ_DATA,
  address: number,
  length: number
}

// I²C Read Data Repeated-START
export type I2CReadDataRepeatedSTARTRequest = Request & {
  command: typeof COMMAND_CODE.I2C_READ_DATA_REPEATED_START,
  address: number,
  length: number
}

// I²C Read Data – Get I²C Data
export type I2CReadGetDataRequest = Request & {
  command: typeof COMMAND_CODE.I2C_READ_GET_DATA
}
