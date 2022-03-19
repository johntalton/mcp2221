
import { BitSmush } from '@johntalton/bitsmush'

import {
	decodeStatusResponse,
} from '../_.js'

import { SetSRAMSettingsRequest } from '../../messages/sram.request.js'
import { SetSRAMSettingsResponse, } from '../../messages/sram.response.js'
import { DecoderBufferSource } from '../converter.js'

export class SetSRAMSettingsResponseCoder {
	static encode(_msg: SetSRAMSettingsResponse): ArrayBuffer { throw new Error('unused') }
	static decode(bufferSource: DecoderBufferSource): SetSRAMSettingsResponse {
		const dv = ArrayBuffer.isView(bufferSource) ?
			new DataView(bufferSource.buffer, bufferSource.byteOffset, bufferSource.byteLength) :
			new DataView(bufferSource)

		const { command, status, statusCode } = decodeStatusResponse(dv, 0x60) as SetSRAMSettingsResponse

		//
		return {
			opaque: '__response_from_set__',
			command,
			status,
			statusCode
		}
	}
}

export class SetSRAMSettingsRequestCoder {
	static encode(msg: SetSRAMSettingsRequest): ArrayBuffer {
		const buffer = new ArrayBuffer(64)
		const dv = new DataView(buffer)

		const foo = {
			command: { offset: 0, value: 0x60 },

			dacVoltageReference: {
				offset: 3,
				bits: {
					enableUpdate: { smush: [], flag: true },
					referenceVoltage: { smush: [], enumeration: { '': '' } },
					referenceOptions: {}
				}
			},
			dacOutputValue: {

			}
		}


		dv.setUint8(0, 0x60)

		const hasClock = msg.clock !== undefined
		const clockOutputByte = hasClock ? 0 : 0
		dv.setUint8(2, clockOutputByte)

		function dacSettingsAlterByte(msg: SetSRAMSettingsRequest) {
			const hasDac = msg.gp?.dac !== undefined
			if (!hasDac) { return 0x00 }

			const enableUpdateBits = 0b1
			const voltageBits = 0
			const optionsBits = 0

			return BitSmush.smushBits(
				[[7, 1], [2, 2], [0, 1]],
				[enableUpdateBits, voltageBits, optionsBits])
		}
		const dacSettingsByte = dacSettingsAlterByte(msg)
		dv.setUint8(3, dacSettingsByte)

		const hasDacValue = msg.gp?.dac?.initialValue !== undefined
		const dacValueByte = hasDacValue ? 0 : 0
		dv.setUint8(4, dacValueByte)

		const hasAdcSettings = msg.gp?.adc?.referenceVoltage !== undefined
		const adcVoltageByte = hasAdcSettings ? 0 : 0
		dv.setUint8(5, adcVoltageByte)

		const hasInterrupt = msg.gp?.interrupt !== undefined
		const interruptByte = hasInterrupt ? 0 : 0
		dv.setUint8(6, interruptByte)

		const hasAnyGpio = msg.gpio0 !== undefined ||
			msg.gpio1 !== undefined ||
			msg.gpio2 !== undefined ||
			msg.gpio3 !== undefined

		const alterGpioByte = hasAnyGpio ? 0x80 : 0
		dv.setUint8(7, alterGpioByte)

		const hasGpio0 = msg.gpio0 !== undefined
		const gpio0Byte = hasGpio0 ? 0x08 : 0
		dv.setUint8(8, gpio0Byte)

		const hasGpio1 = msg.gpio1 !== undefined
		const gpio1Byte = hasGpio1 ? 0 : 0
		dv.setUint8(9, gpio1Byte)

		const hasGpio2 = msg.gpio2 !== undefined
		const gpio2Byte = hasGpio2 ? 0 : 0
		dv.setUint8(10, gpio2Byte)

		const hasGpio3 = msg.gpio3 !== undefined
		const gpio3Byte = hasGpio3 ? 0 : 0
		dv.setUint8(11, gpio3Byte)

		return buffer
	}
	static decode(_bufferSource: DecoderBufferSource): SetSRAMSettingsRequest { throw new Error('unused') }
}
