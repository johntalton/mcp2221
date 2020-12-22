import { Common, Flash, Gpio, I2C, SRAM } from './'
import { MCP2221Common } from './chip/common'
import { MCP2221Flash } from './chip/flash'
import { MCP2221Gpio } from './chip/gpio'
import { MCP2221I2C } from './chip/i2c'
import { MCP2221SRAM } from './chip/sram'

export class MCP2221<T>
{
  private readonly _hid: T

  public readonly common: Common
  public readonly flash: Flash
  public readonly gpio: Gpio
  public readonly i2c: I2C
  public readonly sram: SRAM

  // factory
  static openPromisified<T>(hid: T): Promise<MCP2221<T>> { return Promise.resolve(new MCP2221(hid)) }

  constructor(hid: T) {
    this._hid = hid

    this.common = new MCP2221Common<T>(this._hid)
    this.flash = new MCP2221Flash<T>(this._hid)
    this.gpio = new MCP2221Gpio<T>(this._hid)
    this.i2c = new MCP2221I2C<T>(this._hid)
    this.sram = new MCP2221SRAM<T>(this._hid)
  }
}
