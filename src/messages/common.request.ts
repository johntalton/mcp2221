import { Request } from './message.js'
import { I2CClock } from './message.fragments.js'

// Status/Set Parameters
export type StatusParametersRequest = Request & {
  command?: 0x10,

  cancelI2c?: boolean,
  i2cClock?: I2CClock
}

// Reset Chip
export type ResetChipRequest = Request & {
  command?: 0x70,
  magic?: [ 0xAB, 0xCD, 0xEF ]
}
