import { Converter } from '../converter.js'

import {
	SendFlashAccessPasswordRequest,
	ReadFlashDataRequest,
	ReadFlashDataChipSettingsRequest,
	WriteFlashDataChipSettingsRequest,
	WriteFlashDataGPSettingsRequest,
	WriteFlashDataUSBManufacturerRequest,
	WriteFlashDataUSBProductRequest,
	WriteFlashDataUSBSerialNumberRequest
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
} from '../../messages/flash.response.js'

import { SendFlashAccessPasswordRequestCoder, SendFlashAccessPasswordResponseCoder } from './send-access-password.js'
import { ReadFlashDataChipSettingsRequestCoder, ReadFlashDataChipSettingsResponseCoder } from './read-chip-settings.js'
import { ReadFlashDataFactorySerialNumberResponseCoder, ReadFlashDataFactorySerialNumberRequestCoder } from './read-factory-serial-number.js'
import { ReadFlashDataGPSettingsResponseCoder, ReadFlashDataGPSettingsRequestCoder } from './read-gp-settings.js'
import { ReadFlashDataUSBManufacturerResponseCoder, ReadFlashDataUSBManufacturerRequestCoder } from './read-manufacturer-desc.js'
import { ReadFlashDataUSBProductResponseCoder, ReadFlashDataUSBProductRequestCoder } from './read-product-desc.js'
import { ReadFlashDataUSBSerialNumberResponseCoder, ReadFlashDataUSBSerialNumberRequestCoder } from './read-serial-number-desc.js'
import { WriteFlashDataChipSettingsResponseCoder, WriteFlashDataChipSettingsRequestCoder } from './write-chip-settings.js'
import { WriteFlashDataGPSettingsResponseCoder, WriteFlashDataGPSettingsRequestCoder } from './write-gp-settings.js'
import { WriteFlashDataUSBManufacturerResponseCoder, WriteFlashDataUSBManufacturerRequestCoder } from './write-manufacturer-desc.js'
import { WriteFlashDataUSBProductResponseCoder, WriteFlashDataUSBProductRequestCoder } from './write-product-desc.js'
import { WriteFlashDataUSBSerialNumberResponseCoder, WriteFlashDataUSBSerialNumberRequestCoder } from './write-serial-number-desc.js'

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

//
export const WriteFlashDataChipSettings: Converter<WriteFlashDataChipSettingsRequest, WriteFlashDataResponse> = {
	to: WriteFlashDataChipSettingsResponseCoder.decode,
	from: WriteFlashDataChipSettingsRequestCoder.encode
}

export const WriteFlashDataGPSettings: Converter<WriteFlashDataGPSettingsRequest, WriteFlashDataResponse> = {
	to: WriteFlashDataGPSettingsResponseCoder.decode,
	from: WriteFlashDataGPSettingsRequestCoder.encode
}

export const WriteFlashDataUSBManufacturer: Converter<WriteFlashDataUSBManufacturerRequest, WriteFlashDataResponse> = {
	to: WriteFlashDataUSBManufacturerResponseCoder.decode,
	from: WriteFlashDataUSBManufacturerRequestCoder.encode
}

export const WriteFlashDataUSBProduct: Converter<WriteFlashDataUSBProductRequest, WriteFlashDataResponse> = {
	to: WriteFlashDataUSBProductResponseCoder.decode,
	from: WriteFlashDataUSBProductRequestCoder.encode
}

export const WriteFlashDataUSBSerialNumber: Converter<WriteFlashDataUSBSerialNumberRequest, WriteFlashDataResponse> = {
	to: WriteFlashDataUSBSerialNumberResponseCoder.decode,
	from: WriteFlashDataUSBSerialNumberRequestCoder.encode
}


//
export const SendFlashAccessPassword: Converter<SendFlashAccessPasswordRequest, SendFlashAccessPasswordResponse> = {
	to: SendFlashAccessPasswordResponseCoder.decode,
	from: SendFlashAccessPasswordRequestCoder.encode
}
