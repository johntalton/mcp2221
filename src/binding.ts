/* eslint-disable fp/no-this */
/* eslint-disable immutable/no-this */
/* eslint-disable immutable/no-mutation */
/* eslint-disable fp/no-mutation */
export { MCP2221Common } from './chip/common.js'
export { MCP2221Flash } from './chip/flash.js'
export { MCP2221Gpio } from './chip/gpio.js'
export { MCP2221I2C } from './chip/i2c.js'
export { MCP2221SRAM } from './chip/sram.js'

export interface Binding {
  read(length: number): Promise<ArrayBuffer>
  write(buffer: ArrayBuffer): Promise<number>
}

export class Bindable {
  protected readonly binding: Binding

  constructor(binding: Binding) {
    this.binding = binding
  }
}
