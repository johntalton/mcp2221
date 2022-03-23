import {
	Voltage, VoltageOption,
	Security,
	InterruptEdge,
	Gpio,
	Gp0Designation, Gp1Designation, Gp2Designation, Gp3Designation,
	GPClock,
	RuntimeChipSettings
} from '../messages/message.fragments.js'

import {
	InitialLEDStateOn, InitialLEDStateOff,
	SuspendStateOn, SuspendStateOff,
	USBCFGStateOn, USBCFGStateOff,

	Logic0, Logic1,

	DutyCycle00, DutyCycle25, DutyCycle50, DutyCycle75,
	Divider00375, Divider00750, Divider01500, Divider03000,
	Divider06000, Divider12000, Divider24000,

	Voltage1V, Voltage2V, Voltage4V, VoltageOff,
	VoltageOptionVrm, VoltageOptionVdd,

	GpioDirectionIn, GpioDirectionOut,

	SecurityPasswordProtected, SecurityPermanentlyLocked, SecurityUnsecured,
	InterruptEdgeOff, InterruptEdgeBoth, InterruptEdgeNegative, InterruptEdgePositive,

	Gp0DesignationGPIO, Gp0DesignationSSPND, Gp0DesignationUART_RX,
	Gp1DesignationADC_1, Gp1DesignationClockOutput, Gp1DesignationGPIO, Gp1DesignationInterruptDetection, Gp1DesignationUART_TX,
	Gp2DesignationADC_2, Gp2DesignationDAC_1, Gp2DesignationGPIO, Gp2DesignationUSB,
	Gp3DesignationADC_3, Gp3DesignationDAC_2, Gp3DesignationGPIO, Gp3DesignationLedI2C
} from '../messages/message.consts.js'

import { StatusSuccess, StatusBusy, StatusError, StatusNotAllowed, StatusNotSupported, Response } from '../messages/message.js'

import { DecoderBufferSource } from './converter.js'

export function decodeUSBString(sourceBuffer: DecoderBufferSource, byteLength: number) {
	const length = byteLength / 2

	const ab16 = ArrayBuffer.isView(sourceBuffer) ?
		new Uint16Array(sourceBuffer.buffer, sourceBuffer.byteOffset, length) :
		new Uint16Array(sourceBuffer, length)

	return String.fromCharCode(...ab16)
}

export function decodeGPClockValues(dutyCycleValue: number, dividerValue: number): GPClock {
	const dutyCycle =( dutyCycleValue === 0b00) ? DutyCycle00 :
		(dutyCycleValue === 0b01) ? DutyCycle25 :
			(dutyCycleValue === 0b10) ? DutyCycle50 :
				(dutyCycleValue === 0b11) ? DutyCycle75 :
					undefined

	if (dutyCycle === undefined) { throw new Error('unknown duty cycle') }

	const divider = (dividerValue === 0b111) ? Divider00375 :
		(dividerValue === 0b110) ? Divider00750 :
			(dividerValue === 0b101) ? Divider01500 :
				(dividerValue === 0b100) ? Divider03000 :
					(dividerValue === 0b011) ? Divider06000 :
						(dividerValue === 0b010) ? Divider12000 :
							(dividerValue === 0b001) ? Divider24000 :
								(dividerValue === 0b000) ? undefined : // reserved
									undefined

	if (divider === undefined) { throw new Error('unknown divider ' + dividerValue) }

	return { dutyCycle, divider }
}

function decodeVotageOptionBit(voltageBit: number): VoltageOption {
	return voltageBit === 1 ? VoltageOptionVrm : VoltageOptionVdd
}

function decodeReferenceVoltageBits(volt: number): Voltage {
	const rv: Voltage | undefined = (volt === 0b00) ? VoltageOff :
		volt === 0b01 ? Voltage1V :
			volt === 0b10 ? Voltage2V :
				volt === 0b11 ? Voltage4V :
					undefined

	if (rv === undefined) { throw new Error('undefined ref voltage') }

	return rv
}

export function decodeDACByte(dacByte: number) {
	const referenceOptions = decodeVotageOptionBit(dacByte >> 5 & 0b1)
	const referenceVoltage = decodeReferenceVoltageBits((dacByte >> 6) & 0b11)
	const initialValue = dacByte & 0b11111

	return {
		referenceVoltage,
		referenceOptions,
		initialValue
	}
}

export function decodeADCByte(adcByte: number) {
	const referenceOptions = decodeVotageOptionBit((adcByte >> 2) & 0b1)
	const referenceVoltage = decodeReferenceVoltageBits((adcByte >> 3) & 0b11)

	return {
		referenceVoltage,
		referenceOptions
	}
}

