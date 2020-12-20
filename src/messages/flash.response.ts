import { ReadFlashDataRequest } from './flash.request'
import { Response } from './message'

type Success = { status: 'success', statusCode: 0x00 }
type NotSupported = { status: 'not-supported', statusCode: 0x02 }
type NotAllowed = { status: 'not-allowed', statusCode: 0x03 }

export type ReadFlashDataResponse = Response & (Success | NotSupported) & {
  command: 0xB0
}

export type ReadFlashDataSuccessResponse = ReadFlashDataRequest & Success & {
  length: number,
  data: ArrayBuffer
}

export type ReadFlashDataNotSupportedResponse = ReadFlashDataResponse & NotSupported & {
}


//  Read Chip Settings
export type ReadFlashDataChipSettingsResponse = ReadFlashDataSuccessResponse & {

}

//  Read GP Settings
export type ReadFlashDataGPSettingsResponse = ReadFlashDataSuccessResponse & {
  gpio0: {},
  gpio1: {},
  gpio2: {},
  gpio3: {}
}

//  Read USB Manufacturer Descriptor String
export type ReadFlashDataUSBManufacturerResponse = ReadFlashDataSuccessResponse & {
  descriptor: string
}

//  Read USB Product Descriptor String
export type ReadFlashDataUSBProductResponse = ReadFlashDataSuccessResponse & {
  descriptor: string
}

//  Read USB Serial Number Descriptor String
export type ReadFlashDataUSBSerialNumberResponse = ReadFlashDataSuccessResponse & {
  descriptor: string
}

//  Read Chip Factory Serial Number
export type ReadFlashDataFactorySerialNumberResponse = ReadFlashDataSuccessResponse & {
  descriptor: string
}


export type WriteFlashDataResponse = Response & (Success | NotSupported | NotAllowed) & {
}

export type WriteFlashDataSuccessResponse = WriteFlashDataResponse & Success & {
}

export type WriteFlashDataNotSupportedResponse = WriteFlashDataResponse & NotSupported & {
}

export type WriteFlashDataNotAllowedResponse = WriteFlashDataResponse & NotAllowed & {
}

// Send Flash Access Password
export type SendFlashAccessPasswordResponse = Response & (Success | NotAllowed) & {
}