import {
	dont_care,
	DutyCycle00, DutyCycle25, DutyCycle50, DutyCycle75,
	Divider00375, Divider00750, Divider01500, Divider03000,
	Divider06000, Divider12000, Divider24000,
	GpioDirectionIn, GpioDirectionOut,
	Gp0DesignationUART_RX, Gp0DesignationGPIO, Gp0DesignationSSPND,
	Gp1DesignationADC_1, Gp1DesignationClockOutput,
	Gp1DesignationGPIO, Gp1DesignationInterruptDetection, Gp1DesignationUART_TX,
	Gp2DesignationADC_2, Gp2DesignationDAC_1, Gp2DesignationGPIO, Gp2DesignationUSB,
	Gp3DesignationADC_3, Gp3DesignationDAC_2, Gp3DesignationGPIO, Gp3DesignationLedI2C,
	VoltageOff, Voltage1V, Voltage2V, Voltage4V,
	VoltageOptionVdd, VoltageOptionVrm,
	USB_STRING_MAGIC_THREE, MAX_REPORT_SIZE,
	ALTER_GPIO_CLOCK_FLAG, any_other, ALTER_DAC_REF_FLAG,
	ALTER_DAC_VALUE_FLAG, ALTER_ADC_REF_FLAG, ALTER_INTERRUPT_FLAG,
	InterruptEdgeBoth, InterruptEdgeNegative, InterruptEdgePositive, SecurityUnsecured, SecurityPasswordProtected, SecurityPermanentlyLocked,
	ACCESS_PASSWORD_BYTE_LENGTH,
	NO_ALTER_GPIO_FLAG
} from '../messages/message.constants.js'
import {
	GeneralPurposeAlterDAC, GeneralPurposeAlterADC,
	GPClock, GeneralPurposeAlterInterrupt, Gpio,
	Gp0Designation, Gp1Designation, Gp2Designation, Gp3Designation, Voltage, VoltageOption, ChipSettings, Security, GeneralPurpose, Divider, InterruptEdge, DutyCycle,
	Password,
	GpioAlter
} from '../messages/message.fragments.js'
import { EncoderBufferTarget } from './converter.js'
import { Invalid, Unknown } from './throw.js'


// const fillFn = () => Math.trunc(Math.random() * 255)
// const fillFn = () => 0xFF
// const fillFn = () => 0x00
const fillFn = dont_care

export function newReportBuffer(): ArrayBuffer {
	const buffer = Uint8Array.from({ length: MAX_REPORT_SIZE }, fillFn)
	return buffer.buffer
}

export function encodeUSBString(str: string): ArrayBuffer {
	const dest16 = new Uint16Array(str.length)

	for(var i = 0; i < str.length; i++){
		dest16[i] = str.charCodeAt(i)
	}

	return dest16.buffer
}

export function encodeI2CDivider(freq: number): number {
  if(freq < 50 || freq > 400) { throw new Invalid('freq', freq) }
  return  Math.floor((12_000_000 / (freq * 1000))) - 2
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

	if(dutyCycleBits === undefined) { throw new Unknown('dutyCycle', dutyCycle) }
	if(dividerBits === undefined) { throw new Unknown('divider', divider) }

	return ALTER_GPIO_CLOCK_FLAG | (dutyCycleBits << 3) | dividerBits
}

export function encodeVoltageBits(referenceVoltage: Voltage): number | undefined {
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

	const referenceVoltageBits = encodeVoltageBits(referenceVoltage)
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

	const referenceVoltageBits  = encodeVoltageBits(referenceVoltage)
	const referenceOptionsBit = encodeVoltageOptionsBits(referenceOptions)

	if(referenceVoltageBits === undefined) { throw new Unknown('adc reference voltage', referenceVoltageBits) }

	return ALTER_ADC_REF_FLAG | (referenceVoltageBits << 1) | referenceOptionsBit
}

export function encodeInterruptAlter(interrupt?: GeneralPurposeAlterInterrupt): number {
	if(interrupt === undefined) { return any_other(ALTER_INTERRUPT_FLAG) }

	const { edge, clear  } = interrupt

	const hasEdge = edge !== undefined
	const hasClear = clear !== undefined

	if(!hasClear && !hasEdge) { return any_other(ALTER_INTERRUPT_FLAG) }

	const positiveEdgeBit = (edge === InterruptEdgeBoth || edge === InterruptEdgePositive) ? 0b1 : 0b0
	const negativeEdgeBit = (edge === InterruptEdgeBoth || edge === InterruptEdgeNegative) ? 0b1 : 0b0
	const edgeBitsPrelim = 0b1010 | (positiveEdgeBit << 2) | negativeEdgeBit
	const edgeBits = hasEdge ? edgeBitsPrelim : 0b0000

	const clearBit = clear === true ? 0b1 : 0b0

	return ALTER_INTERRUPT_FLAG | (edgeBits << 1) | clearBit
}

export function encodeGpio0Designation(designation: Gp0Designation): number {
	if(designation === Gp0DesignationUART_RX) { return 0b10 }
	if(designation === Gp0DesignationSSPND) { return 0b01 }
	if(designation === Gp0DesignationGPIO) { return 0b00 }

	throw new Unknown('gpio0 designation', designation)
}

