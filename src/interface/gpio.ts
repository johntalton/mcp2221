import { SetGPIOOutputValuesRequest, GetGPIOValuesRequest } from '../messages/gpio.request.js'
import { SetGPIOOutputValuesResponse, GetGPIOValuesResponse } from '../messages/gpio.response.js'

export interface Gpio {
  set(req: SetGPIOOutputValuesRequest): Promise<SetGPIOOutputValuesResponse>
  get(req: GetGPIOValuesRequest): Promise<GetGPIOValuesResponse>
}
