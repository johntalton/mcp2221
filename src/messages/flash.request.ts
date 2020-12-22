import { Request } from './message'
import { ChipSettings, GeneralPurpose, Gpio, UsbSettings } from './message.fragments'

// Read Flash Data
export type ReadFlashDataRequest = Request & {
  command?: 0xB0,
  subCommand: number
}

//  Read Chip Settings
export type ReadFlashDataChipSettingsRequest = ReadFlashDataRequest & {
  subCommand: 0x00
}

//  Read GP Settings
export type ReadFlashDataGPSettingsRequest = ReadFlashDataRequest & {
  subCommand: 0x01
}

//  Read USB Manufacturer Descriptor String
export type ReadFlashDataUSBManufacturerRequest = ReadFlashDataRequest & {
  subCommand: 0x02
}

//  Read USB Product Descriptor String
export type ReadFlashDataUSBProductRequest = ReadFlashDataRequest & {
  subCommand: 0x03
}

//  Read USB Serial Number Descriptor String
export type ReadFlashDataUSBSerialNumberRequest = ReadFlashDataRequest & {
  subCommand: 0x04
}

//  Read Chip Factory Serial Number
export type ReadFlashDataFactorySerialNumberRequest = ReadFlashDataRequest & {
  subCommand: 0x05
}






// Write Flash Data
export type WriteFlashDataRequest = Request & {
  command?: 0xB1,
  subCommand: number
}

// 00 Write Chip Settings
export type WriteFlashDataChipSettingsRequest = WriteFlashDataRequest & {
  subCommand: 0x00,

  chip: ChipSettings,
  gp: GeneralPurpose,
  usb: UsbSettings,

  password: string
}

// Write GP Settings
export type WriteFlashDataGPSettingsRequest = WriteFlashDataRequest & {
  subCommand: 0x01,

  gpio0: Gpio,
  gpio1: Gpio,
  gpio2: Gpio,
  gpio3: Gpio
}

// Write USB Manufacturer Descriptor String
export type WriteFlashDataUSBManufacturerRequest = WriteFlashDataRequest & {
  subCommand: 0x02,

  descriptor: string
}

// Write USB Product Descriptor String
export type WriteFlashDataUSBProductRequest = WriteFlashDataRequest & {
  subCommand: 0x03,

  descriptor: string
}

// Write USB Serial Number Descriptor String
export type WriteFlashDataUSBSerialNumberRequest = WriteFlashDataRequest & {
  subCommand: 0x04,

  descriptor: string
}



// Send Flash Access Password
export type SendFlashAccessPasswordRequest = Request & {
  command?: 0xB2
  password: string
}
