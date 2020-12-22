import { Response, Success, NotSupported, NotAllowed } from './message'
import { ChipSettings, GeneralPurpose, GpDesignation, UsbSettings, GpioDirection, GpioOutputValue, Gpio } from './message.fragments'

export type ReadFlashDataResponseBase = Response & (Success | NotSupported) & {
  command: 0xB0
}

export type ReadFlashDataSuccessResponse = ReadFlashDataResponseBase & Success & {
}

export type ReadFlashDataNotSupportedResponse = ReadFlashDataResponseBase & NotSupported & {
}

//  Read Chip Settings
export type ReadFlashDataChipSettingsResponse = ReadFlashDataSuccessResponse & {
  subCommand: 0x00,

  chip: ChipSettings,
  gp: GeneralPurpose,
  usb: UsbSettings
}

//  Read GP Settings
export type ReadFlashDataGPSettingsResponse = ReadFlashDataSuccessResponse & {
  subCommand: 0x01,

  gpio0: Gpio,
  gpio1: Gpio,
  gpio2: Gpio,
  gpio3: Gpio
}

//  Read USB Manufacturer Descriptor String
export type ReadFlashDataUSBManufacturerResponse = ReadFlashDataSuccessResponse & {
  subCommand: 0x02,

  descriptor: string
}

//  Read USB Product Descriptor String
export type ReadFlashDataUSBProductResponse = ReadFlashDataSuccessResponse & {
  subCommand: 0x03,

  descriptor: string
}

//  Read USB Serial Number Descriptor String
export type ReadFlashDataUSBSerialNumberResponse = ReadFlashDataSuccessResponse & {
  subCommand: 0x04,

  descriptor: string
}

//  Read Chip Factory Serial Number
export type ReadFlashDataFactorySerialNumberResponse = ReadFlashDataSuccessResponse & {
  subCommand: 0x05,

  descriptor: string
}

export type ReadFlashDataResponse = ReadFlashDataNotSupportedResponse |
  ReadFlashDataChipSettingsResponse |
  ReadFlashDataGPSettingsResponse |
  ReadFlashDataUSBManufacturerResponse |
  ReadFlashDataUSBProductResponse |
  ReadFlashDataUSBSerialNumberResponse |
  ReadFlashDataFactorySerialNumberResponse


//
export type WriteFlashDataResponseBase = Response & (Success | NotSupported | NotAllowed) & {
  command: 0xB1
}

export type WriteFlashDataSuccessResponse = WriteFlashDataResponseBase & Success & {
}

export type WriteFlashDataNotSupportedResponse = WriteFlashDataResponseBase & NotSupported & {
}

export type WriteFlashDataNotAllowedResponse = WriteFlashDataResponseBase & NotAllowed & {
}

export type WriteFlashDataResponse = WriteFlashDataSuccessResponse | WriteFlashDataNotSupportedResponse | WriteFlashDataNotAllowedResponse

// Send Flash Access Password
export type SendFlashAccessPasswordResponse = Response & (Success | NotAllowed) & {
  command: 0xB2
}