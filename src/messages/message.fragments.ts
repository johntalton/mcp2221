type stringOf<L extends number> = {
	length: L
} & { __gard__: never }

export type Password = string // & stringOf<8>

export type I2CReadPending = 0 | 1 | 2

export type Manufacturer = string
export type Product = string
export type SerialNumber = string

export type MajorMinor = { major: string, minor: string }
export type Revision = {
	hardware: MajorMinor,
	firmware: MajorMinor
}

export type I2CClock = number

export type DutyCycle = '0%' | '25%' | '50%' | '75%'
export type Divider = '375 kHz' | '750 kHz' | '1.5 MHz' | '3 MHz' | '6 MHz' | '12 MHz' | '24 MHz'

export type GPClock = {
	dutyCycle: DutyCycle,
	divider: Divider
}

export type InterruptEdge = 'positive' | 'negative' | 'both' | 'off'
export type Voltage = '4.096V' | '2.048V' | '1.024V' | 'Off'
export type VoltageOption = 'Vdd' | 'Vrm'
export type Security = 'permanently-locked' | 'password-protected' | 'unsecured'

export type InitialLEDState = 'on' | 'off'
export type SuspendState = 'on' | 'off'
export type USBCFGState = 'on' | 'off'


export type ChipSettings = {
	enabledCDCSerialEnumeration: boolean,
	security: Security,
}

export type RuntimeChipSettings = ChipSettings & {
	uartLED: { tx: InitialLEDState, rx: InitialLEDState },
	i2cLED: InitialLEDState,
	SSPND: SuspendState,
	USBCFG: USBCFGState
}

export type GeneralPurpose = {
	clock: GPClock,
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

export type GeneralPurposeAlterDAC = {
	referenceVoltage?: Voltage,
	referenceOptions?: VoltageOption,

	initialValue?: number
}

export type GeneralPurposeAlterADC = {
	referenceVoltage: Voltage,
	referenceOptions: VoltageOption
}

export type GeneralPurposeAlterInterrupt = {
	edge?: InterruptEdge,
	clear?: boolean
}

export type GeneralPurposeAlter = {
	dac?: GeneralPurposeAlterDAC,
	adc?: GeneralPurposeAlterADC,
	interrupt?: GeneralPurposeAlterInterrupt
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
