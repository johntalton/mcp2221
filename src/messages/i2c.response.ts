import { Response, Success, Busy, Error } from './message.js'

//
export type I2CWriteDataResponseBase = Response & (Success | Busy) & {
	command: 0x90
}

export type I2CWriteDataSuccessResponse = I2CWriteDataResponseBase & Success & {
}

export type I2CWriteDataBusyResponse = I2CWriteDataResponseBase & Busy & {
}

export type I2CWriteDataResponse = I2CWriteDataSuccessResponse | I2CWriteDataBusyResponse

//
export type I2CWriteDataRepeatedSTARTResponseBase = Response & (Success | Busy) & {
	command: 0x92
}

export type I2CWriteDataRepeatedSTARTSuccessResponse = I2CWriteDataRepeatedSTARTResponseBase & Success & {
}

export type I2CWriteDataRepeatedSTARTBusyResponse = I2CWriteDataRepeatedSTARTResponseBase & Busy & {
}

export type I2CWriteDataRepeatedSTARTResponse = I2CWriteDataRepeatedSTARTSuccessResponse | I2CWriteDataRepeatedSTARTBusyResponse

//
export type I2CWriteDataNoSTOPResponseBase = Response & (Success | Busy) & {
	command: 0x94
}

export type I2CWriteDataNoSTOPSuccessResponse = I2CWriteDataNoSTOPResponseBase & Success & {
}

export type I2CWriteDataNoSTOPBusyResponse = I2CWriteDataNoSTOPResponseBase & Busy & {
}

export type I2CWriteDataNoSTOPResponse = I2CWriteDataNoSTOPSuccessResponse | I2CWriteDataNoSTOPBusyResponse

//
export type I2CReadDataResponseBase = Response | (Success | Busy) & {
	command: 0x91
}

export type I2CReadDataSuccessResponse = I2CReadDataResponseBase & Success & {
	// buffer: ArrayBuffer
}

export type I2CReadDataBusyResponse = I2CReadDataResponseBase & Busy & {
}

export type I2CReadDataResponse = I2CReadDataSuccessResponse | I2CReadDataBusyResponse

//
export type I2CReadDataRepeatedSTARTResponseBase = Response | (Success | Busy) & {
	command: 0x91
}

export type I2CReadDataRepeatedSTARTSuccessResponse = I2CReadDataRepeatedSTARTResponseBase & Success & {
	// buffer: ArrayBuffer
}

export type I2CReadDataRepeatedSTARTBusyResponse = I2CReadDataRepeatedSTARTResponseBase & Busy & {
}

export type I2CReadDataRepeatedSTARTResponse = I2CReadDataRepeatedSTARTSuccessResponse | I2CReadDataRepeatedSTARTBusyResponse

//
export type I2CReadGetDataResponseBase = Response & (Success | Error) & {
	command: 0x40,
}

export type WithReturnBuffer = {
	validData: true,
	readBackBytes: number,
	buffer: ArrayBuffer
}

export type WithoutReturnBuffer = {
	validData: false,
	readBackBytes: -1,
	buffer?: undefined
}

export type I2CReadGetDataResponseSuccessWithBuffer = I2CReadGetDataResponseBase & Success & WithReturnBuffer
export type I2CReadGetDataResponseErrorWithBuffer = I2CReadGetDataResponseBase & Error & WithReturnBuffer
export type I2CReadGetDataResponseErrorWithoutBuffer = I2CReadGetDataResponseBase & Success & WithoutReturnBuffer


export type I2CReadGetDataResponse = I2CReadGetDataResponseSuccessWithBuffer | I2CReadGetDataResponseErrorWithBuffer | I2CReadGetDataResponseErrorWithoutBuffer