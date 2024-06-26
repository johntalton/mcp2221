import {
	decodeStatusResponse,
	decodeDACByte, decodeADCByte,
	decodeGpioByte,
	gpio0Designation, gpio1Designation, gpio2Designation, gpio3Designation,
	decodeInterruptFlags,
	decodeGPClockValues,
	decodeRequestedmA,
	isBitSet,
	isStatusSuccess,
	decodeAccessPassword,
	decodePowerAttribute,
	decodeChipByte
} from '../decoders.js'

import { GetSRAMSettingsRequest } from '../../messages/sram.request.js'
import { GetSRAMSettingsResponse } from '../../messages/sram.response.js'
import { DecoderBufferSource } from '../converter.js'
import { Invalid, Unused } from '../throw.js'
import { ACCESS_PASSWORD_BYTE_LENGTH, EXPECTED_CHIP_BYTE_LENGTH, EXPECTED_GP_BYTE_LENGTH, SRAM_GET_COMMAND } from '../../messages/message.constants.js'
import { newReportBuffer } from '../encoders.js'

export class GetSRAMSettingsResponseCoder {
	static encode(_msg: GetSRAMSettingsResponse): ArrayBuffer { throw new Unused() }
	static decode(bufferSource: DecoderBufferSource): GetSRAMSettingsResponse {
		const dv = ArrayBuffer.isView(bufferSource) ?
			new DataView(bufferSource.buffer, bufferSource.byteOffset, bufferSource.byteLength) :
			new DataView(bufferSource)

		const response = decodeStatusResponse(SRAM_GET_COMMAND, bufferSource) as GetSRAMSettingsResponse
		if(!isStatusSuccess(response)) { return response }

		const chipBytesLength = dv.getUint8(2)
		const gpBytesLength = dv.getUint8(3)

		if (chipBytesLength != EXPECTED_CHIP_BYTE_LENGTH) { throw new Invalid('chip data length', chipBytesLength) }
		if (gpBytesLength !== EXPECTED_GP_BYTE_LENGTH) { throw new Invalid('gpio data length', gpBytesLength) }

		const statusMaskByte = dv.getUint8(4)
		const gpClockOutputByte = dv.getUint8(5)
		const dacStatusMaskByte = dv.getUint8(6)
		const adcStatusMaskByte = dv.getUint8(7)

		const usbVID = dv.getUint16(8, true)
		const usbPID = dv.getUint16(10, true)

		const powerAttributeByte = dv.getUint8(12)
		const mARequestedByte = dv.getUint8(13)
		const mARequested = decodeRequestedmA(mARequestedByte)
		const { remoteWake, selfPower } = decodePowerAttribute(powerAttributeByte)

		const currentSuppliedPassword = new Uint8Array(dv.buffer, dv.byteOffset + 14, ACCESS_PASSWORD_BYTE_LENGTH)
		const password = decodeAccessPassword(currentSuppliedPassword)

		const gpio0Byte = dv.getUint8(22)
		const gpio1Byte = dv.getUint8(23)
		const gpio2Byte = dv.getUint8(24)
		const gpio3Byte = dv.getUint8(25)

		//
		const chip = decodeChipByte(statusMaskByte)

		const dutyCycle = (gpClockOutputByte >> 3) & 0b11
		const divider = gpClockOutputByte & 0b111

		const clock = decodeGPClockValues(dutyCycle, divider)

		const dac = decodeDACByte(dacStatusMaskByte)
		const adc = decodeADCByte(adcStatusMaskByte)

		const gpio0 = decodeGpioByte(gpio0Byte, gpio0Designation)
		const gpio1 = decodeGpioByte(gpio1Byte, gpio1Designation)
		const gpio2 = decodeGpioByte(gpio2Byte, gpio2Designation)
		const gpio3 = decodeGpioByte(gpio3Byte, gpio3Designation)

		const negativeEdge = isBitSet(adcStatusMaskByte, 6) // (adcStatusMaskByte >> 6 & 0b1) === 1
		const positiveEdge = isBitSet(adcStatusMaskByte, 5) // (adcStatusMaskByte >> 5 & 0b1) === 1
		const edge = decodeInterruptFlags(negativeEdge, positiveEdge)

		return {
			...response,

			chip,
			gp: {
				clock,
				dac,
				adc,
				interrupt: {
					edge
				}
			},
			usb: {
				vendorId: usbVID,
				productId: usbPID,
				selfPower,
				remoteWake,
				mARequested
			},

			password,

			gpio0,
			gpio1,
			gpio2,
			gpio3
		}
	}
}

export class GetSRAMSettingsRequestCoder {
	static encode(msg: GetSRAMSettingsRequest): ArrayBuffer {
		const report = newReportBuffer()
		const dv = new DataView(report)

		dv.setUint8(0, SRAM_GET_COMMAND)

		return report
	}
	static decode(_bufferSource: DecoderBufferSource): GetSRAMSettingsRequest { throw new Unused() }
}
