import { Request } from './message.js'

type WithAddress = { address: number }

type I2CBufferSource = ArrayBuffer | SharedArrayBuffer | ArrayBufferView
type WithInputBuffer = { buffer: I2CBufferSource }

// I²C Write Data
export type I2CWriteDataRequest = Request & WithAddress & WithInputBuffer & {
  command?: 0x90
}

// I²C Write Data Repeated-STAR
export type I2CWriteDataRepeatedSTARTRequest = Request & WithAddress & WithInputBuffer &{
  command?: 0x92
}

// I²C Write Data No STOP
export type I2CWriteDataNoSTOPRequest = Request & WithAddress & WithInputBuffer &{
  command?: 0x94
}

// I²C Read Data
export type I2CReadDataRequest = Request & WithAddress & {
  command?: 0x91,

  length: number
}

// I²C Read Data Repeated-START
export type I2CReadDataRepeatedSTARTRequest = Request & WithAddress & {
  command?: 0x93,

  length: number
}

// I²C Read Data – Get I²C Data
export type I2CReadGetDataRequest = Request & WithAddress & {
  command?: 0x40
}
