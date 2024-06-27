# MCP2221
Full featured library MCP2221 (A) via USB HID.

[![npm Version](http://img.shields.io/npm/v/@johntalton/mcp2221.svg)](https://www.npmjs.com/package/@johntalton/mcp2221)
![GitHub package.json version](https://img.shields.io/github/package-json/v/johntalton/mcp2221)
[![CI](https://github.com/johntalton/mcp2221/actions/workflows/CI.yml/badge.svg)](https://github.com/johntalton/mcp2221/actions/workflows/CI.yml)
![GitHub](https://img.shields.io/github/license/johntalton/mcp2221)
[![Downloads Per Month](http://img.shields.io/npm/dm/@johntalton/mcp2221.svg)](https://www.npmjs.com/package/@johntalton/mcp2221)
![GitHub last commit](https://img.shields.io/github/last-commit/johntalton/mcp2221)

Standard [Adafruit](https://www.adafruit.com/product/4471) link.

# Features
Support full range of command and functionality, including:

- Password Protected
    - Access Password setting
    - new password Flash writes
    - Alter Security settings
    - no guard against humans

- Status
    - Reset
    - Clear Interrupt
    - I²C Diagnostics
    - ADC output

- General Purpose
    - Digital In / Out (Gpio)
    - ADC 3x
    - DAC
    - Clock
    - Interrupt on Change (with variable edge detection)
    - USB Host Suspend and Configuration state

- I²C
    - standard direct methods
    - addition `I2CBus` abstraction support

- USB
    - USB Descriptor support
    - vendor / product Id
    - requested mA
    - etc


# Example
```typescript
import { MCP2221A } from '@johntalton/mcp2221'

const hidDevice = /* likely navigator.hid.getDevices() ... etc */
const source = new HIDStreamSource(hidDevice)
const chip = MCP2221.from(source)

const { adc } = await chip.common.status()
const { ch0, ch1, ch2 } = adc
```


# ReadableStream / WritableStream

WebHID (and other HID implementation) can be abstracted in several way, an attempt is made here to normalized over a [Stream API](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API) that supports BYOB (bring you own buffer) and Byte specific stream.

As such, a `HIDStreamSource` is used to normalize the WebHID (`EventTarget`) API into a stream.

A simplified stream reader is used which ignore (assumes zero) the report Id, which is correct in this case.


