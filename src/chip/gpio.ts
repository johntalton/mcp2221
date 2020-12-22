import { Gpio, Binding } from '../'

import { SetGPIOOutputValuesRequest, GetGPIOValuesRequest } from '../messages/gpio.request'
import { SetGPIOOutputValuesResponse, GetGPIOValueResponse } from '../messages/gpio.response'

import { SetGPIOOutputValues, GetGPIOValues } from '../converter/gpio'

import send_request from './util'

export class MCP2221Gpio implements Gpio {
  private readonly _binding: Binding

  constructor(binding: Binding) { this._binding = binding }

  set(req: SetGPIOOutputValuesRequest): Promise<SetGPIOOutputValuesResponse> {
    return send_request(this._binding, req, SetGPIOOutputValues)
  }

  get(req: GetGPIOValuesRequest): Promise<GetGPIOValueResponse> {
    return send_request(this._binding, req, GetGPIOValues)
  }
}
