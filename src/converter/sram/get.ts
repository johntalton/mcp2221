import {
	decodeStatusResponse,
	decodeRuntimeChipByte,
	decodeDACByte, decodeADCByte,
	decodeGpioByte,
	gpio0Designation, gpio1Designation, gpio2Designation, gpio3Designation,
	decodeInterruptFlags,
	decodeGPClockValues,
	decodeRequestedmA,
	isBitSet,
	isStatusSuccess
} from '../decoders.js'

import { GetSRAMSettingsRequest } from '../../messages/sram.request.js'
import { GetSRAMSettingsResponse } from '../../messages/sram.response.js'
import { DecoderBufferSource } from '../converter.js'
import { Unknown, Unused } from '../throw.js'
import { SRAM_GET_COMMAND } from '../../messages/message.consts.js'
import { newReportBuffer } from '../encoders.js'

export const EXPECTED_CHIP_BYTE_LENGTH = 18
export const EXPECTED_GP_BYTE_LENGTH = 4

export class GetSRAMSettingsResponseCoder {
	static encode(_msg: GetSRAMSettingsResponse): ArrayBuffer { throw new Unused() }
	static decode(bufferSource: DecoderBufferSource): GetSRAMSettingsResponse {
		const dv = ArrayBuffer.isView(bufferSource) ?
			new DataView(bufferSource.buffer, bufferSource.byteOffset, bufferSource.byteLength) :
			new DataView(bufferSource)

		const response = decodeStatusResponse(SRAM_GET_COMMAND, bufferSource) as GetSRAMSettingsResponse
		const { command, status, statusCode } = response
		if(!isStatusSuccess(response)) { return response }

		const chipBytesLength = dv.getUint8(2)
		const gpBytesLength = dv.getUint8(3)

		if (chipBytesLength != EXPECTED_CHIP_BYTE_LENGTH) { throw new Unknown('chip data length', chipBytesLength) }
		if (gpBytesLength !== EXPECTED_GP_BYTE_LENGTH) { throw new Unknown('gpio data length', gpBytesLength) }

		const statusMaskByte = dv.getUint8(4)
		const gpClockOutputByte = dv.getUint8(5)
		const dacStatusMaskByte = dv.getUint8(6)
		const adcStatusMaskByte = dv.getUint8(7)

		const usbVID = dv.getUint16(8, true)
		const usbPID = dv.getUint16(10, true)

		const powerAttribute = dv.getUint8(12)
		const mARequestedByte = dv.getUint8(13)
		const mARequested = decodeRequestedmA(mARequestedByte)

		const currentSuppliedPassword = new Uint8Array(dv.buffer, dv.byteOffset + 14, 8)

		const gpio0Byte = dv.getUint8(22)
		const gpio1Byte = dv.getUint8(23)
		const gpio2Byte = dv.getUint8(24)
		const gpio3Byte = dv.getUint8(25)

		//
		const chip = decodeRuntimeChipByte(statusMaskByte)

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
			opaque: '__here_we_go__',
			command,
			status,
			statusCode,

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
				powerAttribute,
				mARequested
			},

			password: String.fromCharCode(...currentSuppliedPassword), // TODO wrong :P

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
