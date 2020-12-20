import { Response, Success, NotSupported, NotAllowed } from './message'

export type ReadFlashDataResponse = Response & (Success | NotSupported) & {
  command: 0xB0
}

export type ReadFlashDataSuccessResponse = ReadFlashDataResponse & Success & {
  length: number,
  data: ArrayBuffer
}

export type ReadFlashDataNotSupportedResponse = ReadFlashDataResponse & NotSupported & {
}


//  Read Chip Settings
export type ReadFlashDataChipSettingsResponse = ReadFlashDataSuccessResponse & {
  subCommand: 0x00,

  usb: {
    vendorId: number,
    productId: number,
    options: {}
    mA: {}
  }

  chip: {
    enabledCDCSerialEnumeration: boolean,

    initialUartLED: { tx: boolean, rx: boolean },
    initialI2cLED: boolean,
    initialSSPND: boolean,
    initialUSBCFG: boolean,

    security: 'permanently-locked' | 'password-protected' | 'unsecured'
  }

  gp: {
    clockDivider: number,
    dac: {},
    adc: {}
  }

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
  command: 0xB1
}

export type WriteFlashDataSuccessResponse = WriteFlashDataResponse & Success & {
}

export type WriteFlashDataNotSupportedResponse = WriteFlashDataResponse & NotSupported & {
}

export type WriteFlashDataNotAllowedResponse = WriteFlashDataResponse & NotAllowed & {
}

// Send Flash Access Password
export type SendFlashAccessPasswordResponse = Response & (Success | NotAllowed) & {
  command: 0xB2
}