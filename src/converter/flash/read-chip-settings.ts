import { ReadFlashDataChipSettingsRequest, ReadFlashDataRequest } from '../../messages/flash.request.js'
import { ReadFlashDataChipSettingsResponse } from '../../messages/flash.response.js'
import { DecoderBufferSource } from '../converter.js'

import { decodeADCByte, decodeChipSecurityCode, decodeDACByte, decodeGPClockValues, decodeInterruptFlags, decodeRequestedmA, decodeStatusResponse } from '../decoders.js'

export class ReadFlashDataChipSettingsResponseCoder {
	static encode(res: ReadFlashDataChipSettingsRequest): ArrayBuffer { throw new Error('unused') }
	static decode(bufferSource: DecoderBufferSource): ReadFlashDataChipSettingsResponse {
		const dv = ArrayBuffer.isView(bufferSource) ?
			new DataView(bufferSource.buffer, bufferSource.byteOffset, bufferSource.byteLength) :
			new DataView(bufferSource)

		const response = decodeStatusResponse(dv, 0xB0) as ReadFlashDataChipSettingsResponse
		const { command, status, statusCode } = response
		if(statusCode !== 0) { return response }

		const subCommandByteLength = dv.getUint8(2)
		if(subCommandByteLength !== 10) { throw new Error('subcommand length error') }

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
		const enabledCDCSerialEnumeration = enableAndSecurityByte >> 7 === 0b1

		const dutyCycle = (gpClockDividerByte >> 3) & 0b11
		const divider = gpClockDividerByte & 0b111
		const clock = decodeGPClockValues(dutyCycle, divider)

		const negativeEdge = (interruptAndADCReferenceByte >> 6 & 0b1) === 0b1
		const positiveEdge = (interruptAndADCReferenceByte >> 5 & 0b1) === 0b1
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
			opaque: '__is_this_what_you_want__',
			command, subCommand: 0x00,
			status, statusCode,
			chip, gp, usb
		}
	}
}

export class ReadFlashDataChipSettingsRequestCoder {
	static encode(req:  ReadFlashDataRequest): ArrayBuffer {
		return Uint8ClampedArray.from([ 0xB0, 0x00 ])
	}
	static decode(bufferSource: DecoderBufferSource): ReadFlashDataChipSettingsResponse { throw new Error('unused') }
}