export function gpio0Designation(value: number): Gp0Designation {
	if (value === 0b10) { return Gp0DesignationUART_RX }
	if (value === 0b01) { return Gp0DesignationSSPND }
	if (value === 0b00) { return Gp0DesignationGPIO }

	throw new Error('unknown designation')
}

export function gpio1Designation(value: number): Gp1Designation {
	if (value === 0b100) { return Gp1DesignationInterruptDetection }
	if (value === 0b011) { return Gp1DesignationUART_TX }
	if (value === 0b010) { return Gp1DesignationADC_1 }
	if (value === 0b001) { return Gp1DesignationClockOutput }
	if (value === 0b000) { return Gp1DesignationGPIO }

	throw new Error('unknown designation')
}

export function gpio2Designation(value: number): Gp2Designation {
	if (value === 0b11) { return Gp2DesignationDAC_1 }
	if (value === 0b10) { return Gp2DesignationADC_2 }
	if (value === 0b01) { return Gp2DesignationUSB }
	if (value === 0b00) { return Gp2DesignationGPIO }

	throw new Error('unknown designation')
}

export function gpio3Designation(value: number): Gp3Designation {
	if (value === 0b11) { return Gp3DesignationDAC_2 }
	if (value === 0b10) { return Gp3DesignationADC_3 }
	if (value === 0b01) { return Gp3DesignationLedI2C }
	if (value === 0b00) { return Gp3DesignationGPIO }

	throw new Error('unknown designation')
}

export function decodeGpioByte<D>(gpioByte: number, designationFn: (value: number) => D): Gpio<D> {
	return {
		outputValue: ((gpioByte >> 4) & 0b1) === 1 ? Logic1 : Logic0,
		direction: ((gpioByte >> 3) & 0b1) === 1 ? GpioDirectionIn : GpioDirectionOut,
		designation: designationFn(gpioByte & 0b111)
	}
}

export function decodeGpioValues(valueValue: number, directionValue: number) {
	if(valueValue === 0xEE) { return undefined }
	if(directionValue === 0xEF) { return undefined }

	return {
		outputValue: (valueValue === 1) ? Logic1 : Logic0,
		direction: (directionValue === 1) ? GpioDirectionIn : GpioDirectionOut
	}
}

export function decodeRequestedmA(mARequestedByte: number): number {
	return mARequestedByte * 2
}

export function decodeChipSecurityCode(chipSecurityCode: number): Security {
	if(chipSecurityCode === 0b00) { return SecurityUnsecured }
	if(chipSecurityCode === 0b01) { return SecurityPasswordProtected }
	if(chipSecurityCode === 0b10) { return SecurityPermanentlyLocked }

	throw new Error('security attribute undefined')
}

export function decodeRuntimeChipByte(chipByte: number): RuntimeChipSettings {
	const isBitSet = (chipByte: number, shiftBy: number) => {
		return ((chipByte >> shiftBy) & 0b1) === 0b1
	}
	const ledState = (chipByte: number, shiftBy: number) => {
		return isBitSet(chipByte, shiftBy) ? InitialLEDStateOn : InitialLEDStateOff
	}
	const suspendState = (chipByte: number, shiftBy: number) => {
		return isBitSet(chipByte, shiftBy) ? SuspendStateOn : SuspendStateOff
	}
	const configState = (chipByte: number, shiftBy: number) => {
		return isBitSet(chipByte, shiftBy) ? USBCFGStateOn : USBCFGStateOff
	}

	const enabledCDCSerialEnumeration = isBitSet(chipByte, 7)
	const rx = ledState(chipByte, 6)
	const tx = ledState(chipByte, 5)
	const i2cLED = ledState(chipByte, 4)
	const SSPND = suspendState(chipByte, 3)
	const USBCFG = configState(chipByte, 2)

	const chipSecurityCode = 0b11 & chipByte
	const security = decodeChipSecurityCode(chipSecurityCode)

	return {
		enabledCDCSerialEnumeration,
		uartLED: {
			rx, tx
		},
		i2cLED,
		SSPND,
		USBCFG,

		security
	}
}

export function decodeInterruptFlags(negativEdge: boolean, positiveEdge: boolean): InterruptEdge {
	if (negativEdge && positiveEdge) { return InterruptEdgeBoth }
	if (negativEdge) { return InterruptEdgeNegative }
	if (positiveEdge) { return InterruptEdgePositive }
	return InterruptEdgeOff
}

