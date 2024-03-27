# MCP2221
Simple library to control MCP 2221 (A) via USB.

[![npm Version](http://img.shields.io/npm/v/@johntalton/mcp2221.svg)](https://www.npmjs.com/package/@johntalton/mcp2221)
![GitHub package.json version](https://img.shields.io/github/package-json/v/johntalton/mcp2221)
[![CI](https://github.com/johntalton/mcp2221/actions/workflows/CI.yml/badge.svg)](https://github.com/johntalton/mcp2221/actions/workflows/CI.yml)
![CodeQL](https://github.com/johntalton/mcp2221/workflows/CodeQL/badge.svg)
![GitHub](https://img.shields.io/github/license/johntalton/mcp2221)
[![Downloads Per Month](http://img.shields.io/npm/dm/@johntalton/mcp2221.svg)](https://www.npmjs.com/package/@johntalton/mcp2221)
![GitHub last commit](https://img.shields.io/github/last-commit/johntalton/mcp2221)
[![Package Quality](https://npm.packagequality.com/shield/%40johntalton%2Fmcp2221.svg)](https://packagequality.com/#?package=@johntalton/mcp2221)

Standard [Adafruit](https://www.adafruit.com/product/4471) link.

### Features
Support full range of command and functionality, including:

- General Purpose
    - Digital In / Out (`Gpio` abstraction)
    - ADC
    - DAC
    - Clock
    - Interrupt
    - Alternate Function
- I²C
    - `I2CBus` abstraction
- Configuration
    - SRAM
    - FLASH
    - Status / Reset

### Example
```typescript
import { MCP2221A } from '@johntalton/mcp2221'

const binding: Binding = { ... }
const chip = await MCP2221A.openPromisified(binding)
const res = await chip.common.status({ opaque: 'synthetic' })

const { ch0, ch1, ch2 } = res.adc
```

### Binding
The library attempts to abstract the nature of USB and HID away.

In doing so increases the volatility of this type (`Binding`) over time, while allowing for less formal dependency on any USB or HID library.

Asynchronous `read` and `write` currently make up the api surface. see examples.


### API

#### Gpio
##### `set`
##### `get`

#### I²C
A middle layer I²C api that allows for flexible construction of many standard I²C and SMBus communications.
##### `writeData`
##### `writeRepeatedSTART`
##### `writeNoSTOP`
##### `readData`
##### `readRepeatedSTART`
##### `readGetData`

#### SRAM
The SRAM api allow for modification of the chips run-time configuration parameters.
These will remain active until the chip is reset / power cycled.

- Foo
- Bar

##### `set`
##### `get`

#### Flash
Api access the the FLASH give access to modify the chips permanent storage.

##### subCommands
The FLASH api exposes several object from which to `read` / `write`
 - ChipSettings
 - GPSettings
 - USBManufacturer
 - USBProduct
 - USBSerialNumber
 - FactorySerial

##### `read`
##### `write`
##### `sendPassword`

#### Status / Reset
##### `status`
Provides convenient information about the system configuration and run-time values. Can be used to poll the chip for unique conditions.
##### `reset`
