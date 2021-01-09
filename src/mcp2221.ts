/* eslint-disable immutable/no-mutation */
/* eslint-disable fp/no-mutation */
import { Common, Flash, Gpio, I2C, SRAM } from './'
import { Binding } from './binding'

import { MCP2221Common } from './chip/common'
import { MCP2221Flash } from './chip/flash'
import { MCP2221Gpio } from './chip/gpio'
import { MCP2221I2C } from './chip/i2c'
import { MCP2221SRAM } from './chip/sram'

export class MCP2221 {
  private readonly _binding: Binding

  readonly common: Common
  readonly flash: Flash
  readonly gpio: Gpio
  readonly i2c: I2C
  readonly sram: SRAM

  // factory
  static async openPromisified(binding: Binding): Promise<MCP2221> { return new MCP2221(binding) }

  constructor(binding: Binding) {
    this._binding = binding

    this.common = new MCP2221Common(this._binding)
    this.flash = new MCP2221Flash(this._binding)
    this.gpio = new MCP2221Gpio(this._binding)
    this.i2c = new MCP2221I2C(this._binding)
    this.sram = new MCP2221SRAM(this._binding)
  }
}

export const MCP2221A = MCP2221
