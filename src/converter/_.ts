import {
	Voltage, VoltageOption,
	Security,
	InterruptEdge,
	Gpio,
	Gp0Designation, Gp1Designation, Gp2Designation, Gp3Designation,
	GPClock
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

export function gpClockFromValues(dutyCycleValue: number, dividerValue: number): GPClock {
	const dutyCycle = dutyCycleValue === 0b00 ? DutyCycle00 :
		dutyCycleValue === 0b01 ? DutyCycle25 :
			dutyCycleValue === 0b10 ? DutyCycle50 :
				dutyCycleValue === 0b11 ? DutyCycle75 :
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

export function voltageBitToOption(voltageBit: number): VoltageOption {
	return voltageBit === 1 ? VoltageOptionVrm : VoltageOptionVdd
}

export function referenceVoltageToVoltage(volt: number): Voltage {
	const rv: Voltage | undefined = (volt === 0b00) ? VoltageOff :
		volt === 0b01 ? Voltage1V :
			volt === 0b10 ? Voltage2V :
				volt === 0b11 ? Voltage4V :
					undefined

	if (rv === undefined) { throw new Error('undefined ref voltage') }

	return rv
}

export function dacByteToSettings(dacByte: number) {
	const referenceOptions = voltageBitToOption(dacByte >> 5 & 0b1)
	const referenceVoltage = referenceVoltageToVoltage((dacByte >> 6) & 0b11)
	const initialValue = dacByte & 0b1

	return {
		referenceVoltage,
		referenceOptions,
		initialValue
	}
}

export function adcByteToSettings(adcByte: number) {
	const referenceOptions = voltageBitToOption((adcByte >> 2) & 0b1)
	const referenceVoltage = referenceVoltageToVoltage((adcByte >> 3) & 0b11)

	return {
		referenceVoltage,
		referenceOptions
	}
}

export function gpio0Designation(value: number): Gp0Designation {
	if (value === 0b10) { return Gp0DesignationUART_RX }
	if (value === 0b01) { return Gp0DesignationSSPND }
	if (value === 0b00) { return Gp0DesignationGPIO }

	throw new Error('unknown directions')
}

export function gpio1Designation(value: number): Gp1Designation {
	if (value === 0b100) { return Gp1DesignationInterruptDetection }
	if (value === 0b011) { return Gp1DesignationUART_TX}
	if (value === 0b010) { return Gp1DesignationADC_1 }
	if (value === 0b001) { return Gp1DesignationClockOutput }
	if (value === 0b000) { return Gp1DesignationGPIO }

	throw new Error('unknown directions')
}

export function gpio2Designation(value: number): Gp2Designation {
	if (value === 0b11) { return Gp2DesignationDAC_1 }
	if (value === 0b10) { return Gp2DesignationADC_2 }
	if (value === 0b01) { return Gp2DesignationUSB }
	if (value === 0b00) { return Gp2DesignationGPIO }

	throw new Error('unknown directions')
}

export function gpio3Designation(value: number): Gp3Designation {
	if (value === 0b11) { return Gp3DesignationDAC_2 }
	if (value === 0b10) { return Gp3DesignationADC_3 }
	if (value === 0b01) { return Gp3DesignationLedI2C }
	if (value === 0b00) { return Gp3DesignationGPIO }

	throw new Error('unknown directions')
}

export function gpio<D>(gpioByte: number, designation: (value: number) => D): Gpio<D> {
	return {
		outputValue: ((gpioByte >> 4) & 0b1) === 1 ? Logic1 : Logic0,
		direction: ((gpioByte >> 3) & 0b1) === 1 ? GpioDirectionIn : GpioDirectionOut,
		designation: designation(gpioByte & 0b111)
	}
}

export function splitStatusByte(statusMaskByte: number) {
	const isBitSet = (statusMaskByte: number, shiftBy: number) => {
		return ((statusMaskByte >> shiftBy) & 0b1) === 0b1
	}
	const ledState = (statusMaskByte: number, shiftBy: number) => {
		return isBitSet(statusMaskByte, shiftBy) ? InitialLEDStateOn : InitialLEDStateOff
	}
	const suspendState = (statusMaskByte: number, shiftBy: number) => {
		return isBitSet(statusMaskByte, shiftBy) ? SuspendStateOn : SuspendStateOff
	}
	const configState = (statusMaskByte: number, shiftBy: number) => {
		return isBitSet(statusMaskByte, shiftBy) ? USBCFGStateOn : USBCFGStateOff
	}

	const enabledCDCSerialEnumeration = isBitSet(statusMaskByte, 7)
	const rx = ledState(statusMaskByte, 6)
	const tx = ledState(statusMaskByte, 5)
	const i2cLED = ledState(statusMaskByte, 4)
	const SSPND = suspendState(statusMaskByte, 3)
	const USBCFG = configState(statusMaskByte, 2)

	const chipSecurityCode = 0b11 & statusMaskByte
	const security: Security | undefined = chipSecurityCode === 0b00 ? SecurityUnsecured :
		chipSecurityCode === 0b01 ? SecurityPasswordProtected :
			chipSecurityCode === 0b10 ? SecurityPermanentlyLocked :
				undefined

	if (security === undefined) { throw new Error('security attribute undefined') }

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

export function intBitsToEdge(negativEdge: boolean, positiveEdge: boolean): InterruptEdge {
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
			opaque: '__busy__', // not supported
			command,
			status: StatusBusy,
			statusCode
		}
	}

	if (statusCode !== 0x00) {
		throw new Error('invalid statusCode')
	}

	return {
		command,
		status: StatusSuccess,
		statusCode
	}
}

function _decodeReadWriteResponse(dv: DataView, commandNumber: number) {
	const { command, status, statusCode } = decodeStatusResponse(dv, commandNumber)

	const i2cState = dv.getUint8(2)
	//const byteLength = dv.getUint8(3)

	if (i2cState === undefined) { throw new Error('undefined i2c state') }

	return {
		command,
		status,
		statusCode,
		i2cState
	}
}

export function decodeReadWriteResponse(commandNumber: number, bufferSource: DecoderBufferSource): Response {
	const dv = ArrayBuffer.isView(bufferSource) ?
		new DataView(bufferSource.buffer, bufferSource.byteOffset, bufferSource.byteLength) :
		new DataView(bufferSource)

	const { command, status, statusCode, i2cState } = _decodeReadWriteResponse(dv, commandNumber)

	//const userData = new Uint8Array(dv.buffer, dv.byteOffset + 3)
	//const userData = new Uint8Array(dv.buffer, dv.byteOffset + 4, byteLength)
	//if(byteLength < 0 || byteLength > 60) { throw new Error('invalid byte length: ' + byteLength) }

	return {
		opaque: '__its_getting_closer__',
		command,
		status,
		i2cState,
		statusCode,

		//buffer: userData.slice().buffer
	}
}


// export function decodeReadFlashSubCommand() {
//     const { command, status, statusCode } = decodeStatusResponse(dv, 0xB0) as ReadFlashDataResponse

//     const subCommandByteLength = dv.getUint8(2)


//   switch()

// }