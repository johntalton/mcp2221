import { Request } from './message'

// Set SRAM settings (runtime settings)
export type SetSRAMSettingsRequest = Request & {
  command?: 0x60,

  gp: {
    clockDivider?: number,
    dac?: {},
    adc?: {},
    interrupt?: {
      edge?: 'positive' | 'negative' | 'both'
      clear?: boolean
      designation?: string
    },

    gpio0?: {},
    gpio1?: {},
    gpio2?: {},
    gpio3?: {}
  }
}

// Get SRAM Settings
export type GetSRAMSettingsRequest = Request & {
  command?: 0x61
}
