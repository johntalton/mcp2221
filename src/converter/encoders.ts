import {
	dont_care,
	DutyCycle00, DutyCycle25, DutyCycle50, DutyCycle75,
	Divider00375, Divider00750, Divider01500, Divider03000,
	Divider06000, Divider12000, Divider24000,
	GpioDirectionIn, GpioDirectionOut,
	Gp0DesignationUART_RX, Gp0DesignationGPIO, Gp0DesignationSSPND,
	Gp1DesignationADC_1, Gp1DesignationClockOutput, Gp1DesignationGPIO, Gp1DesignationInterruptDetection, Gp1DesignationUART_TX,
	Gp2DesignationADC_2, Gp2DesignationDAC_1, Gp2DesignationGPIO, Gp2DesignationUSB,
	Gp3DesignationADC_3, Gp3DesignationDAC_2, Gp3DesignationGPIO, Gp3DesignationLedI2C,
	VoltageOff, Voltage1V, Voltage2V, Voltage4V,
	VoltageOptionVdd, VoltageOptionVrm, USB_STRING_MAGIC_THREE, MAX_REPORT_SIZE, ALTER_GPIO_CLOCK_FLAG, any_other, ALTER_DAC_REF_FLAG, ALTER_DAC_VALUE_FLAG, ALTER_ADC_REF_FLAG, ALTER_INTERRUPT_FLAG
} from '../messages/message.consts.js'
import {
	GeneralPurposeAlterDAC, GeneralPurposeAlterADC,
	GPClock, GeneralPurposeAlterInterrupt, Gpio,
	Gp0Designation, Gp1Designation, Gp2Designation, Gp3Designation, Voltage, VoltageOption
} from '../messages/message.fragments.js'
import { Invalid, Unknown } from './throw.js'


export function newReportBuffer() {
	const buffer = Uint8Array.from({ length: MAX_REPORT_SIZE }, () => Math.trunc(Math.random() * 255))
	return buffer.buffer
}

export function encodeUSBString(str: string): ArrayBuffer {
	const dest16 = new Uint16Array(str.length)

	for(var i = 0; i < str.length; i++){
		dest16[i] = str.charCodeAt(i)
	}

	return dest16.buffer
}

export function encodeI2CDivider(freq: number) {
  if(freq < 50 || freq > 400) { throw new Invalid('freq', freq) }
  return  Math.floor((12000000 / (freq * 1000)) - 3)
}

export function encodeGPClockAlter(clock?: GPClock): number {
	if(clock === undefined) { return any_other(ALTER_GPIO_CLOCK_FLAG) }
	const { dutyCycle, divider } = clock

	const dutyCycleBits = (dutyCycle === DutyCycle00) ? 0b00 :
		(dutyCycle === DutyCycle25) ? 0b01 :
		(dutyCycle === DutyCycle50) ? 0b10 :
		(dutyCycle === DutyCycle75) ? 0b11 :
			undefined

	const dividerBits = divider === Divider00375 ? 0b111 :
		divider === Divider00750 ? 0b110 :
		divider === Divider01500 ? 0b101 :
		divider === Divider03000 ? 0b100 :
		divider === Divider06000 ? 0b011 :
		divider === Divider12000 ? 0b010 :
		divider === Divider24000 ? 0b001 :
			undefined

	if(dutyCycleBits === undefined) { throw new Unknown('dutyCycle', dutyCycleBits) }
	if(dividerBits === undefined) { throw new Unknown('divider', dividerBits) }

	return ALTER_GPIO_CLOCK_FLAG | (dutyCycleBits << 3) | dividerBits
}

export function encodeVoltateBits(referenceVoltage: Voltage): number | undefined {
	return referenceVoltage === VoltageOff ? 0b00 :
		referenceVoltage === Voltage1V ? 0b01 :
		referenceVoltage === Voltage2V ? 0b10 :
		referenceVoltage === Voltage4V ? 0b11 :
			undefined
}

export function encodeVoltageOptionsBits(referenceOptions: VoltageOption): number {
	return referenceOptions === VoltageOptionVrm ? 0b1 : 0b0
}

export function encodeDACReferenceAlter(dac?: GeneralPurposeAlterDAC): number {
	if (dac === undefined) { return any_other(ALTER_DAC_REF_FLAG) }

	const { referenceVoltage, referenceOptions } = dac

	// check for defined dac but undefined refs (this is initialValue set only)
	if (referenceVoltage === undefined) { return any_other(ALTER_DAC_REF_FLAG) }
	if (referenceOptions === undefined) { return any_other(ALTER_DAC_REF_FLAG) }

	const referenceVoltageBits = encodeVoltateBits(referenceVoltage)
	const referenceOptionsBit = encodeVoltageOptionsBits(referenceOptions)

	if(referenceVoltageBits === undefined) { throw new Unknown('dac reference voltage', referenceVoltageBits) }

	return ALTER_DAC_REF_FLAG | (referenceVoltageBits << 1) | referenceOptionsBit
}

