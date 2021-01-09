type stringOf<L extends number> = {
  length: L
} & { __gard__: never }

export type Password = stringOf<8>

export type ReadPending = 0 | 1 | 2

export type Manufacturer = stringOf<30>
export type Product = stringOf<30>
export type SerialNumber = stringOf<30>

export type DutyCycle = '0%' | '25%' | '50%' | '75%'

export type InterruptEdge = 'positive' | 'negative' | 'both'
export type Voltage = '4.096V' | '2.048V' | '1.024' | 'Off'
export type VoltageOption = 'Vdd' | 'Vrm'
export type Security = 'permanently-locked' | 'password-protected' | 'unsecured'

export type ChipSettings = {
  enabledCDCSerialEnumeration: boolean,

  uartLED: { tx: boolean, rx: boolean },
  i2cLED: boolean,
  SSPND: boolean,
  USBCFG: boolean,

  security: Security,
}

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

export type LOGIC_0 = 0
export type LOGIC_1 = 1
export type LOGIC = LOGIC_0 | LOGIC_1

export type GpioDirection = 'in' | 'out'
export type GpioOutputValue = LOGIC

export type Gp0Designation = 'LED UART RX' | 'SSPND' | 'Gpio'
export type Gp1Designation = 'Clock Output' | 'Interrupt Detection' | 'LED UART TX' | 'ADC1' | 'Gpio'
export type Gp2Designation = 'DAC1' | 'ADC2' | 'USB' | 'Gpio'
export type Gp3Designation = 'DAC2' | 'ADC3' | 'LED I2C' | 'Gpio'
// export type GpDesignations = Gp0Designation | Gp1Designation | Gp2Designation | Gp3Designation

export type Gpio<D> = {
  outputValue: GpioOutputValue,
  direction: GpioDirection,
  designation: D
}

export type Gpio0 = Gpio<Gp0Designation>
export type Gpio1 = Gpio<Gp1Designation>
export type Gpio2 = Gpio<Gp2Designation>
export type Gpio3 = Gpio<Gp3Designation>

export type GpioAlter = {
  outputValue?: GpioOutputValue
  direction?: GpioDirection
}
