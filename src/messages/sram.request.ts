import { Request } from './message.js'
import { DutyCycle, Gpio0, Gpio1, Gpio2, Gpio3, GeneralPurposeAlter } from './message.fragments.js'

// Set SRAM settings (runtime settings)
export type SetSRAMSettingsRequest = Request & {
  command?: 0x60,

  clock?: {
    dutyCycle: DutyCycle,
    divider: number
  },

  gp?: GeneralPurposeAlter

  gpio0?: Gpio0,
  gpio1?: Gpio1,
  gpio2?: Gpio2,
  gpio3?: Gpio3
}

// Get SRAM Settings
export type GetSRAMSettingsRequest = Request & {
  command?: 0x61
}
