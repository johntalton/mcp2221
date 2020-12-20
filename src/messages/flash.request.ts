import { Request } from './message'

// Read Flash Data
export type ReadFlashDataRequest = Request & {
  command: 0xB0,
  subCommand: number,

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
  command: 0xB1,
  subCommand: number

  length: number,
  buffer: ArrayBuffer
}

// 00 Write Chip Settings
export type WriteFlashDataChipSettingsRequest = WriteFlashDataRequest & {
  subCommand: 0x00,

  chip: {
    enabledCDCSerialEnumeration: boolean,

    initialUartLED: { tx: boolean, rx: boolean },
    initialI2cLED: boolean,
    initialSSPND: boolean,
    initialUSBCFG: boolean,

    security: 'permanently-locked' | 'password-protected' | 'unsecured',
    password: string
  }

  gp: {
    clockDivider: number,
    dac: {},
    adc: {},
    interrupt: {},
  }
}

// Write GP Settings
export type WriteFlashDataGPettingsRequest = WriteFlashDataRequest & {
  subCommand: 0x01,

  gpio0: {},
  gpio1: {},
  gpio2: {},
  gpio3: {}
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
  command: 0xB2
  password: string
}
