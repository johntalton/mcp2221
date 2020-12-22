import { Request } from './message'
import { GpioAlter } from './message.fragments'

// Set GPIO Output Values
export type SetGPIOOutputValuesRequest = Request & {
  command?: 0x50,

  gpio0?: GpioAlter,
  gpio1?: GpioAlter,
  gpio2?: GpioAlter,
  gpio3?: GpioAlter
}

// Get GPIO Values
export type GetGPIOValuesRequest = Request & {
  command?: 0x51
}
