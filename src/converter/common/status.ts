import { StatusParametersRequest } from '../../messages/common.request.js'
import { StatusParametersResponse } from '../../messages/common.response.js'
import { DecoderBufferSource } from '../converter.js'

import { dont_care, any_other, STATUS_COMMAND, STATUS_I2C_CANCLE_FLAG, STATUS_SET_CLOCK_FLAG } from '../../messages/message.consts.js'

import { decodeStatusResponse, decodeI2CState, isBitSet } from '../decoders.js'
import { I2CReadPending } from '../../messages/message.fragments.js'
import { encodeI2CDivider, newReportBuffer } from '../encoders.js'
import { Invalid, Unused } from '../throw.js'


export class StatusParametersResponseCoder {
	static encode(_res: StatusParametersResponse): ArrayBuffer { throw new Unused() }

	static decode(bufferSource: DecoderBufferSource): StatusParametersResponse {
		const dv = ArrayBuffer.isView(bufferSource) ?
			new DataView(bufferSource.buffer, bufferSource.byteOffset, bufferSource.byteLength) :
			new DataView(bufferSource)

		const response = decodeStatusResponse(dv, STATUS_COMMAND) as StatusParametersResponse
		const { command, status, statusCode } = response
		if (statusCode !== 0) { return response }

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

		const ACKByte = dv.getUint8(20)
		const SCL = dv.getUint8(22)
		const SDA = dv.getUint8(23)

		const interruptEdgeDetectorStateByte = dv.getUint8(24)
		const pendingValue = dv.getUint8(25) as I2CReadPending

		const rhmaj = String.fromCharCode(dv.getUint8(46))
		const rhmin = String.fromCharCode(dv.getUint8(47))
		const rfmaj = String.fromCharCode(dv.getUint8(48))
		const rfmin = String.fromCharCode(dv.getUint8(49))

		const ch0 = dv.getUint16(50, true)
		const ch1 = dv.getUint16(52, true)
		const ch2 = dv.getUint16(54, true)

		//
		const interruptEdgeDetectorState = interruptEdgeDetectorStateByte === 1

		const i2cCancelled = cancelTransferByte !== 0x00

		const setSpeedRequested = setSpeedByte !== 0x00
		const setSpeedSuccessfull = setSpeedByte === 0x20

		const i2cClock = setSpeedSuccessfull ? speedDividerByte : undefined

		const i2cStateName = decodeI2CState(i2cState)
		//const newSpeed = setSpeedSet ? speedDividerByte : undefined
		//console.log('________', i2cClock)

		const ACKed = isBitSet(ACKByte, 6) ? false : true

		//
		if (rhmaj !== 'A') { throw new Invalid('hardware major byte decoded', rhmaj) }
		if (rhmin !== '6') { throw new Invalid('hardware minor byte decoded', rhmin) }
		if (rfmaj !== '1') { throw new Invalid('firmware major byte decoded', rfmaj) }
		if (!['1', '2'].includes(rfmin)) { console.log('invalid firmware minor byte decoded') }

		const revision = {
			hardware: { major: rhmaj, minor: rhmin },
			firmware: { major: rfmaj, minor: rfmin }
		}

		return {
			opaque: '__kinda_mostly_close__',
			command,
			status,
			statusCode,


			i2cCancelled,

			setSpeedByte, speedDividerByte,
			setSpeedRequested,
			setSpeedSuccessfull,
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

		const cancleValue = shouldCancel ? STATUS_I2C_CANCLE_FLAG : any_other(STATUS_I2C_CANCLE_FLAG)
		const setClockValue = shouldClock ? STATUS_SET_CLOCK_FLAG : any_other(STATUS_SET_CLOCK_FLAG)
		const clockValue = shouldClock ? encodeI2CDivider(i2cClock) : dont_care()

		const buffer = newReportBuffer()
		const dv = new DataView(buffer)

		dv.setUint8(0, STATUS_COMMAND)
		dv.setUint8(1, dont_care())
		dv.setUint8(2, cancleValue)
	  dv.setUint8(3, setClockValue)
		dv.setUint8(4, clockValue)

		// console.log(new Uint8Array(buffer))

		return buffer
	}

	static decode(bufferSource: DecoderBufferSource): StatusParametersRequest { throw new Unused() }
}