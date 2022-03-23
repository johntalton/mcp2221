import { Response, Success } from './message.js'
import { Password, RuntimeChipSettings, GeneralPurpose, Gpio0, Gpio1, Gpio2, Gpio3, UsbSettings } from './message.fragments.js'

export type SetSRAMSettingsResponse = Response & Success & {
  command: 0x60
}

export type GetSRAMSettingsResponse = Response & Success & {
  command: 0x61,

  chip: RuntimeChipSettings,
  gp: GeneralPurpose,
  usb: UsbSettings,

  password: Password,

  gpio0: Gpio0,
  gpio1: Gpio1,
  gpio2: Gpio2,
  gpio3: Gpio3
}
