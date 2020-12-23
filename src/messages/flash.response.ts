import { Response, Success, NotSupported, NotAllowed } from './message'
import { ChipSettings, GeneralPurpose, UsbSettings, Gpio0, Gpio1, Gpio2, Gpio3, Manufacturer, Product, SerialNumber } from './message.fragments'

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

  gpio0: Gpio0,
  gpio1: Gpio1,
  gpio2: Gpio2,
  gpio3: Gpio3
}

//  Read USB Manufacturer Descriptor String
export type ReadFlashDataUSBManufacturerResponse = ReadFlashDataSuccessResponse & {
  subCommand: 0x02,

  descriptor: Manufacturer
}

//  Read USB Product Descriptor String
export type ReadFlashDataUSBProductResponse = ReadFlashDataSuccessResponse & {
  subCommand: 0x03,

  descriptor: Product
}

//  Read USB Serial Number Descriptor String
export type ReadFlashDataUSBSerialNumberResponse = ReadFlashDataSuccessResponse & {
  subCommand: 0x04,

  descriptor: SerialNumber
}

//  Read Chip Factory Serial Number
export type ReadFlashDataFactorySerialNumberResponse = ReadFlashDataSuccessResponse & {
  subCommand: 0x05,

  descriptor: SerialNumber
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