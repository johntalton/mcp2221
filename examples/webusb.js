const { USB } = require('webusb')

async function discoverMcp2221(usb) {
  try {
    const d = await usb.requestDevice({
      //filters: [ { } ]
      filters: [ { vendorId: 0x04d8, productId: 0x00dd } ]
    })

    //console.log('d', d)
    await d.open()
    return d
  }
  catch(e) {
    console.log('discover error', e)
    //return e
  }
}

async function onConnect(e) {
  console.log('USB CONNECTION', e)
}

async function onDisconnect(e) {
  console.log('USB DISCONNECT', e)
}

async function main() {
  const usb = new USB({ devicesFound: async d => {
      //console.log('deviceFound', d);
      return d[0]
    }
  })

  //console.log(usb)

  usb.onconnect = onConnect
  usb.ondisconnect = onDisconnect

  console.log('getDevice', await usb.getDevices())

  const device = await discoverMcp2221(usb)
  if(device === undefined) { return; }
  console.log('discover', device.manufacturerName, device.productName)


  setTimeout(() => usb.removeAllListeners(), 10 * 1000)
}

main()