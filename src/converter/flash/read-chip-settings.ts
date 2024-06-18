import { ReadFlashDataChipSettingsRequest, ReadFlashDataRequest } from '../../messages/flash.request.js'
import { ReadFlashDataChipSettingsResponse } from '../../messages/flash.response.js'
import { READ_FLASH_DATA_CHIP_SETTINGS_SUB_COMMAND, READ_FLASH_DATA_COMMAND } from '../../messages/message.constants.js'
import { DecoderBufferSource } from '../converter.js'

import { decodeADCByte, decodeChipSecurityCode, decodeDACByte, decodeGPClockValues, decodeInterruptFlags, decodeRequestedmA, decodeStatusResponse, isBitSet, isStatusSuccess } from '../decoders.js'
import { newReportBuffer } from '../encoders.js'
import { Unused } from '../throw.js'

export const EXPECTED_CHIP_SETTINGS_BYTE_LENGTH = 10

export class ReadFlashDataChipSettingsResponseCoder {
	static encode(res: ReadFlashDataChipSettingsResponse): ArrayBuffer { throw new Unused() }
	static decode(bufferSource: DecoderBufferSource): ReadFlashDataChipSettingsResponse {
		const dv = ArrayBuffer.isView(bufferSource) ?
			new DataView(bufferSource.buffer, bufferSource.byteOffset, bufferSource.byteLength) :
			new DataView(bufferSource)

		const response = decodeStatusResponse(READ_FLASH_DATA_COMMAND, bufferSource) as ReadFlashDataChipSettingsResponse
		if(!isStatusSuccess(response)) { return response }

		const subCommandByteLength = dv.getUint8(2)
		if(subCommandByteLength !== EXPECTED_CHIP_SETTINGS_BYTE_LENGTH) { throw new Error('subcommand length error') }

		const enableAndSecurityByte = dv.getUint8(4)
		const gpClockDividerByte = dv.getUint8(5)
		const dacReferenceByte = dv.getUint8(6)
		const interruptAndADCReferenceByte = dv.getUint8(7)
		const vendorId = dv.getUint16(8, true)
		const productId = dv.getUint16(10, true)
		const powerAttribute = dv.getUint8(12)
		const mARequestedByte = dv.getUint8(13)
		const mARequested = decodeRequestedmA(mARequestedByte)

		//
		const security = decodeChipSecurityCode(enableAndSecurityByte & 0b11)
		const enabledCDCSerialEnumeration = isBitSet(enableAndSecurityByte, 7) // enableAndSecurityByte >> 7 === 0b1

		const dutyCycle = (gpClockDividerByte >> 3) & 0b11
		const divider = gpClockDividerByte & 0b111
		const clock = decodeGPClockValues(dutyCycle, divider)

		const negativeEdge = isBitSet(interruptAndADCReferenceByte, 6) // (interruptAndADCReferenceByte >> 6 & 0b1) === 0b1
		const positiveEdge = isBitSet(interruptAndADCReferenceByte, 5) // (interruptAndADCReferenceByte >> 5 & 0b1) === 0b1
		const edge = decodeInterruptFlags(negativeEdge, positiveEdge)

		const dac = decodeDACByte(dacReferenceByte)
		const adc = decodeADCByte(interruptAndADCReferenceByte)

		const interrupt = { edge }

		const usb = {
			vendorId, productId,
			powerAttribute, mARequested
		}

		const chip = {
			enabledCDCSerialEnumeration,
			security
		}

		const gp = {
			clock,
			dac,
			adc,
			interrupt
		}

		return {
			...response,
			subCommand: READ_FLASH_DATA_CHIP_SETTINGS_SUB_COMMAND,
			chip, gp, usb
		}
	}
}

export class ReadFlashDataChipSettingsRequestCoder {
	static encode(req:  ReadFlashDataRequest): ArrayBuffer {
		const report = newReportBuffer()
		const dv = new DataView(report)

		dv.setUint8(0, READ_FLASH_DATA_COMMAND)
		dv.setUint8(1, READ_FLASH_DATA_CHIP_SETTINGS_SUB_COMMAND)

		return report
	}
	static decode(bufferSource: DecoderBufferSource): ReadFlashDataRequest { throw new Unused() }
}
