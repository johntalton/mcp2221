import { Gpio } from '../interface/gpio.js'

import { Bindable } from '../binding.js'

import { SetGPIOOutputValuesRequest, GetGPIOValuesRequest } from '../messages/gpio.request.js'
import { SetGPIOOutputValuesResponse, GetGPIOValuesResponse } from '../messages/gpio.response.js'

import { SetGPIOOutputValues, GetGPIOValues } from '../converter/gpio/gpio.js'

import send_request from './util.js'

export class MCP2221Gpio extends Bindable implements Gpio {
  async set(req: SetGPIOOutputValuesRequest): Promise<SetGPIOOutputValuesResponse> {
    return send_request(this, req, SetGPIOOutputValues)
  }

  async get(req: GetGPIOValuesRequest): Promise<GetGPIOValuesResponse> {
    return send_request(this, req, GetGPIOValues)
  }
}
