import { Response, Success } from './message'

export type SetSRAMSettingsResponse = Response & Success & {
  command: 0x60
}

export type GetSRAMSettingsResponse = Response & Success & {
  command: 0x61,

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

    security: 'permanently-locked' | 'password-protected' | 'unsecured',
    password: string
  },


  gp: {
    clockDivider: number,
    dac: {},
    adc: {},
    interrupt: {},

    gpio0: {},
    gpio1: {},
    gpio2: {},
    gpio3: {}
  }
}