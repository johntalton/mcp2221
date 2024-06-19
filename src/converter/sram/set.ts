import { decodeStatusResponse, isStatusSuccess, } from '../decoders.js'
import { SetSRAMSettingsRequest } from '../../messages/sram.request.js'
import { SetSRAMSettingsResponse, } from '../../messages/sram.response.js'
import { DecoderBufferSource } from '../converter.js'
import { dont_care, SRAM_SET_COMMAND } from '../../messages/message.constants.js'

import {
	encodeGPClockAlter,
	encodeDACReferenceAlter,
	encodeDACValueAlter,
	encodeADCReferenceAlter,
	encodeInterruptAlter,
	encodeGpioAlter,
	encodeGpio0Designation, encodeGpio1Designation,
	encodeGpio2Designation, encodeGpio3Designation, newReportBuffer
} from '../encoders.js'
import { Invalid, Unused } from '../throw.js'

export class SetSRAMSettingsResponseCoder {
	static encode(_msg: SetSRAMSettingsResponse): ArrayBuffer { throw new Unused() }
	static decode(bufferSource: DecoderBufferSource): SetSRAMSettingsResponse {
		const dv = ArrayBuffer.isView(bufferSource) ?
			new DataView(bufferSource.buffer, bufferSource.byteOffset, bufferSource.byteLength) :
			new DataView(bufferSource)

		const response = decodeStatusResponse(SRAM_SET_COMMAND, bufferSource) as SetSRAMSettingsResponse
		if(!isStatusSuccess(response)) { return response }

		return response
	}
}

export class SetSRAMSettingsRequestCoder {
	static encode(msg: SetSRAMSettingsRequest): ArrayBuffer {
		const { clock, gp, gpio0, gpio1, gpio2, gpio3 } = msg ?? {}
		const { dac, adc, interrupt } = gp ?? {}

		//
		const clockOutputByte = encodeGPClockAlter(clock)
		const dacReferenceByte = encodeDACReferenceAlter(dac)
		const dacValueByte = encodeDACValueAlter(dac?.initialValue)
		const adcVoltageByte = encodeADCReferenceAlter(adc)
		const interruptByte = encodeInterruptAlter(interrupt)

		//
		const hasAnyGpio = gpio0 !== undefined ||
			gpio1 !== undefined ||
			gpio2 !== undefined ||
			gpio3 !== undefined


		if(hasAnyGpio && gpio0 === undefined) { throw new Invalid('gpio0', undefined) }
		if(hasAnyGpio && gpio1 === undefined) { throw new Invalid('gpio1', undefined) }
		if(hasAnyGpio && gpio2 === undefined) { throw new Invalid('gpio2', undefined) }
		if(hasAnyGpio && gpio3 === undefined) { throw new Invalid('gpio3', undefined) }

		//
		const alterGpioByte = hasAnyGpio ? 0x80 : 0

		const gpio0Byte = encodeGpioAlter(gpio0, encodeGpio0Designation)
		const gpio1Byte = encodeGpioAlter(gpio1, encodeGpio1Designation)
		const gpio2Byte = encodeGpioAlter(gpio2, encodeGpio2Designation)
		const gpio3Byte = encodeGpioAlter(gpio3, encodeGpio3Designation)

		//
		const buffer = newReportBuffer()
		const dv = new DataView(buffer)

		dv.setUint8(0, SRAM_SET_COMMAND)
		dv.setUint8(1, dont_care())
		dv.setUint8(2, clockOutputByte)
		dv.setUint8(3, dacReferenceByte)
		dv.setUint8(4, dacValueByte)
		dv.setUint8(5, adcVoltageByte)
		dv.setUint8(6, interruptByte)
		dv.setUint8(7, alterGpioByte)
		dv.setUint8(8, gpio0Byte)
		dv.setUint8(9, gpio1Byte)
		dv.setUint8(10, gpio2Byte)
		dv.setUint8(11, gpio3Byte)

		return buffer
	}
	static decode(_bufferSource: DecoderBufferSource): SetSRAMSettingsRequest { throw new Unused() }
}
