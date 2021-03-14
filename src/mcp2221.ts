/* eslint-disable fp/no-this */
/* eslint-disable immutable/no-this */
/* eslint-disable fp/no-class */
/* eslint-disable immutable/no-mutation */
/* eslint-disable fp/no-mutation */
/* eslint-disable fp/no-nil */
import { Common } from './interface/common.js'
import { Flash } from './interface/flash.js'
import { Gpio } from './interface/gpio.js'
import { I2C } from './interface/i2c.js'
import { SRAM } from './interface/sram.js'

import { Bindable, Binding } from './binding.js'

import { MCP2221Common } from './chip/common.js'
import { MCP2221Flash } from './chip/flash.js'
import { MCP2221Gpio } from './chip/gpio.js'
import { MCP2221I2C } from './chip/i2c.js'
import { MCP2221SRAM } from './chip/sram.js'

export class MCP2221 extends Bindable {
  readonly common: Common
  readonly flash: Flash
  readonly gpio: Gpio
  readonly i2c: I2C
  readonly sram: SRAM

  // factory
  static from(binding: Binding): MCP2221 {
    return new MCP2221(binding)
  }

  constructor(binding: Binding) {
    super(binding)

    this.common = new MCP2221Common(this.binding)
    this.flash = new MCP2221Flash(this.binding)
    this.gpio = new MCP2221Gpio(this.binding)
    this.i2c = new MCP2221I2C(this.binding)
    this.sram = new MCP2221SRAM(this.binding)
  }
}

export const MCP2221A = MCP2221
