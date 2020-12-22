const { USB } = require('webusb')

const { MCP2221 } = require('@johntalton/mcp2221')

function dumpConfig(device) {
  console.log(device.manufacturerName)
  console.log(device.productName)
  console.log(device.serialNumber)
  console.log()
  device.configurations.forEach(c => {
    const defaultConfig = c === device.configuration ? '*' : ''
    console.log(defaultConfig, 'Config: ', c.configurationValue, c.configurationName)
    c.interfaces.forEach(i => {
      const defaultInt = i === c.interface ? '*' : ''
      console.log('\t', defaultInt, i.claimed ? '(' : '', 'Interface', i.claimed ? '): ' : ': ', i.interfaceNumber)
      i.alternates.forEach(a => {
        const defaultAlt = a === i.alternate ? '*' : ''
        const aClass = a.interfaceClass === 10 ? '"CDC-Data"' :
          a.interfaceClass === 2 ? '"Com / CDC-Ctrl"' :
          a.interfaceClass === 3 ? '"HID"' :
          a.interfaceClass
        console.log('\t\t', defaultAlt, 'Alternate: ', a.interfaceName, 'class', aClass, 'protocol', a.interfaceProtocol)
        a.endpoints.forEach(e => {
          const defaultEp = e === a.endpoint ? '*' : ''
          console.log('\t\t\t', defaultEp, 'Endpoint: ', e.endpointNumber, e.direction, e.type)
        })
      })
    })
  })
}

async function setupMcp2221(usb, device) {

  await device.open()

  const cfg = {
    configuration: 1,
    interface: 1,
    endpoint: 2
  }

  if (device.configuration === null) {
    console.log('unselected configuration, selecting')
    await device.selectConfiguration(cfg.configuration);
  }

  console.log('claim interface ', cfg.interface)
  await device.claimInterface(cfg.interface);

  dumpConfig(device)

  const buffer = Uint8Array.from([ 0x10, 0, 0x20 ])

  const report_number = 1
  const foo = await device.controlTransferOut({
    requestType: 'class',
    recipient: 'endpoint',
    request: 0x09,
    value: (2 << 8) | report_number,
    index: 2
  })
  console.log('controlTransferOut', foo)


  const out = await device.transferOut(2, buffer)
  console.log('transferOut', out)

  const result = await device.transferIn(2, 64)
  console.log('transferIn', result)

  const mcp = await MCP2221.openPromisified(usb)
  return mcp
}

async function teardownMcp2221(device) {

}

async function requestMcp2221(usb) {
  try {
    return await usb.requestDevice({
      filters: [ { vendorId: 0x04d8, productId: 0x00dd } ]
    })
  }
  catch(e) {
    return;
  }
}

async function onConnect(e) {
  console.log('USB CONNECTION', e.device.productName)
  const { usbDevice: device } = e

  if(usbDevice.vendorId !== 1240 || usbDevice.productId !== 221) {
    const device = await requestMcp2221(usb)
    if(device === undefined) { console.log('request on connect failed'); return }
    const mcp = await setupMcp2221(device)
  }
}

async function onDisconnect(e) {
  console.log('USB DISCONNECT', e.device.productName)
  const { device } = e

  if(device.vendorId !== 1240 || device.productId !== 221) {
    await teardownMcp2221(device)
  }
}

async function main() {
  const usb = new USB({ devicesFound: async d => {
      //console.log('deviceFound', d);
      return d[0]
    }
  })

  const device = await requestMcp2221(usb)
  if(device === undefined) { console.log('no device found'); return; }
  const mcp = await setupMcp2221(usb, device)

  // start watching
  console.log('Watching Connect and Disconnect')
  usb.onconnect = onConnect
  usb.ondisconnect = onDisconnect

  setTimeout(() => usb.removeAllListeners(), 10 * 1000)
}

main()