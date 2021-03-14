import {
  I2CWriteDataRequest, I2CWriteDataRepeatedSTARTRequest, I2CWriteDataNoSTOPRequest,
  I2CReadDataRequest, I2CReadDataRepeatedSTARTRequest, I2CReadGetDataRequest
} from '../messages/i2c.request.js'
import {
  I2CWriteDataResponse, I2CWriteDataRepeatedSTARTResponse, I2CWriteDataNoSTOPResponse,
  I2CReadDataResponse, I2CReadDataRepeatedSTARTResponse, I2CReadGetDataResponse
} from '../messages/i2c.response.js'

export interface I2C {
  writeData(req: I2CWriteDataRequest): Promise<I2CWriteDataResponse>
  writeRepeatedSTART(req: I2CWriteDataRepeatedSTARTRequest): Promise<I2CWriteDataRepeatedSTARTResponse>
  writeNoSTOP(req: I2CWriteDataNoSTOPRequest): Promise<I2CWriteDataNoSTOPResponse>

  readData(req: I2CReadDataRequest): Promise<I2CReadDataResponse>
  readRepeatedSTART(req: I2CReadDataRepeatedSTARTRequest): Promise<I2CReadDataRepeatedSTARTResponse>
  readGetData(req: I2CReadGetDataRequest): Promise<I2CReadGetDataResponse>
}
