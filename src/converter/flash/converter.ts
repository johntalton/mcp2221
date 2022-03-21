import { Converter } from '../converter.js'

import {
	WriteFlashDataRequest,
	SendFlashAccessPasswordRequest,
	ReadFlashDataRequest,
	ReadFlashDataChipSettingsRequest
} from '../../messages/flash.request.js'
import {
	WriteFlashDataResponse,
	SendFlashAccessPasswordResponse,
	ReadFlashDataChipSettingsResponse,
	ReadFlashDataFactorySerialNumberResponse,
	ReadFlashDataGPSettingsResponse,
	ReadFlashDataUSBManufacturerResponse,
	ReadFlashDataUSBProductResponse,
	ReadFlashDataUSBSerialNumberResponse,
	ReadFlashDataResponse
} from '../../messages/flash.response.js'

import { WriteFlashDataRequestCoder, WriteFlashDataResponseCoder } from './write.js'
import { SendFlashAccessPasswordRequestCoder, SendFlashAccessPasswordResponseCoder } from './send-access-password.js'
import { ReadFlashDataChipSettingsRequestCoder, ReadFlashDataChipSettingsResponseCoder } from './read-chip-settings.js'
import { ReadFlashDataFactorySerialNumberResponseCoder, ReadFlashDataFactorySerialNumberRequestCoder } from './read-factory-serial-number.js'
import { ReadFlashDataGPSettingsResponseCoder, ReadFlashDataGPSettingsRequestCoder } from './read-gp-settings.js'
import { ReadFlashDataUSBManufacturerResponseCoder, ReadFlashDataUSBManufacturerRequestCoder } from './read-manufacturer-desc.js'
import { ReadFlashDataUSBProductResponseCoder, ReadFlashDataUSBProductRequestCoder } from './read-product-desc.js'
import { ReadFlashDataUSBSerialNumberResponseCoder, ReadFlashDataUSBSerialNumberRequestCoder } from './read-serial-number-desc.js'

export const ReadFlashDataChipSettings: Converter<ReadFlashDataChipSettingsRequest, ReadFlashDataChipSettingsResponse> = {
	to: ReadFlashDataChipSettingsResponseCoder.decode,
	from: ReadFlashDataChipSettingsRequestCoder.encode
}

export const ReadFlashDataGPSettings: Converter<ReadFlashDataRequest, ReadFlashDataGPSettingsResponse> = {
	to: ReadFlashDataGPSettingsResponseCoder.decode,
	from: ReadFlashDataGPSettingsRequestCoder.encode
}

export const ReadFlashDataUSBManufacturer: Converter<ReadFlashDataRequest, ReadFlashDataUSBManufacturerResponse> = {
	to: ReadFlashDataUSBManufacturerResponseCoder.decode,
	from: ReadFlashDataUSBManufacturerRequestCoder.encode
}

export const ReadFlashDataUSBProduct: Converter<ReadFlashDataRequest, ReadFlashDataUSBProductResponse> = {
	to: ReadFlashDataUSBProductResponseCoder.decode,
	from: ReadFlashDataUSBProductRequestCoder.encode
}

export const ReadFlashDataUSBSerialNumber: Converter<ReadFlashDataRequest, ReadFlashDataUSBSerialNumberResponse> = {
	to: ReadFlashDataUSBSerialNumberResponseCoder.decode,
	from: ReadFlashDataUSBSerialNumberRequestCoder.encode
}

export const ReadFlashDataFactorySerialNumber: Converter<ReadFlashDataRequest, ReadFlashDataFactorySerialNumberResponse> = {
	to: ReadFlashDataFactorySerialNumberResponseCoder.decode,
	from: ReadFlashDataFactorySerialNumberRequestCoder.encode
}


export const WriteFlashData: Converter<WriteFlashDataRequest, WriteFlashDataResponse> = {
	to: WriteFlashDataResponseCoder.decode,
	from: WriteFlashDataRequestCoder.encode
}

export const SendFlashAccessPassword: Converter<SendFlashAccessPasswordRequest, SendFlashAccessPasswordResponse> = {
	to: SendFlashAccessPasswordResponseCoder.decode,
	from: SendFlashAccessPasswordRequestCoder.encode
}
