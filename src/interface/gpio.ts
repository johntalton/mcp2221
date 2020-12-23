import { SetGPIOOutputValuesRequest, GetGPIOValuesRequest } from '../messages/gpio.request'
import { SetGPIOOutputValuesResponse, GetGPIOValuesResponse } from '../messages/gpio.response'

export interface Gpio {
  set(req: SetGPIOOutputValuesRequest): Promise<SetGPIOOutputValuesResponse>
  get(req: GetGPIOValuesRequest): Promise<GetGPIOValuesResponse>
}
