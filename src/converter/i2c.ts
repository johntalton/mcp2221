import { I2CWriteDataRequest, I2CWriteDataRepeatedSTARTRequest, I2CWriteDataNoSTOPRequest, I2CReadDataRequest, I2CReadDataRepeatedSTARTRequest, I2CReadGetDataRequest } from '../messages/i2c.request'
import { I2CWriteDataResponse, I2CWriteDataRepeatedSTARTResponse, I2CWriteDataNoSTOPResponse, I2CReadDataResponse, I2CReadDataRepeatedSTARTResponse, I2CReadGetDataResponse } from '../messages/i2c.response'

export class I2CWriteData {
  static to(buffer: ArrayBuffer): I2CWriteDataResponse {
    throw new Error('no impl')
  }

  static from(req: I2CWriteDataRequest): ArrayBuffer {
    throw new Error('no impl')
  }
}

export class I2CWriteDataRepeatedSTART {
  static to(buffer: ArrayBuffer): I2CWriteDataRepeatedSTARTResponse {
    throw new Error('no impl')
  }

  static from(req: I2CWriteDataRepeatedSTARTRequest): ArrayBuffer {
    throw new Error('no impl')
  }
}

export class I2CWriteDataNoSTOP {
  static to(buffer: ArrayBuffer): I2CWriteDataNoSTOPResponse {
    throw new Error('no impl')
  }

  static from(req: I2CWriteDataNoSTOPRequest): ArrayBuffer {
    throw new Error('no impl')
  }
}


export class I2CReadData {
  static to(buffer: ArrayBuffer): I2CReadDataResponse {
    throw new Error('no impl')
  }

  static from(req: I2CReadDataRequest): ArrayBuffer {
    throw new Error('no impl')
  }
}

export class I2CReadDataRepeatedSTART {
  static to(buffer: ArrayBuffer): I2CReadDataRepeatedSTARTResponse {
    throw new Error('no impl')
  }

  static from(req: I2CReadDataRepeatedSTARTRequest): ArrayBuffer {
    throw new Error('no impl')
  }
}

export class I2CReadGetData {
  static to(buffer: ArrayBuffer): I2CReadGetDataResponse {
    throw new Error('no impl')
  }

  static from(req: I2CReadGetDataRequest): ArrayBuffer {
    throw new Error('no impl')
  }
}