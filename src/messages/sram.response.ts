import { Response, Success } from './message'
import { ChipSettings, GeneralPurpose, Gpio, UsbSettings } from './message.fragments'

export type SetSRAMSettingsResponse = Response & Success & {
  command: 0x60
}

export type GetSRAMSettingsResponse = Response & Success & {
  command: 0x61,

  chip: ChipSettings,
  gp: GeneralPurpose,
  usb: UsbSettings,

  password: string,

  gpio0: Gpio,
  gpio1: Gpio,
  gpio2: Gpio,
  gpio3: Gpio
}
