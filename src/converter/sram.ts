import { SetSRAMSettingsRequest, GetSRAMSettingsRequest } from '../messages/sram.request.js'
import { SetSRAMSettingsResponse, GetSRAMSettingsResponse } from '../messages/sram.response.js'
import { Converter, DecoderBufferSource } from './converter.js'

export class SetSRAMSettingsResponseCoder {
  static encode(msg: SetSRAMSettingsResponse): ArrayBuffer { throw new Error('unused') }
  static decode(bufferSource: DecoderBufferSource): SetSRAMSettingsResponse {
    throw new Error('invalid')
  }
}

export class SetSRAMSettingsRequestCoder {
  static encode(msg: SetSRAMSettingsRequestCoder): ArrayBuffer {
    return Uint8ClampedArray.from([
      0x60,

    ])
  }
  static decode(buffefSource: DecoderBufferSource): SetSRAMSettingsRequest { throw new Error('unused') }
}

export class GetSRAMSettingsResponseCoder {
  static encode(msg: GetSRAMSettingsResponse): ArrayBuffer { throw new Error('unused') }
  static decode(bufferSource: DecoderBufferSource): GetSRAMSettingsResponse {
    throw new Error('invalid')
  }
}

export class GetSRAMSettingsRequestCoder {
  static encode(msg: GetSRAMSettingsRequest): ArrayBuffer {
    return Uint8ClampedArray.from([
      0x61,

    ])
  }
  static decode(bufferSource: DecoderBufferSource): GetSRAMSettingsRequest { throw new Error('unused') }
}


export const SetSRAMSettings: Converter<SetSRAMSettingsRequest, SetSRAMSettingsResponse> = {
  to: SetSRAMSettingsResponseCoder.decode,
  from: SetSRAMSettingsRequestCoder.encode
}

export const GetSRAMSettings: Converter<GetSRAMSettingsRequest, GetSRAMSettingsResponse> = {
  to: GetSRAMSettingsResponseCoder.decode,
  from: GetSRAMSettingsRequestCoder.encode
}
