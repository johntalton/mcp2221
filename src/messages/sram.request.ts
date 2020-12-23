import { Request } from './message'
import { DutyCycle, Gpio0, Gpio1, Gpio2, Gpio3, InterruptEdge, Voltage, VoltageOption } from './message.fragments'

// Set SRAM settings (runtime settings)
export type SetSRAMSettingsRequest = Request & {
  command?: 0x60,

  clock?: {
    dutyCycle: DutyCycle,
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
    }
  }

  gpio0?: Gpio0,
  gpio1?: Gpio1,
  gpio2?: Gpio2,
  gpio3?: Gpio3
}

// Get SRAM Settings
export type GetSRAMSettingsRequest = Request & {
  command?: 0x61
}
