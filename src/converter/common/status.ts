import { StatusParametersRequest } from '../../messages/common.request.js'
import { StatusParametersResponse } from '../../messages/common.response.js'
import { DecoderBufferSource } from '../converter.js'

import { dont_care, any_other, STATUS_COMMAND, STATUS_I2C_CANCEL_FLAG, STATUS_SET_CLOCK_FLAG } from '../../messages/message.constants.js'

import { decodeStatusResponse, decodeI2CState, isBitSet, isStatusSuccess, decodeI2CCancel } from '../decoders.js'
import { I2CReadPending } from '../../messages/message.fragments.js'
import { encodeI2CDivider, newReportBuffer } from '../encoders.js'
import { Invalid, Unused } from '../throw.js'


export class StatusParametersResponseCoder {
	static encode(_res: StatusParametersResponse): ArrayBuffer { throw new Unused() }

	static decode(bufferSource: DecoderBufferSource): StatusParametersResponse {
		const dv = ArrayBuffer.isView(bufferSource) ?
			new DataView(bufferSource.buffer, bufferSource.byteOffset, bufferSource.byteLength) :
			new DataView(bufferSource)

		const response = decodeStatusResponse(STATUS_COMMAND, bufferSource) as StatusParametersResponse
		if(!isStatusSuccess(response)) { return response }

		const cancelTransferByte = dv.getUint8(2)
		const setSpeedByte = dv.getUint8(3)
		const speedDividerByte = dv.getUint8(4)

		const i2cState = dv.getUint8(8)

		const requestedTransferLength = dv.getUint16(9, true)
		const transferredBytes = dv.getUint16(11, true)

		const dataBufferCounter = dv.getUint8(13)
		const communicationSpeedDivider = dv.getUint8(14)
		const timeoutMs = dv.getUint8(15)

		const address = dv.getUint16(16, true)

		const unused18 = dv.getUint8(18)

		const ACKByte = dv.getUint8(20)
		const unused21 = dv.getUint8(21)
		const SCL = dv.getUint8(22)
		const SDA = dv.getUint8(23)

		const interruptEdgeDetectorStateByte = dv.getUint8(24)
		const pendingValue = dv.getUint8(25) as I2CReadPending

		// todo spec does not say Ascii, but one can assume
		const rhmaj = String.fromCharCode(dv.getUint8(46))
		const rhmin = String.fromCharCode(dv.getUint8(47))
		const rfmaj = String.fromCharCode(dv.getUint8(48))
		const rfmin = String.fromCharCode(dv.getUint8(49))

		const ch0 = dv.getUint16(50, true)
		const ch1 = dv.getUint16(52, true)
		const ch2 = dv.getUint16(54, true)

		//
		const interruptEdgeDetectorState = interruptEdgeDetectorStateByte === 1

		const i2cCancelled = decodeI2CCancel(cancelTransferByte)

		const setSpeedRequested = setSpeedByte !== 0x00
		const setSpeedSuccessful = setSpeedByte === 0x20

		const i2cClock = setSpeedRequested ? speedDividerByte : undefined
		const i2cStateName = decodeI2CState(i2cState)
		const ACKed = isBitSet(ACKByte, 6) ? false : true

		//
		if (rhmaj !== 'A') { throw new Invalid('hardware major byte decoded', rhmaj) }
		if (rhmin !== '6') { throw new Invalid('hardware minor byte decoded', rhmin) }
		if (rfmaj !== '1') { throw new Invalid('firmware major byte decoded', rfmaj) }
		// if (!['1', '2'].includes(rfmin)) { console.log('invalid firmware minor byte decoded') }

		const revision = {
			hardware: { major: rhmaj, minor: rhmin },
			firmware: { major: rfmaj, minor: rfmin }
		}

		return {
			...response,

			i2cInitialized: unused21 !== 0,
			i2cConfused: (unused18 === 0x08) && (i2cState !== 0x45),

			i2cCancelled,

			setSpeedByte, speedDividerByte,
			setSpeedRequested,
			setSpeedSuccessful,
			i2cClock,

			i2cState, i2cStateName,

			i2c: {
				address,

				requestedTransferLength,
				transferredBytes,

				dataBufferCounter,
				communicationSpeedDivider,
				timeoutMs,

				SCL,
				SDA,
				ACKed,

				pendingValue
			},

			adc: {
				ch0,
				ch1,
				ch2
			},

			interruptEdgeDetectorState,

			revision
		}
	}
}

export class StatusParametersRequestCoder {
	static encode(req: StatusParametersRequest): ArrayBuffer {
		const { cancelI2c, i2cClock } = req ?? {}

		const shouldCancel = cancelI2c !== undefined && cancelI2c === true
		const shouldClock = i2cClock !== undefined

		const cancelValue = shouldCancel ? STATUS_I2C_CANCEL_FLAG : any_other(STATUS_I2C_CANCEL_FLAG)
		const setClockValue = shouldClock ? STATUS_SET_CLOCK_FLAG : any_other(STATUS_SET_CLOCK_FLAG)
		const clockValue = shouldClock ? encodeI2CDivider(i2cClock) : dont_care()

		const buffer = newReportBuffer()
		const dv = new DataView(buffer)

		dv.setUint8(0, STATUS_COMMAND)
		dv.setUint8(1, dont_care())
		dv.setUint8(2, cancelValue)
	  dv.setUint8(3, setClockValue)
		dv.setUint8(4, clockValue)

		return buffer
	}

	static decode(bufferSource: DecoderBufferSource): StatusParametersRequest { throw new Unused() }
}