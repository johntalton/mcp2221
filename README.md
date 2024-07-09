# MCP2221
Full featured library MCP2221 (A) via USB HID for the Web and Node

[![npm Version](http://img.shields.io/npm/v/@johntalton/mcp2221.svg)](https://www.npmjs.com/package/@johntalton/mcp2221)
![GitHub package.json version](https://img.shields.io/github/package-json/v/johntalton/mcp2221)
[![CI](https://github.com/johntalton/mcp2221/actions/workflows/CI.yml/badge.svg)](https://github.com/johntalton/mcp2221/actions/workflows/CI.yml)
![GitHub](https://img.shields.io/github/license/johntalton/mcp2221)
[![Downloads Per Month](http://img.shields.io/npm/dm/@johntalton/mcp2221.svg)](https://www.npmjs.com/package/@johntalton/mcp2221)
![GitHub last commit](https://img.shields.io/github/last-commit/johntalton/mcp2221)

Standard [Adafruit](https://www.adafruit.com/product/4471) link.

- [Features](#features)
- [Stream API](#stream-api)
  - [WebHID](#web-hid)
  - [Node-HID](#node-hid)
- [I²C](#ic) (raw)
- [`I2CBus`](#i2cbus-abstraction-recommended)


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
The following example give the outline of the usage pattern for creating the binding layer between the underlying HID implementations and the chip library itself.

```javascript
import { MCP2221A } from '@johntalton/mcp2221'

const hidDevice = {} /* likely navigator.hid.getDevices() ... etc */
const source = new HIDStreamSource(hidDevice)
const chip = MCP2221.from(source)

// do something with the chip
const { adc } = await chip.common.status()
const { ch0, ch1, ch2 } = adc
```


# Stream API

Individual HID implementations are abstrated over the [Stream API](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API) that supports BYOB (bring you own buffer) and Byte specific stream.

As such, a `HIDStreamSource` is used to normalize the WebHID (`EventTarget`) API into a stream (as well as other concrete implementations).

A simplified stream reader is used which ignore (assumes zero) the report Id, which is correct in this case.

Two examples of Stream Sources are given bellow: WebHID and Node-HID.

## Web HID

the WebHID api provides a simplified HID implementation within the browser.

The example code above can replace the abstract `HIDStreamSource` with the concrete [`WebHIDStreamSource`]()

The HID API has several way of acquiring a `HIDDevice`, most common is to make a request for existing connected devices via [`navigator.hid.getDevices()`](https://developer.mozilla.org/en-US/docs/Web/API/HID/getDevices).


NOTE: an un-packaged version of WebHIDStraemSource can be found [here](https://github.com/johntalton/webapp-device-playground/blob/main/public/util/hid-stream.js). (future package publication may be forthcoming)

## Node HID

NodeJS provides several HID binding packages.  In the following example we will use the [`node-hid`](https://github.com/node-hid/node-hid) package.

As with WebHID, there are several interaction patters, and device discovery techniques. The following code explicit opens the device by vID/pID (note that the MCP2221 has the ability to "change" its IDs, it's defaults are used here).

NOTE: the current NodeHIDStreamSource is un-packaged, and can be found [here](https://github.com/johntalton/webapp-device-playground/blob/main/service/node-hid-stream.js)


```javascript
import { MCP2221 } from '@johntalton/mcp2221'
import HID from 'node-hid'
import { NodeHIDStreamSource } from './hid-stream-source.js'

const VENDOR_ID = 1240
const PRODUCT_ID = 221
const hid = await HID.HIDAsync.open(VENDOR_ID, PRODUCT_ID)
const source = new NodeHIDStreamSource(hid)
const chip = MCP2221.from(source)

// do something with the chip, like clear the interrupt flag
await chip.sram.set({ gp: { interrupt: { clear: true } } })

```

# I²C

The MCP2221 exposes several low-level I²C constructs.

```javascript
// chip from above examples

const { status } = await chip.i2c.readData()
if(status !== 'success') { throw new Error('not ok') }
const { validData, buffer } = await chip.i2c.readGetData({
    address: 0x79,
    length: 1
})


```

## `I2CBus` abstraction (recommended)

Basic usage of such API can be useful in some instances. However, due to the complexities and error checking, it is recommended to sue the [`I2CBus`](https://github.com/johntalton/i2c-bus-mcp2221) abstraction layer
