const { USB } = require('webusb')

const { MCP2221 } = require('@johntalton/mcp2221')

function dumpConfig(device) {
  device.configurations.forEach(c => {
    console.log('Config: ', c.configurationValue, c.configurationName)
    c.interfaces.forEach(i => {
      console.log('\tInterface: ', i.interfaceNumber, i.claimed)
      i.alternates.forEach(a => {
        console.log('\t\tAlternate: ', a.interfaceName, 'class', a.interfaceClass, 'protocol', a.interfaceProtocol)
        a.endpoints.forEach(e => {
          console.log('\t\t\tEndpoint: ', e.endpointNumber, e.direction, e.type)
        })
      })
    })
  })
}

async function setupMcp2221(usb, device) {
  console.log(device.manufacturerName)
  console.log(device.productName)
  console.log(device.serialNumber)

  await device.open()
  //console.log('Open')
  dumpConfig(device)


  const cfg = {
    configuration: 1,
    interface: 1,
    endpoint: 2
  }

  if (device.configuration === null) {
    console.log('unselected configuration, selecting 1')
    await device.selectConfiguration(1);
  }

  console.log('claim interface 1')
  await device.claimInterface(1);

  const buffer = [ 0x10, 0, 0x20 ]

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