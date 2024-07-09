# MCP2221
Full featured MCP2221 library with WebHID and node support over StreamAPI 🥳

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
- [I²C](#direct-api) (raw)
- [`I2CBus`](#i2cbus-abstraction-recommended)

![i2c scan](https://raw.githubusercontent.com/johntalton/mcp2221/326-is-it-possible-to-use-this-in-nodejs/examples/mcp2221-scan.png)

# Features

Support full range of command and functionality, including:

- Password Protected
    - Access Password setting
    - New password Flash writes
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

The following example gives the outline of the usage pattern for creating the binding layer between the underlying HID implementations and this chip library.

```javascript
import { MCP2221 } from '@johntalton/mcp2221'

const hidDevice = { /* likely navigator.hid.getDevices() ... etc */ }
const source = new HIDStreamSource(hidDevice)
const chip = MCP2221.from(source)

// do something with the chip
const { adc } = await chip.common.status()
const { ch0, ch1, ch2 } = adc
```

# Stream API

Individual HID implementations are abstracted over the [Stream API](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API) that supports BYOB (bring you own buffer) and Byte specific stream.

As such, the interface `HIDStreamSource` is used to normalize the sources  into a stream.

Two examples of Stream Sources are given bellow: WebHID and Node-HID.

## Web HID

The [WebHID](https://developer.mozilla.org/en-US/docs/Web/API/WebHID_API) interface provides a robust browser based HID implementation ([browser support](https://developer.mozilla.org/en-US/docs/Web/API/WebHID_API#browser_compatibility))

The example code above can be updated to use the the concrete `WebHIDStreamSource`.

The API has several way of acquiring a `HIDDevice`, most common is to make a request for existing connected devices via [`navigator.hid.getDevices()`](https://developer.mozilla.org/en-US/docs/Web/API/HID/getDevices).


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

## `I2CBus` abstraction (recommended)

Basic usage of such API can be useful in some instances. However, due to complexities and error checking logic, it is recommended to use the [`I2CBus`](https://github.com/johntalton/i2c-bus-mcp2221) abstraction layer


## Direct API

The MCP2221 exposes several low-level I²C constructs.
These can be used to build custom bus interactions

Note: the chip's I²C state machine can hang / crash is care is not taken to check status and appropriately cancel transaction.  `I2CBus` usage is encouraged, and may also be a good reference.

The following example is simplification from the the above `I2CBus` implementation [code](https://github.com/johntalton/i2c-bus-mcp2221/blob/main/src/utils/read.ts).

```javascript
const chip // chip from base examples

// request a read of length 3 bytes from address 0x70 (7-bit address)
const REQUESTED_I2C_BYTE_LENGTH = 3

// start the request
const { status } = await chip.i2c.readData({
    address: 0x70,
    length: REQUESTED_I2C_BYTE_LENGTH
})
if(status !== 'success') { throw new Error('☠️') }
// check i2c state and other transfer values for readiness

//
// it is almost sertian that a call to `status` is needed, the commands "success" status value is not sufficiant for checking the state of the bus
// const { status, i2cStateName, ... } = await device.common.status({ opaque })
// if (__i2cStatusIsNotOk__) { throw new Error('😢') }

// if that all went well then attempt to get the buffer
// here we allow the chip to allocate the buffer
// BYOB can be used here also for performance / efficiency
const { validData, buffer, readBackBytes } = await chip.i2c.readGetData()
if(!validData) { throw new Error('🧨') }
if(readBackBytes === REQUESTED_I2C_BYTE_LENGTH) { throw new Error('👎') }


// process the data
// check if the returned buffer is a view and coheres it into a Uint8Array
const u8 = ArrayBuffer.isView(buffer) ?
    new Uint8Array(buffer, buffer.byteOffset, buffer.byteLength) :
    new Uint8Array(buffer)

// deconstruct TypedArray
const [ one, two, three ] = u8


```
