import { SetSRAMSettingsRequest, GetSRAMSettingsRequest } from '../messages/sram.request'
import { SetSRAMSettingsResponse, GetSRAMSettingsResponse } from '../messages/sram.response'
import { Converter } from './converter'

export class SetSRAMSettingsResponseCoder {
  static encode(msg: SetSRAMSettingsResponse): ArrayBuffer { throw new Error('unused') }
  static decode(buffer: ArrayBuffer): SetSRAMSettingsResponse {
    return {
      opaque: '__invalid__'
    }
  }
}

export class SetSRAMSettingsRequestCoder {
  static encode(msg: SetSRAMSettingsRequestCoder): ArrayBuffer {
    return Uint8ClampedArray.from([
      0x60,

    ])
  }
  static decode(buffer: ArrayBuffer): SetSRAMSettingsRequest { throw new Error('unused') }
}

export class GetSRAMSettingsResponseCoder {
  static encode(msg: GetSRAMSettingsResponse): ArrayBuffer { throw new Error('unused') }
  static decode(buffer: ArrayBuffer): GetSRAMSettingsResponse {
    return {
      opaque: '__invalid__'
    }
  }
}

export class GetSRAMSettingsRequestCoder {
  static encode(msg: GetSRAMSettingsRequest): ArrayBuffer {
    return Uint8ClampedArray.from([
      0x61,

    ])
  }
  static decode(buffer: ArrayBuffer): GetSRAMSettingsRequest { throw new Error('unused') }
}


export const SetSRAMSettings: Converter<SetSRAMSettingsRequest, SetSRAMSettingsResponse> = {
  to: SetSRAMSettingsResponseCoder.decode,
  from: SetSRAMSettingsRequestCoder.encode
}

export const GetSRAMSettings: Converter<GetSRAMSettingsRequest, GetSRAMSettingsResponse> = {
  to: GetSRAMSettingsResponseCoder.decode,
  from: GetSRAMSettingsRequestCoder.encode
}