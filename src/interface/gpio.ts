import { SetGPIOOutputValuesRequest, GetGPIOValuesRequest } from '../messages/gpio.request'
import { SetGPIOOutputValuesResponse, GetGPIOValueResponse } from '../messages/gpio.response'

export interface Gpio {
  set(req: SetGPIOOutputValuesRequest): Promise<SetGPIOOutputValuesResponse>
  get(req: GetGPIOValuesRequest): Promise<GetGPIOValueResponse>
}
