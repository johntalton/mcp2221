import { WriteFlashDataChipSettingsRequest } from '../../messages/flash.request.js'
import { WriteFlashDataResponse } from '../../messages/flash.response.js'
import { WRITE_FLASH_DATA_COMMAND, WRITE_FLASH_DATA_CHIP_SETTINGS_SUB_COMMAND, ACCESS_PASSWORD_BYTE_LENGTH } from '../../messages/message.constants.js'
import { DecoderBufferSource } from '../converter.js'

import { decodeStatusResponse, isStatusSuccess } from '../decoders.js'
import { encodeChipSettings, encodeDivider, encodeGPClock, encodeVoltageOptionsBits, encodeVoltageBits, newReportBuffer, _encodeInterruptEdge, encodeAccessPassword, encodePowerAttribute, encodeRequestedmA } from '../encoders.js'
import { Invalid, Unimplemented, Unknown, Unused } from '../throw.js'

export class WriteFlashDataChipSettingsResponseCoder {
	static encode(res: WriteFlashDataResponse): ArrayBuffer { throw new Unused() }
	static decode(bufferSource: DecoderBufferSource): WriteFlashDataResponse {
		const response = decodeStatusResponse(WRITE_FLASH_DATA_COMMAND, bufferSource) as WriteFlashDataResponse
		if(!isStatusSuccess(response)) { return response }

		return {
			...response,
			subCommand: WRITE_FLASH_DATA_CHIP_SETTINGS_SUB_COMMAND
		}
	}
}

export class WriteFlashDataChipSettingsRequestCoder {
	static encode(req: WriteFlashDataChipSettingsRequest): ArrayBuffer {
		const { chip, gp, usb, password } = req ?? {}
		const { clock, dac, adc, interrupt } = gp
		const { productId, vendorId, mARequested } = usb

		// usb
		const powerAttributeByte = encodePowerAttribute(usb)
		const mARequestedByte = encodeRequestedmA(mARequested)
		// console.log('write', {mARequested,  mARequestedByte })
		// chip
		const chipByte = encodeChipSettings(chip)
		// console.log(chipByte)

		// gp
		const clockBits = encodeGPClock(clock)
		const dacRefVBits = encodeVoltageBits(dac.referenceVoltage)
		const dacRefOptBits = encodeVoltageOptionsBits(dac.referenceOptions)
		const dacInitValBits = dac.initialValue & 0b0001_1111

		const { positiveBit, negativeBit } = _encodeInterruptEdge(interrupt.edge)

		const adcRefVBits = encodeVoltageBits(adc.referenceVoltage)
		const adcRefOptBits = encodeVoltageOptionsBits(adc.referenceOptions)

		// password
		const password8 = encodeAccessPassword(password)

		//
		if(dacRefVBits === undefined) { throw new Unknown('dac.referenceVoltage', dac.referenceVoltage) }
		if(adcRefVBits === undefined) { throw new Unknown('adc.referenceVoltage', adc.referenceVoltage) }

		//
		const dividerByte = clockBits
		const dacByte = (dacRefVBits << 6) | (dacRefOptBits << 5) | (dacInitValBits)
		const intAdcByte = (negativeBit << 6) | (positiveBit << 5) | (adcRefVBits << 3) | (adcRefOptBits << 2)

		//
		const buffer = newReportBuffer()
		const dv = new DataView(buffer)

		dv.setUint8(0, WRITE_FLASH_DATA_COMMAND)
		dv.setUint8(1, WRITE_FLASH_DATA_CHIP_SETTINGS_SUB_COMMAND)
		dv.setUint8(2, chipByte)
		dv.setUint8(3, dividerByte)
		dv.setUint8(4, dacByte)
		dv.setUint8(5, intAdcByte)
		dv.setUint16(6, vendorId, true)
		dv.setUint16(8, productId, true)
		dv.setUint8(10, powerAttributeByte)
		dv.setUint8(11, mARequestedByte)

		const passwordBuffer = new Uint8Array(dv.buffer, dv.byteOffset + 12, ACCESS_PASSWORD_BYTE_LENGTH)
		passwordBuffer.set(password8)

		// console.log('encoded password', [ ...new Uint8Array(buffer)])
		return buffer
	}
	static decode(bufferSource: DecoderBufferSource): WriteFlashDataChipSettingsRequest { throw new Unused() }
}
