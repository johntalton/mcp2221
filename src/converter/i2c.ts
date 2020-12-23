import { I2CWriteDataRequest, I2CWriteDataRepeatedSTARTRequest, I2CWriteDataNoSTOPRequest, I2CReadDataRequest, I2CReadDataRepeatedSTARTRequest, I2CReadGetDataRequest } from '../messages/i2c.request'
import { I2CWriteDataResponse, I2CWriteDataRepeatedSTARTResponse, I2CWriteDataNoSTOPResponse, I2CReadDataResponse, I2CReadDataRepeatedSTARTResponse, I2CReadGetDataResponse } from '../messages/i2c.response'
import { Converter } from './converter'

export class I2CWriteDataResponseCoder {
  static encode(msg: I2CWriteDataResponse): ArrayBuffer { throw new Error('unused') }
  static decode(buffer: ArrayBuffer): I2CWriteDataResponse {
    return {
      opaque: '__invalid__'
    }
  }
}

export class I2CWriteDataRequestCoder {
  static encode(msg: I2CWriteDataRequest): ArrayBuffer {
    return Uint8ClampedArray.from([
      0x90,

    ])
  }
  static decode(buffer: ArrayBuffer): I2CWriteDataRequest { throw new Error('unused') }
}

export class I2CWriteDataRepeatedSTARTResponseCoder {
  static encode(msg: I2CWriteDataRepeatedSTARTResponse): ArrayBuffer { throw new Error('unused') }
  static decode(buffer: ArrayBuffer): I2CWriteDataRepeatedSTARTResponse {
    return {
      opaque: '__invalid__'
    }
  }
}

export class I2CWriteDataRepeatedSTARTRequestCoder {
  static encode(msg: I2CWriteDataRepeatedSTARTRequest): ArrayBuffer {
    return Uint8ClampedArray.from([
      0x92,

    ])
  }
  static decode(buffer: ArrayBuffer): I2CWriteDataRepeatedSTARTRequest { throw new Error('unused') }
}

export class I2CWriteDataNoSTOPResponseCoder {
  static encode(msg: I2CWriteDataNoSTOPResponse): ArrayBuffer { throw new Error('unused') }
  static decode(buffer: ArrayBuffer): I2CWriteDataNoSTOPResponse {
    return {
      opaque: '__invalid__'
    }
  }
}

export class I2CWriteDataNoSTOPRequestCoder {
  static encode(msg: I2CWriteDataNoSTOPRequest): ArrayBuffer {
    return Uint8ClampedArray.from([
      0x94,

    ])
  }
  static decode(buffer: ArrayBuffer): I2CWriteDataNoSTOPRequest { throw new Error('unused') }
}

export class I2CReadDataResponseCoder {
  static encode(msg: I2CReadDataResponse): ArrayBuffer { throw new Error('unused') }
  static decode(buffer: ArrayBuffer): I2CReadDataResponse {
    return {
      opaque: '__invalid__'
    }
  }
}

export class I2CReadDataRequestCoder {
  static encode(msg: I2CReadDataRequest): ArrayBuffer {
    return Uint8ClampedArray.from([
      0x91,

    ])
  }
  static decode(buffer: ArrayBuffer): I2CReadDataRequest { throw new Error('unused') }
}

export class I2CReadDataRepeatedSTARTResponseCoder {
  static encode(msg: I2CReadDataRepeatedSTARTResponse): ArrayBuffer { throw new Error('unused') }
  static decode(buffer: ArrayBuffer): I2CReadDataRepeatedSTARTResponse{
    return {
      opaque: '__invalid__'
    }
  }
}

export class I2CReadDataRepeatedSTARTRequestCoder {
  static encode(msg: I2CReadDataRepeatedSTARTRequest): ArrayBuffer {
    return Uint8ClampedArray.from([
      0x93,

    ])
  }
  static decode(buffer: ArrayBuffer): I2CReadDataRepeatedSTARTRequest { throw new Error('unused') }
}

export class I2CReadGetDataResponseCoder {
  static encode(msg: I2CReadGetDataResponse): ArrayBuffer { throw new Error('unused') }
  static decode(buffer: ArrayBuffer): I2CReadGetDataResponse {
    return {
      opaque: '__invalid__'
    }
  }
}

export class I2CReadGetDataRequestCoder {
  static encode(msg: I2CReadGetDataRequest): ArrayBuffer {
    return Uint8ClampedArray.from([
      0x40,

    ])
  }
  static decode(buffer: ArrayBuffer): I2CReadGetDataRequest { throw new Error('unused') }
}


export const I2CWriteData: Converter<I2CWriteDataRequest, I2CWriteDataResponse> = {
  to: I2CWriteDataResponseCoder.decode,
  from: I2CWriteDataRequestCoder.encode
}

export const I2CWriteDataRepeatedSTART: Converter<I2CWriteDataRepeatedSTARTRequest, I2CWriteDataRepeatedSTARTResponse> = {
  to: I2CWriteDataRepeatedSTARTResponseCoder.decode,
  from: I2CWriteDataRepeatedSTARTRequestCoder.encode
}

export const I2CWriteDataNoSTOP: Converter<I2CWriteDataNoSTOPRequest, I2CWriteDataNoSTOPResponse> = {
  to: I2CWriteDataNoSTOPResponseCoder.decode,
  from: I2CWriteDataNoSTOPRequestCoder.encode
}


export const I2CReadData: Converter<I2CReadDataRequest, I2CReadDataResponse> = {
  to: I2CReadDataResponseCoder.decode,
  from: I2CReadDataRequestCoder.encode
}

export const I2CReadDataRepeatedSTART: Converter<I2CReadDataRepeatedSTARTRequest, I2CReadDataRepeatedSTARTResponse> = {
  to: I2CReadDataRepeatedSTARTResponseCoder.decode,
  from: I2CReadDataRepeatedSTARTRequestCoder.encode
}

export const I2CReadGetData: Converter<I2CReadGetDataRequest, I2CReadGetDataResponse> = {
  to: I2CReadGetDataResponseCoder.decode,
  from: I2CReadGetDataRequestCoder.encode
}