export function decodeResponse(dv: DataView, commandNumber: number) {
	const command = dv.getUint8(0)

	if (command === undefined) { throw new Error('undefined command byte') }
	if (command !== commandNumber) { throw new Error('invalid command byte decoded') }

	return { command }
}

export function decodeStatusResponse(dv: DataView, commandNumber: number) {
	const { command } = decodeResponse(dv, commandNumber)

	const statusCode = dv.getUint8(1)
	if (statusCode === undefined) { throw new Error('status code undedined') }

	if (statusCode === 0x41) {
		//Error reading the I2C slave data from the I2C engine
		return {
			opaque: '__i2c_engine_error__',
			command,
			status: StatusError,
			statusCode
		}
	}

	if (statusCode === 0x03) {
		return {
			opaque: '__not_allowed__',
			command,
			status: StatusNotAllowed,
			statusCode
		}
	}

	if (statusCode === 0x02) {
		return {
			opaque: '__not_supported__',
			command,
			status: StatusNotSupported,
			statusCode
		}
	}

	if (statusCode === 0x01) {
		// I2C Engine is busy (command not completed)
		return {
			opaque: '__busy_alt_not_supported__', // alt not supported
			command,
			status: StatusBusy,
			statusCode
		}
	}

	if (statusCode !== 0x00) {
		throw new Error('invalid statusCode')
	}

	return {
		opaque: '__transparent_from_decoder__',
		command,
		status: StatusSuccess,
		statusCode
	}
}

function _decodeReadWriteResponse(dv: DataView, commandNumber: number) {
	const { opaque, command, status, statusCode } = decodeStatusResponse(dv, commandNumber)

	const i2cState = dv.getUint8(2)

	if (i2cState === undefined) { throw new Error('undefined i2c state') }
	const i2cStateName = decodeI2CState(i2cState)

	return {
		opaque,
		command,
		status, statusCode,
		i2cState, i2cStateName
	}
}

export function decodeReadWriteResponse(commandNumber: number, bufferSource: DecoderBufferSource): Response {
	const dv = ArrayBuffer.isView(bufferSource) ?
		new DataView(bufferSource.buffer, bufferSource.byteOffset, bufferSource.byteLength) :
		new DataView(bufferSource)

	const {
		opaque,
		command,
		status, statusCode,
		i2cState, i2cStateName
	} = _decodeReadWriteResponse(dv, commandNumber)

	//const userData = new Uint8Array(dv.buffer, dv.byteOffset + 3)
	//const userData = new Uint8Array(dv.buffer, dv.byteOffset + 4, byteLength)
	//if(byteLength < 0 || byteLength > 60) { throw new Error('invalid byte length: ' + byteLength) }

	return {
		opaque,
		command,
		status, statusCode,
		i2cState, i2cStateName
		//buffer: userData.slice().buffer
	}
}

const I2C_STATES: Record<number, string> = {
	0x00: 'IDLE',
	//
	0x10: 'START',
	0x11: 'START_ACK',
	0x12: 'START_TIMEOUT',
	0x15: 'REPEAT_START',
	0x16: 'REPEAT_START_ACK',
	0x17: 'REPEAT_START_TIMEOUT',
	//
	0x20: 'ADDRESS',
	0x21: 'ADDRESS_WAIT_SEND',
	0x22: 'ADDRESS_ACK',
	0x23: 'ADDRESS_TIMEOUT',
	0x24: 'ADDRESS_NACK_STOP_END',
	0x25: 'ADDRESS_NACK_STOP', // ?
	//
	0x30: 'ADDRESS_',
	0x31: 'ADDRESS__WAIT_SEND',
	0x32: 'ADDRESS__ACK',
	0x33: 'ADDRESS__TIMEOUT',
	//
	0x40: 'WRITE_DATA',
	0x41: 'WRITE_DATA_WAIT_SEND', // partial data
	0x42: 'WRITE_DATA_ACK',
	0x43: 'WRITE_DATA_WAIT', // more data
	0x44: 'WRITE_DATA_TIMEOUT',
	0x45: 'WRITE_DATA_END_NO_STOP', // writing not stop
	//
	0x50: 'READ_DATA',
	0x51: 'READ_DATA_',
	0x52: 'READ_DATA_timeout', // timeout
	0x53: 'READ_DATA_',
	0x54: 'READ_DATA_partial', // partial
	0x55: 'READ_DATA_complete', // complete
	//
	0x60: 'STOP',
	0x61: 'STOP_WAIT',
	0x62: 'STOP_TIMEOUT',
	//
	0x70: '?',
	0x7F: 'ERR', // ?
	//
	0x80: '?'
}

export function decodeI2CState(value: number) {
	return I2C_STATES[value]
}