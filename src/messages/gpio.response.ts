import { Response, Success } from './message'

export type SetGPIOOutputValuesResponse = Response & Success & {
  command: 0x50

  gpio0?: {},
  gpio1?: {},
  gpio2?: {},
  gpio3?: {}
}

export type GetGPIOValueResponse = Response & Success & {
  command: 0x51,

  gpio0?: {},
  gpio1?: {},
  gpio2?: {},
  gpio3?: {}
}