const HID = require('node-hid');

async function main() {
  const devices = HID.devices()
    .filter(d => d.vendorId === 0x04d8 && d.productId === 0x00dd)
    .map(d => ({
      manufacturer: d.manufacturer,
      product: d.product,

      hid: new HID.HID( d.path )
    }))

  devices
    .forEach(d => {
      d.hid.on('data', data => {
        console.log('data')
        console.log(
          String.fromCharCode(data[46]),
          String.fromCharCode(data[47]),
          String.fromCharCode(data[48]),
          String.fromCharCode(data[49]))
      })
      d.hid.on('error', e => console.log('error', e))

      d.hid.write(Buffer.from([ 0x10, 0x00, 0x10 ]))

      setTimeout(() => {
        d.hid.close()
      }, 5 * 1000)
    })

  console.log(devices)
}

main()