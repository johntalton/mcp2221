import { I2C} from '../'
import { I2CWriteDataRequest, I2CWriteDataRepeatedSTARTRequest, I2CWriteDataNoSTOPRequest, I2CReadDataRequest, I2CReadDataRepeatedSTARTRequest, I2CReadGetDataRequest } from '../messages/i2c.request'
import { I2CWriteDataResponse, I2CWriteDataRepeatedSTARTResponse, I2CWriteDataNoSTOPResponse, I2CReadDataResponse, I2CReadDataRepeatedSTARTResponse, I2CReadGetDataResponse } from '../messages/i2c.response'

export class MCP2221I2C<T> implements I2C {
  private readonly _hid: T

  constructor(hid: T) { this._hid = hid }

  writeData(req: I2CWriteDataRequest): Promise<I2CWriteDataResponse> {
    const { opaque } = req
    throw new Error('Method not implemented.' + opaque)
  }

  writeRepeatedSTART(req: I2CWriteDataRepeatedSTARTRequest): Promise<I2CWriteDataRepeatedSTARTResponse> {
    const { opaque } = req
    throw new Error('Method not implemented.' + opaque)
  }

  writeNoSTOP(req: I2CWriteDataNoSTOPRequest): Promise<I2CWriteDataNoSTOPResponse> {
    const { opaque } = req
    throw new Error('Method not implemented.' + opaque)
  }

  readData(req: I2CReadDataRequest): Promise<I2CReadDataResponse> {
    const { opaque } = req
    throw new Error('Method not implemented.' + opaque)
  }

  readRepeatedSTART(req: I2CReadDataRepeatedSTARTRequest): Promise<I2CReadDataRepeatedSTARTResponse> {
    const { opaque } = req
    throw new Error('Method not implemented.' + opaque)
  }

  readGetData(req: I2CReadGetDataRequest): Promise<I2CReadGetDataResponse> {
    const { opaque } = req
    throw new Error('Method not implemented.' + opaque)
  }
}
