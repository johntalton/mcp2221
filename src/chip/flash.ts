import { Flash } from '../interface/flash.js'

import { Bindable } from '../binding.js'

import { ReadFlashDataRequest, WriteFlashDataRequest, SendFlashAccessPasswordRequest, ReadFlashDataChipSettingsRequest, ReadFlashDataGPSettingsRequest, ReadFlashDataFactorySerialNumberRequest, ReadFlashDataUSBManufacturerRequest, ReadFlashDataUSBProductRequest, ReadFlashDataUSBSerialNumberRequest } from '../messages/flash.request.js'
import { ReadFlashDataResponse, WriteFlashDataResponse, SendFlashAccessPasswordResponse, ReadFlashDataChipSettingsResponse, ReadFlashDataGPSettingsResponse, ReadFlashDataFactorySerialNumberResponse, ReadFlashDataUSBManufacturerResponse, ReadFlashDataUSBProductResponse, ReadFlashDataUSBSerialNumberResponse } from '../messages/flash.response.js'

import {
	ReadFlashDataChipSettings, ReadFlashDataGPSettings,
	ReadFlashDataUSBManufacturer, ReadFlashDataUSBProduct, ReadFlashDataUSBSerialNumber,
	ReadFlashDataFactorySerialNumber,
	SendFlashAccessPassword, WriteFlashData
} from '../converter/flash/flash.js'

import send_request from './util.js'
import { write } from 'fs'

function isSubCommand<D extends ReadFlashDataRequest>(subCommand: number, req: ReadFlashDataRequest): req is D {
	return req.subCommand === subCommand
}

export class MCP2221Flash extends Bindable implements Flash {
	async readChipSettings(req: ReadFlashDataChipSettingsRequest): Promise<ReadFlashDataChipSettingsResponse> {
		return send_request(this.binding, req, ReadFlashDataChipSettings)
	}

	async readGPSettings(req: ReadFlashDataGPSettingsRequest): Promise<ReadFlashDataGPSettingsResponse> {
		return send_request(this.binding, req, ReadFlashDataGPSettings)
	}

	async readUSBManufacturer(req: ReadFlashDataUSBManufacturerRequest): Promise<ReadFlashDataUSBManufacturerResponse> {
		return send_request(this.binding, req, ReadFlashDataUSBManufacturer)
	}

	async readUSBProduct(req: ReadFlashDataUSBProductRequest): Promise<ReadFlashDataUSBProductResponse> {
		return send_request(this.binding, req, ReadFlashDataUSBProduct)
	}

	async readUSBSerialNumber(req: ReadFlashDataUSBSerialNumberRequest): Promise<ReadFlashDataUSBSerialNumberResponse> {
		return send_request(this.binding, req, ReadFlashDataUSBSerialNumber)
	}

	async readFactorySerialNumber(req: ReadFlashDataFactorySerialNumberRequest): Promise<ReadFlashDataFactorySerialNumberResponse> {
		return send_request(this.binding, req, ReadFlashDataFactorySerialNumber)
	}

	async read(req: ReadFlashDataRequest): Promise<ReadFlashDataResponse> {
		const { subCommand } = req

		if (isSubCommand<ReadFlashDataChipSettingsRequest>(0x00, req)) { return this.readChipSettings(req) }
		if (isSubCommand<ReadFlashDataGPSettingsRequest>(0x01, req)) { return this.readGPSettings(req) }
		if (isSubCommand<ReadFlashDataUSBManufacturerRequest>(0x02, req)) { return this.readUSBManufacturer(req) }
		if (isSubCommand<ReadFlashDataUSBProductRequest>(0x03, req)) { return this.readUSBProduct(req) }
		if (isSubCommand<ReadFlashDataUSBSerialNumberRequest>(0x04, req)) { return this.readUSBSerialNumber(req) }
		if (isSubCommand<ReadFlashDataFactorySerialNumberRequest>(0x05, req)) { return this.readFactorySerialNumber(req) }

		throw new Error('unknown subCommand')
	}

	async write(req: WriteFlashDataRequest): Promise<WriteFlashDataResponse> {
		return send_request(this.binding, req, WriteFlashData)
	}

	async sendPassword(req: SendFlashAccessPasswordRequest): Promise<SendFlashAccessPasswordResponse> {
		return send_request(this.binding, req, SendFlashAccessPassword)
	}
}
