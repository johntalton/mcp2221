import { Converter } from '../converter.js'

import { ReadFlashDataRequest, WriteFlashDataRequest, SendFlashAccessPasswordRequest } from '../../messages/flash.request.js'
import { ReadFlashDataResponse, WriteFlashDataResponse, SendFlashAccessPasswordResponse } from '../../messages/flash.response.js'

import { ReadFlashDataRequestCoder, ReadFlashDataResponseCoder } from './read-flash-data.js'
import { WriteFlashDataRequestCoder, WriteFlashDataResponseCoder } from './write-flash-data.js'
import { SendFlashAccessPasswordRequestCoder, SendFlashAccessPasswordResponseCoder } from './send-flash-access-password.js'

export const ReadFlashData: Converter<ReadFlashDataRequest, ReadFlashDataResponse> = {
	to: ReadFlashDataResponseCoder.decode,
	from: ReadFlashDataRequestCoder.encode
}

export const WriteFlashData: Converter<WriteFlashDataRequest, WriteFlashDataResponse> = {
	to: WriteFlashDataResponseCoder.decode,
	from: WriteFlashDataRequestCoder.encode
}

export const SendFlashAccessPassword: Converter<SendFlashAccessPasswordRequest, SendFlashAccessPasswordResponse> = {
	to: SendFlashAccessPasswordResponseCoder.decode,
	from: SendFlashAccessPasswordRequestCoder.encode
}
