import { SetGPIOOutputValuesRequest, GetGPIOValuesRequest } from '../messages/gpio.request'
import { SetGPIOOutputValuesResponse, GetGPIOValueResponse } from '../messages/gpio.response'

export class SetGPIOOutputValues {
  static to(buffer: ArrayBuffer): SetGPIOOutputValuesResponse {
    throw new Error('no impl')
  }

  static from(req: SetGPIOOutputValuesRequest): ArrayBuffer {
    throw new Error('no impl')
  }
}

export class GetGPIOValues {
  static to(buffer: ArrayBuffer): GetGPIOValueResponse {
    throw new Error('no impl')
  }

  static from(req: GetGPIOValuesRequest): ArrayBuffer {
    throw new Error('no impl')
  }
}