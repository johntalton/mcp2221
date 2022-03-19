/* eslint-disable max-classes-per-file */
import { SetGPIOOutputValuesRequest, GetGPIOValuesRequest } from '../../messages/gpio.request.js'
import { SetGPIOOutputValuesResponse, GetGPIOValuesResponse } from '../../messages/gpio.response.js'
import { Converter, DecoderBufferSource } from '../converter.js'

import { decodeStatusResponse } from '../_.js'

export class SetGPIOOutputValuesResponseCoder {
  static encode(res: SetGPIOOutputValuesResponse): ArrayBuffer { throw new Error('unused') }
  static decode(bufferSource: DecoderBufferSource): SetGPIOOutputValuesResponse {
    const dv = ArrayBuffer.isView(bufferSource) ?
      new DataView(bufferSource.buffer, bufferSource.byteOffset, bufferSource.byteLength) :
      new DataView(bufferSource)

    const { command, status, statusCode } = decodeStatusResponse(dv, 0x50) as SetGPIOOutputValuesResponse

    throw new Error(' un implemented :( ')
  }
}

export class SetGPIOOutputValuesRequestCoder {
  static encode(res: SetGPIOOutputValuesRequest): ArrayBuffer {
    return Uint8ClampedArray.from([
      0x50,

    ])
  }
  static decode(bufferSource: DecoderBufferSource): SetGPIOOutputValuesRequest { throw new Error('unused') }
}

export class GetGPIOValuesResponseCoder {
  static encode(res: GetGPIOValuesResponse): ArrayBuffer { throw new Error('unused') }
  static decode(bufferSource: DecoderBufferSource): GetGPIOValuesResponse {
    const dv = ArrayBuffer.isView(bufferSource) ?
      new DataView(bufferSource.buffer, bufferSource.byteOffset, bufferSource.byteLength) :
      new DataView(bufferSource)

    const { command, status, statusCode } = decodeStatusResponse(dv, 0x51) as GetGPIOValuesResponse

    throw new Error(' no impl yet :(')
  }
}

export class GetGPIOValuesRequestCoder {
  static encode(res: GetGPIOValuesRequest): ArrayBuffer {
    return Uint8ClampedArray.from([
      0x51,

    ])
  }
  static decode(bufferSource: DecoderBufferSource): GetGPIOValuesRequest { throw new Error('unused') }
}

export const SetGPIOOutputValues: Converter<SetGPIOOutputValuesRequest, SetGPIOOutputValuesResponse> ={
  to: SetGPIOOutputValuesResponseCoder.decode,
  from: SetGPIOOutputValuesRequestCoder.encode
}

export const GetGPIOValues: Converter<GetGPIOValuesRequest, GetGPIOValuesResponse> = {
  to: GetGPIOValuesResponseCoder.decode,
  from: GetGPIOValuesRequestCoder.encode
}