export function encodeGpio1Designation(designation: Gp1Designation): number {
	if (designation === Gp1DesignationInterruptDetection) { return 0b100 }
	if (designation === Gp1DesignationUART_TX) { return 0b011 }
	if (designation === Gp1DesignationADC_1) { return 0b010 }
	if (designation === Gp1DesignationClockOutput) { return 0b001 }
	if(designation === Gp1DesignationGPIO) { return 0b00 }

	throw new Unknown('gpio1 designation', designation)
}

export function encodeGpio2Designation(designation: Gp2Designation): number {
	if (designation === Gp2DesignationDAC_1) { return 0b11 }
	if (designation === Gp2DesignationADC_2) { return 0b10 }
	if (designation === Gp2DesignationUSB) { return 0b01 }
	if(designation === Gp2DesignationGPIO) { return 0b00 }

	throw new Unknown('gpio2 designation', designation)
}

export function encodeGpio3Designation(designation: Gp3Designation): number {
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

export function encodeGpioVariableAlter(gpio?: GpioAlter, targetBuffer: EncoderBufferTarget = new ArrayBuffer(4)) {
	const u8 = ArrayBuffer.isView(targetBuffer) ?
		new Uint8Array(targetBuffer.buffer, targetBuffer.byteOffset, targetBuffer.byteLength) :
		new Uint8Array(targetBuffer)

	const valid = gpio !==  undefined

	const value = gpio?.outputValue ?? 0
	const gpioDirection = gpio?.direction ?? GpioDirectionOut
	const direction = gpioDirection === GpioDirectionIn ? 0x01 : 0x00

	const alterValue = valid && (gpio?.outputValue !== undefined)
	const alterDirection = valid && (gpio?.direction !== undefined)

	u8[0] = alterValue ? any_other(NO_ALTER_GPIO_FLAG) : NO_ALTER_GPIO_FLAG
	u8[1] = value

	u8[2] = alterDirection ? any_other(NO_ALTER_GPIO_FLAG) : NO_ALTER_GPIO_FLAG
	u8[3] = direction

	return u8
}

export const MAX_16BIT_USB_STRING_LENGTH = 30

export function encodeFlashDataUSBStringRequest(commandNumber: number, subCommandNubmer: number, descriptor: string): ArrayBuffer {
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

export function encodeSecurity(security: Security): number {
	if(security === SecurityUnsecured) { return 0x00 }
	if(security === SecurityPasswordProtected) { return 0x01 }
	if(security === SecurityPermanentlyLocked) { return 0x11 }

	throw new Unknown('security', security)
}

export function encodeChipSettings(chip: ChipSettings): number {
	const { enabledCDCSerialEnumeration, security } = chip

	const securityBits = encodeSecurity(security)
	const enabledCDCBits = enabledCDCSerialEnumeration ? 1 : 0

	return (enabledCDCBits << 7) | securityBits
}

export function encodeDivider(divider: Divider): number {
	if(divider === Divider00375) { return 0b111 }
	if(divider === Divider00750) { return 0b110 }
	if(divider === Divider01500) { return 0b101 }
	if(divider === Divider03000) { return 0b100 }
	if(divider === Divider06000) { return 0b011 }
	if(divider === Divider12000) { return 0b010 }
	if(divider === Divider24000) { return 0b001 }

	throw new Unknown('divider', divider)
}

export function encodeDutyCycle(dutyCycle: DutyCycle): number {
	if(dutyCycle === DutyCycle00) { return 0b00 }
	if(dutyCycle === DutyCycle25) { return 0b01 }
	if(dutyCycle === DutyCycle50) { return 0b10 }
	if(dutyCycle === DutyCycle75) { return 0b11 }

	throw new Unknown('dutyCycle', dutyCycle)
}

export function encodeGPClock(clock: GPClock): number {
	const { dutyCycle, divider } = clock

	const dutyCycleBits = encodeDutyCycle(dutyCycle)
	const dividerBits = encodeDivider(divider)

	return (dutyCycleBits << 3) | dividerBits

}

export function _encodeInterruptEdge(edge: InterruptEdge) {
	const positiveEdgeBit = (edge === InterruptEdgeBoth || edge === InterruptEdgePositive) ? 0b1 : 0b0
	const negativeEdgeBit = (edge === InterruptEdgeBoth || edge === InterruptEdgeNegative) ? 0b1 : 0b0

	return {
		negativeBit: negativeEdgeBit,
		positiveBit: positiveEdgeBit
	}
}

export function encodeAccessPassword(password: Password, into: EncoderBufferTarget = new Uint8Array(ACCESS_PASSWORD_BYTE_LENGTH)): ArrayBuffer {
	const password8 = ArrayBuffer.isView(into) ?
		new Uint8Array(into.buffer, into.byteOffset, ACCESS_PASSWORD_BYTE_LENGTH) :
		new Uint8Array(into, 0, ACCESS_PASSWORD_BYTE_LENGTH)

	const encoder = new TextEncoder()
	const { read, written } = encoder.encodeInto(password, password8)
	if(read < password.length) { throw new Invalid('password', 'too long') }
	if(written < ACCESS_PASSWORD_BYTE_LENGTH) { console.warn('padding password right zero') }

	return password8
}

