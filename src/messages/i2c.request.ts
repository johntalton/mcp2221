import { Request } from './message'

type WithAddress = { address: number }

// I²C Write Data
export type I2CWriteDataRequest = Request & WithAddress & {
  command?: 0x90,

  buffer: ArrayBuffer
}

// I²C Write Data Repeated-STAR
export type I2CWriteDataRepeatedSTARTRequest = Request & WithAddress & {
  command?: 0x92,

  buffer: ArrayBuffer
}

// I²C Write Data No STOP
export type I2CWriteDataNoSTOPRequest = Request & WithAddress & {
  command?: 0x94,

  buffer: ArrayBuffer
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
