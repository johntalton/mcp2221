import { Request } from './message'

export type DIRECTION_IN = 0
export type DIRECTION_OUT = 1
export type DIRECTION = DIRECTION_IN | DIRECTION_OUT

export type LOGIC_0 = 0
export type LOGIC_1 = 1
export type LOGIC = LOGIC_0 | LOGIC_1

// Gpio Config
type GpioConfig = {
  direction: DIRECTION
  output: LOGIC
}

// Set GPIO Output Values
export type SetGPIOOutputValuesRequest = Request & {
  command?: 0x50,
  alter: {
    gpio0?: GpioConfig,
    gpio1?: GpioConfig,
    gpio2?: GpioConfig,
    gpio3?: GpioConfig
  }
}

// Get GPIO Values
export type GetGPIOValuesRequest = Request & {
  command?: 0x51
}
