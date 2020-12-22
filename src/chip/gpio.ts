import { Gpio } from '../'
import { SetGPIOOutputValuesRequest, GetGPIOValuesRequest } from '../messages/gpio.request'
import { SetGPIOOutputValuesResponse, GetGPIOValueResponse } from '../messages/gpio.response'

export class MCP2221Gpio<T> implements Gpio {
  private readonly _hid: T

  constructor(hid: T) { this._hid = hid }

  set(req: SetGPIOOutputValuesRequest): Promise<SetGPIOOutputValuesResponse> {
    const { opaque } = req
    throw new Error('Method not implemented.' + opaque)
  }

  get(req: GetGPIOValuesRequest): Promise<GetGPIOValueResponse> {
    const { opaque } = req
    throw new Error('Method not implemented.' + opaque)
  }
}
