import { Response, Success } from './message'
import { GpioAlter } from './message.fragments'

export type SetGPIOOutputValuesResponse = Response & Success & {
  command: 0x50

  gpio0?: GpioAlter,
  gpio1?: GpioAlter,
  gpio2?: GpioAlter,
  gpio3?: GpioAlter
}

export type GetGPIOValueResponse = Response & Success & {
  command: 0x51,

  gpio0?: GpioAlter,
  gpio1?: GpioAlter,
  gpio2?: GpioAlter,
  gpio3?: GpioAlter
}