export function encodeDACValueAlter(initialValue?: number): number {
	if(initialValue === undefined) { return any_other(ALTER_DAC_VALUE_FLAG) }
	return ALTER_DAC_VALUE_FLAG | (initialValue & 0b11111)
}

export function encodeADCReferenceAlter(adc?: GeneralPurposeAlterADC): number {
	if(adc === undefined) { return any_other(ALTER_ADC_REF_FLAG) }

	const { referenceVoltage, referenceOptions } = adc

	const referenceVoltageBits  = encodeVoltateBits(referenceVoltage)
	const referenceOptionsBit = encodeVoltageOptionsBits(referenceOptions)

	if(referenceVoltageBits === undefined) { throw new Unknown('adc reference voltage', referenceVoltageBits) }

	return ALTER_ADC_REF_FLAG | (referenceVoltageBits << 1) | referenceOptionsBit
}

export function encodeInterruptAlter(interrupt?: GeneralPurposeAlterInterrupt): number {
	if(interrupt === undefined) { return any_other(ALTER_INTERRUPT_FLAG) }

	const { edge, clear  } = interrupt

	const hasEdge = edge !== undefined
	const hasClear = clear !== undefined

	if(!hasClear || !hasEdge) { return any_other(ALTER_INTERRUPT_FLAG) }

	const positiveEdgeBit = (edge === 'both' || edge === 'positive') ? 0b1 : 0b0
	const negativeEdgeBit = (edge === 'both' || edge === 'negative') ? 0b1 : 0b0
	const edgeBitsPrelim = 0b1010 | (positiveEdgeBit << 2) | negativeEdgeBit
	const edgeBits = hasEdge ? edgeBitsPrelim : 0b0000

	const clearBit = clear === true ? 0b1 : 0b0

	return ALTER_INTERRUPT_FLAG | edgeBits | clearBit
}

export function encodeGpio0Designation(designation: Gp0Designation) {
	if(designation === Gp0DesignationUART_RX) { return 0b10 }
	if(designation === Gp0DesignationSSPND) { return 0b01 }
	if(designation === Gp0DesignationGPIO) { return 0b00 }

	throw new Unknown('gpio0 designation', designation)
}

export function encodeGpio1Designation(designation: Gp1Designation) {
	if (designation === Gp1DesignationInterruptDetection) { return 0b100 }
	if (designation === Gp1DesignationUART_TX) { return 0b011 }
	if (designation === Gp1DesignationADC_1) { return 0b010 }
	if (designation === Gp1DesignationClockOutput) { return 0b001 }
	if(designation === Gp1DesignationGPIO) { return 0b00 }

	throw new Unknown('gpio1 designation', designation)
}

export function encodeGpio2Designation(designation: Gp2Designation) {
	if (designation === Gp2DesignationDAC_1) { return 0b11 }
	if (designation === Gp2DesignationADC_2) { return 0b10 }
	if (designation === Gp2DesignationUSB) { return 0b01 }
	if(designation === Gp2DesignationGPIO) { return 0b00 }

	throw new Unknown('gpio2 designation', designation)
}

export function encodeGpio3Designation(designation: Gp3Designation) {
	if(designation === Gp3DesignationDAC_2) { return 0b11 }
	if(designation === Gp3DesignationADC_3) { return 0b10 }
	if(designation === Gp3DesignationLedI2C) { return 0b01 }
	if(designation === Gp3DesignationGPIO) { return 0b00 }

	throw new Unknown('gpio3 designation', designation)
}

export function encodeGpioAlter<D>(gpio?: Gpio<D>, encodeDesignation?: (designation: D) => number): number {
	if(gpio === undefined) { return dont_care() }

	if(encodeDesignation === undefined) { throw new Unknown('designation encoder fu', encodeDesignation) }

	const { designation, direction, outputValue } = gpio

	const designationBits = encodeDesignation(designation)

	const directionBits = direction === GpioDirectionIn ? 0b1 :
		direction === GpioDirectionOut ? 0b0 :
			undefined

	if(directionBits === undefined) { throw new Unknown('direction', directionBits) }

	return (outputValue << 4) | (directionBits << 3) | designationBits
}

export const MAX_16BIT_USB_STRING_LENGTH = 30

export function encodeFlashDataUSBStringRequest(commandNumber: number, subCommandNubmer: number, descriptor: string) {
	const strBuffer = encodeUSBString(descriptor)
	const str16 = new Uint16Array(strBuffer)

	if(str16.length > MAX_16BIT_USB_STRING_LENGTH) { throw new Error('descriptor too long') }

	const report = newReportBuffer()

	const dv = new DataView(report)
	dv.setUint8(0, commandNumber)
	dv.setUint8(1, subCommandNubmer)
	dv.setUint8(2, strBuffer.byteLength + 2)
	dv.setUint8(3, USB_STRING_MAGIC_THREE)

	const report16 = new Uint16Array(report, 4)
	report16.set(str16)

	return report
}