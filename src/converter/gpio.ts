import { SetGPIOOutputValuesRequest, GetGPIOValuesRequest } from '../messages/gpio.request'
import { SetGPIOOutputValuesResponse, GetGPIOValuesResponse } from '../messages/gpio.response'
import { Converter } from './converter'

export class SetGPIOOutputValuesResponseCoder {
  static encode(res: SetGPIOOutputValuesResponse): ArrayBuffer { throw new Error('unused') }
  static decode(buffer: ArrayBuffer): SetGPIOOutputValuesResponse {
    return {
      opaque: '__invalid__'
    }
  }
}

export class SetGPIOOutputValuesRequestCoder {
  static encode(res: SetGPIOOutputValuesRequest): ArrayBuffer {
    return Uint8ClampedArray.from([
      0x50,

    ])
  }
  static decode(buffer: ArrayBuffer): SetGPIOOutputValuesRequest { throw new Error('unused') }
}

export class GetGPIOValuesResponseCoder {
  static encode(res: GetGPIOValuesResponse): ArrayBuffer { throw new Error('unused') }
  static decode(buffer: ArrayBuffer): GetGPIOValuesResponse {
    return {
      opaque: '__invalid__'
    }

  }
}

export class GetGPIOValuesRequestCoder {
  static encode(res: GetGPIOValuesRequest): ArrayBuffer {
    return Uint8ClampedArray.from([
      0x51,

    ])
  }
  static decode(buffer: ArrayBuffer): GetGPIOValuesRequest { throw new Error('unused') }
}

export const SetGPIOOutputValues: Converter<SetGPIOOutputValuesRequest, SetGPIOOutputValuesResponse> ={
  to: SetGPIOOutputValuesResponseCoder.decode,
  from: SetGPIOOutputValuesRequestCoder.encode
}

export const GetGPIOValues: Converter<GetGPIOValuesRequest, GetGPIOValuesResponse> = {
  to: GetGPIOValuesResponseCoder.decode,
  from: GetGPIOValuesRequestCoder.encode
}