import { Request } from './message'
import { Gpio, InterruptEdge, Voltage, VoltageOption } from './message.fragments'

// Set SRAM settings (runtime settings)
export type SetSRAMSettingsRequest = Request & {
  command?: 0x60,

  clock?: {
    dutyCycle: '0%' | '25%' | '50%' | '75%',
    divider: number
  },

  gp: {
    dac?: {
      referenceVoltage: Voltage,
      referenceOptions: VoltageOption,

      initialValue?: number
    },

    adc?: {
      referenceVoltage: Voltage,
      referenceOptions: VoltageOption
    },

    interrupt?: {
      edge?: InterruptEdge,
      clear?: boolean,
      designation?: string
    }
  }

  gpio0?: Gpio,
  gpio1?: Gpio,
  gpio2?: Gpio,
  gpio3?: Gpio
}

// Get SRAM Settings
export type GetSRAMSettingsRequest = Request & {
  command?: 0x61
}
