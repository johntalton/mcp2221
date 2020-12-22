
export type ChipSettings = {
  enabledCDCSerialEnumeration: boolean,

  uartLED: { tx: boolean, rx: boolean },
  i2cLED: boolean,
  SSPND: boolean,
  USBCFG: boolean,

  security: 'permanently-locked' | 'password-protected' | 'unsecured',

}

export type InterruptEdge = 'positive' | 'negative' | 'both'
export type Voltage = '4.096V' | '2.048V' | '1.024' | 'Off'
export type VoltageOption = 'Vdd' | 'Vrm'

export type GeneralPurpose = {
  clockDivider: number,
  dac: {
    referenceVoltage: Voltage,
    referenceOptions: VoltageOption,

    initialValue: number
  },
  adc: {
    referenceVoltage: Voltage,
    referenceOptions: VoltageOption,
  },
  interrupt: {
    edge: InterruptEdge
  },
}

export type UsbSettings = {
  vendorId: number,
  productId: number,
  powerAttribute: number
  mARequested: number
}


export type Gp0Designation = 'LED UART RX' | 'SSPND' | 'Gpio'
export type Gp1Designation = 'Clock Output' | 'Interrupt Detection' | 'LED UART TX' | 'ADC1' | 'Gpio'
export type Gp2Designation = 'DAC1' | 'ADC2' | 'USB' | 'Gpio'
export type Gp3Designation = 'DAC2' | 'ADC3' | 'LED I2C' | 'Gpio'

export type LOGIC_0 = 0
export type LOGIC_1 = 1
export type LOGIC = LOGIC_0 | LOGIC_1

export type GpDesignation = Gp0Designation | Gp1Designation | Gp2Designation | Gp3Designation
export type GpioDirection = 'in' | 'out'
export type GpioOutputValue = LOGIC

export type Gpio = {
  outputValue: GpioOutputValue,
  direction: GpioDirection,
  designation: GpDesignation
}

export type GpioAlter = {
  direction?: GpioDirection,
  output?: GpioOutputValue
}