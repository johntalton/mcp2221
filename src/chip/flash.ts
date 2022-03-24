import { Flash } from '../interface/flash.js'

import { Bindable } from '../binding.js'

import { ReadFlashDataRequest, WriteFlashDataRequest, SendFlashAccessPasswordRequest, ReadFlashDataChipSettingsRequest, ReadFlashDataGPSettingsRequest, ReadFlashDataFactorySerialNumberRequest, ReadFlashDataUSBManufacturerRequest, ReadFlashDataUSBProductRequest, ReadFlashDataUSBSerialNumberRequest, WriteFlashDataChipSettingsRequest, WriteFlashDataGPSettingsRequest, WriteFlashDataUSBManufacturerRequest, WriteFlashDataUSBProductRequest, WriteFlashDataUSBSerialNumberRequest } from '../messages/flash.request.js'
import { ReadFlashDataResponse, WriteFlashDataResponse, SendFlashAccessPasswordResponse, ReadFlashDataChipSettingsResponse, ReadFlashDataGPSettingsResponse, ReadFlashDataFactorySerialNumberResponse, ReadFlashDataUSBManufacturerResponse, ReadFlashDataUSBProductResponse, ReadFlashDataUSBSerialNumberResponse } from '../messages/flash.response.js'

import {
	ReadFlashDataChipSettings, ReadFlashDataGPSettings,
	ReadFlashDataUSBManufacturer, ReadFlashDataUSBProduct, ReadFlashDataUSBSerialNumber,
	ReadFlashDataFactorySerialNumber,
	SendFlashAccessPassword,
	WriteFlashDataChipSettings,
	WriteFlashDataGPSettings,
	WriteFlashDataUSBManufacturer,
	WriteFlashDataUSBProduct,
	WriteFlashDataUSBSerialNumber
} from '../converter/flash/flash.js'

import send_request from './util.js'
import { Invalid, Unknown } from '../converter/throw.js'

function isReadSubCommand<D extends ReadFlashDataRequest>(subCommand: number, req: ReadFlashDataRequest): req is D {
	return req.subCommand === subCommand
}

function isWriteSubCommand<D extends WriteFlashDataRequest>(subCommand: number, req: WriteFlashDataRequest): req is D {
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

	// ofical interface
	async read(req: ReadFlashDataRequest): Promise<ReadFlashDataResponse> {
		const { subCommand } = req

		if (isReadSubCommand<ReadFlashDataChipSettingsRequest>(0x00, req)) { return this.readChipSettings(req) }
		if (isReadSubCommand<ReadFlashDataGPSettingsRequest>(0x01, req)) { return this.readGPSettings(req) }
		if (isReadSubCommand<ReadFlashDataUSBManufacturerRequest>(0x02, req)) { return this.readUSBManufacturer(req) }
		if (isReadSubCommand<ReadFlashDataUSBProductRequest>(0x03, req)) { return this.readUSBProduct(req) }
		if (isReadSubCommand<ReadFlashDataUSBSerialNumberRequest>(0x04, req)) { return this.readUSBSerialNumber(req) }
		if (isReadSubCommand<ReadFlashDataFactorySerialNumberRequest>(0x05, req)) { return this.readFactorySerialNumber(req) }

		throw new Unknown('subCommand', subCommand)
	}

	async writeChipSettings(req: WriteFlashDataChipSettingsRequest): Promise<WriteFlashDataResponse> {
		return send_request(this.binding, req, WriteFlashDataChipSettings)
	}

	async writeGPSettings(req: WriteFlashDataGPSettingsRequest): Promise<WriteFlashDataResponse> {
		return send_request(this.binding, req, WriteFlashDataGPSettings)
	}

	async writeUSBManufacturer(req: WriteFlashDataUSBManufacturerRequest): Promise<WriteFlashDataResponse> {
		return send_request(this.binding, req, WriteFlashDataUSBManufacturer)
	}

	async writeUSBProduct(req: WriteFlashDataUSBProductRequest): Promise<WriteFlashDataResponse> {
		return send_request(this.binding, req, WriteFlashDataUSBProduct)
	}

	async writeUSBSerialNumber(req: WriteFlashDataUSBSerialNumberRequest): Promise<WriteFlashDataResponse> {
		return send_request(this.binding, req, WriteFlashDataUSBSerialNumber)
	}

	// offical interface
	async write(req: WriteFlashDataRequest): Promise<WriteFlashDataResponse> {
		const { subCommand } = req

		if (isWriteSubCommand<WriteFlashDataChipSettingsRequest>(0x00, req)) { return this.writeChipSettings(req) }
		if (isWriteSubCommand<WriteFlashDataGPSettingsRequest>(0x01, req)) { return this.writeGPSettings(req) }
		if (isWriteSubCommand<WriteFlashDataUSBManufacturerRequest>(0x02, req)) { return this.writeUSBManufacturer(req) }
		if (isWriteSubCommand<WriteFlashDataUSBProductRequest>(0x03, req)) { return this.writeUSBProduct(req) }
		if (isWriteSubCommand<WriteFlashDataUSBSerialNumberRequest>(0x04, req)) { return this.writeUSBSerialNumber(req) }
		if (isWriteSubCommand(0x05, req)) { throw new Invalid('writing factory sn not allowed', subCommand) }

		throw new Unknown('subCommand', subCommand)
	}

	async sendPassword(req: SendFlashAccessPasswordRequest): Promise<SendFlashAccessPasswordResponse> {
		return send_request(this.binding, req, SendFlashAccessPassword)
	}
}
