import { Request } from './message'

// Set SRAM settings (runtime settings)
export type SetSRAMSettingsRequest = Request & {
  command: 0x60,

  // Clock Output Divider Value:
  clock?: {},

  // DAC Voltage Reference
  // Set DAC Output Value
  dac?: {},

  // ADC Voltage Reference
  adc?: {},

  // Setup the interrupt detection mechanism and clear the detection flag
  interrupt?: {
    edge?: 'positive' | 'negative' | 'both'
    clear?: boolean
    designation?: string
  },

  // GP0 Settings
  // GP1 Settings
  // GP2 Settings
  // GP3 Settings
  gpio: {}
}

// Get SRAM Settings
export type GetSRAMSettingsRequest = Request & {
  command: 0x61
}
