import { Request } from './message'
import { ChipSettings, GeneralPurpose, Gpio0, Gpio1, Gpio2, Gpio3, Manufacturer, Password, Product, SerialNumber, UsbSettings } from './message.fragments'

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

// Write Chip Settings
export type WriteFlashDataChipSettingsRequest = WriteFlashDataRequest & {
  subCommand: 0x00,

  chip: ChipSettings,
  gp: GeneralPurpose,
  usb: UsbSettings,

  password: Password
}

// Write GP Settings
export type WriteFlashDataGPSettingsRequest = WriteFlashDataRequest & {
  subCommand: 0x01,

  gpio0: Gpio0,
  gpio1: Gpio1,
  gpio2: Gpio2,
  gpio3: Gpio3
}

// Write USB Manufacturer Descriptor String
export type WriteFlashDataUSBManufacturerRequest = WriteFlashDataRequest & {
  subCommand: 0x02,

  descriptor: Manufacturer
}

// Write USB Product Descriptor String
export type WriteFlashDataUSBProductRequest = WriteFlashDataRequest & {
  subCommand: 0x03,

  descriptor: Product
}

// Write USB Serial Number Descriptor String
export type WriteFlashDataUSBSerialNumberRequest = WriteFlashDataRequest & {
  subCommand: 0x04,

  descriptor: SerialNumber
}



// Send Flash Access Password
export type SendFlashAccessPasswordRequest = Request & {
  command?: 0xB2,

  password: Password
}
