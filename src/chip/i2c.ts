import { I2C } from '../interface/i2c.js'

import { Bindable } from '../binding.js'

import { I2CWriteDataRequest, I2CWriteDataRepeatedSTARTRequest, I2CWriteDataNoSTOPRequest, I2CReadDataRequest, I2CReadDataRepeatedSTARTRequest, I2CReadGetDataRequest } from '../messages/i2c.request'
import { I2CWriteDataResponse, I2CWriteDataRepeatedSTARTResponse, I2CWriteDataNoSTOPResponse, I2CReadDataResponse, I2CReadDataRepeatedSTARTResponse, I2CReadGetDataResponse } from '../messages/i2c.response'

import {
  I2CWriteData, I2CWriteDataRepeatedSTART, I2CWriteDataNoSTOP,
  I2CReadData, I2CReadDataRepeatedSTART, I2CReadGetData
} from '../converter/i2c/i2c.js'

import send_request from './util.js'

export class MCP2221I2C extends Bindable implements I2C {
  async writeData(req: I2CWriteDataRequest): Promise<I2CWriteDataResponse> {
    return send_request(this.binding, req, I2CWriteData)
  }

  async writeRepeatedSTART(req: I2CWriteDataRepeatedSTARTRequest): Promise<I2CWriteDataRepeatedSTARTResponse> {
    return send_request(this.binding, req, I2CWriteDataRepeatedSTART)
  }

  async writeNoSTOP(req: I2CWriteDataNoSTOPRequest): Promise<I2CWriteDataNoSTOPResponse> {
    return send_request(this.binding, req, I2CWriteDataNoSTOP)
  }

  async readData(req: I2CReadDataRequest): Promise<I2CReadDataResponse> {
    return send_request(this.binding, req, I2CReadData)
  }

  async readRepeatedSTART(req: I2CReadDataRepeatedSTARTRequest): Promise<I2CReadDataRepeatedSTARTResponse> {
    return send_request(this.binding, req, I2CReadDataRepeatedSTART)
  }

  async readGetData(req: I2CReadGetDataRequest): Promise<I2CReadGetDataResponse> {
    return send_request(this.binding, req, I2CReadGetData)
  }
}
