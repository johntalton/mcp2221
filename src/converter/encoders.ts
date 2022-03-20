import { BitSmush } from '@johntalton/bitsmush'

import {
	dont_care,
	DutyCycle00, DutyCycle25, DutyCycle50, DutyCycle75,
	Divider00375, Divider00750, Divider01500, Divider03000,
	Divider06000, Divider12000, Divider24000,
	GpioDirectionIn, GpioDirectionOut,
	Gp0DesignationUART_RX, Gp0DesignationGPIO, Gp0DesignationSSPND,
	Gp1DesignationADC_1, Gp1DesignationClockOutput, Gp1DesignationGPIO, Gp1DesignationInterruptDetection, Gp1DesignationUART_TX,
	Gp2DesignationADC_2, Gp2DesignationDAC_1, Gp2DesignationGPIO, Gp2DesignationUSB,
	Gp3DesignationADC_3, Gp3DesignationDAC_2, Gp3DesignationGPIO, Gp3DesignationLedI2C
} from '../messages/message.consts.js'
import {
	GeneralPurposeAlterDAC, GeneralPurposeAlterADC,
	GPClock, GeneralPurposeAlterInterrupt, Gpio,
	Gp0Designation, Gp1Designation, Gp2Designation, Gp3Designation
} from '../messages/message.fragments.js'

export function encodeGPClockAlter(clock?: GPClock): number {
	if(clock === undefined) { return dont_care() & 0x7f }
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

	if(dutyCycleBits === undefined) { throw new Error('undefined dutyCycle') }
	if(dividerBits === undefined) { throw new Error('undefined divider') }

	return 0x80 | (dutyCycleBits << 3) | dividerBits
}

export function encodeDACReferenceAlter(dac?: GeneralPurposeAlterDAC): number {
	if (dac === undefined) { return dont_care() & 0x7f }

	const { referenceVoltage, referenceOptions, initialValue } = dac

	const enableUpdateBits = 0b1 // 0x80
	const voltageBits = 0
	const optionsBits = 0

	return BitSmush.smushBits(
		[[7, 1], [2, 2], [0, 1]],
		[enableUpdateBits, voltageBits, optionsBits])
}

export function encodeDACValueAlter(initialValue?: number): number {
	if(initialValue === undefined) { return dont_care() &  0x7f }

	return 0x80 | (initialValue & 0b1111)
}

export function encodeADCReferenceAlter(adc?: GeneralPurposeAlterADC): number {
	if(adc === undefined) { return dont_care() & 0x7f }

	const { referenceVoltage, referenceOptions } = adc

	return 0
}

export function encodeInterruptAlter(interrupt?: GeneralPurposeAlterInterrupt): number {
	if(interrupt === undefined) { return dont_care() & 0x7f }

	return 0
}

export function encodeGpio0Designation(designation: Gp0Designation) {
	if(designation === Gp0DesignationUART_RX) { return 0b10 }
	if(designation === Gp0DesignationSSPND) { return 0b01 }
	if(designation === Gp0DesignationGPIO) { return 0b00 }

	throw new Error('unknown gpio0 designation')
}

export function encodeGpio1Designation(designation: Gp1Designation) {
	if (designation === Gp1DesignationInterruptDetection) { return 0b100 }
	if (designation === Gp1DesignationUART_TX) { return 0b011 }
	if (designation === Gp1DesignationADC_1) { return 0b010 }
	if (designation === Gp1DesignationClockOutput) { return 0b001 }
	if(designation === Gp1DesignationGPIO) { return 0b00 }

	throw new Error('unknown gpio1 designation')
}

export function encodeGpio2Designation(designation: Gp2Designation) {
	if (designation === Gp2DesignationDAC_1) { return 0b11 }
	if (designation === Gp2DesignationADC_2) { return 0b10 }
	if (designation === Gp2DesignationUSB) { return 0b01 }
	if(designation === Gp2DesignationGPIO) { return 0b00 }

	throw new Error('unknown gpio2 designation')
}

export function encodeGpio3Designation(designation: Gp3Designation) {
	if(designation === Gp3DesignationDAC_2) { return 0b11 }
	if(designation === Gp3DesignationADC_3) { return 0b10 }
	if(designation === Gp3DesignationLedI2C) { return 0b01 }
	if(designation === Gp3DesignationGPIO) { return 0b00 }

	throw new Error('unknown gpio3 designation')
}

export function encodeGpioAlter<D>(gpio?: Gpio<D>, encodeDesignation?: (designation: D) => number): number {
	if(gpio === undefined) { return dont_care() }

	if(encodeDesignation === undefined) { throw new Error('unknown designation encoder') }

	const { designation, direction, outputValue } = gpio

	const designationBits = encodeDesignation(designation)

	const directionBits = direction === GpioDirectionIn ? 0b1 :
		direction === GpioDirectionOut ? 0b0 :
			undefined

	if(directionBits === undefined) { throw new Error('undefined direction') }

	return (outputValue << 4) | (directionBits << 3) | designationBits
}
