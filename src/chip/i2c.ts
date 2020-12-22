import { I2C, Binding } from '../'

import { I2CWriteDataRequest, I2CWriteDataRepeatedSTARTRequest, I2CWriteDataNoSTOPRequest, I2CReadDataRequest, I2CReadDataRepeatedSTARTRequest, I2CReadGetDataRequest } from '../messages/i2c.request'
import { I2CWriteDataResponse, I2CWriteDataRepeatedSTARTResponse, I2CWriteDataNoSTOPResponse, I2CReadDataResponse, I2CReadDataRepeatedSTARTResponse, I2CReadGetDataResponse } from '../messages/i2c.response'

import {
  I2CWriteData, I2CWriteDataRepeatedSTART, I2CWriteDataNoSTOP,
  I2CReadData, I2CReadDataRepeatedSTART, I2CReadGetData
} from '../converter/i2c'

import send_request from './util'

export class MCP2221I2C implements I2C {
  private readonly _binding: Binding

  constructor(binding: Binding) { this._binding = binding }

  writeData(req: I2CWriteDataRequest): Promise<I2CWriteDataResponse> {
    return send_request(this._binding, req, I2CWriteData)
  }

  writeRepeatedSTART(req: I2CWriteDataRepeatedSTARTRequest): Promise<I2CWriteDataRepeatedSTARTResponse> {
    return send_request(this._binding, req, I2CWriteDataRepeatedSTART)
  }

  writeNoSTOP(req: I2CWriteDataNoSTOPRequest): Promise<I2CWriteDataNoSTOPResponse> {
    return send_request(this._binding, req, I2CWriteDataNoSTOP)
  }

  readData(req: I2CReadDataRequest): Promise<I2CReadDataResponse> {
    return send_request(this._binding, req, I2CReadData)
  }

  readRepeatedSTART(req: I2CReadDataRepeatedSTARTRequest): Promise<I2CReadDataRepeatedSTARTResponse> {
    return send_request(this._binding, req, I2CReadDataRepeatedSTART)
  }

  readGetData(req: I2CReadGetDataRequest): Promise<I2CReadGetDataResponse> {
    return send_request(this._binding, req, I2CReadGetData)
  }
}
