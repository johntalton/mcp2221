import usb from 'usb'

function dump(device) {
  device.interfaces.forEach(i => {
    console.log('Interface', i.id)
    i.endpoints.forEach(e => {
      const type = e.transferType === usb.LIBUSB_TRANSFER_TYPE_BULK ? 'Bulk' :
        e.transferType === usb.LIBUSB_TRANSFER_TYPE_CONTROL ? 'Control' :
        e.transferType === usb.LIBUSB_TRANSFER_TYPE_INTERRUPT ? 'Interrupt' :
        e.transferType === usb.LIBUSB_TRANSFER_TYPE_ISOCHRONOUS ? 'Isochronous' :
        e.transferType
      console.log('\t', 'Endpoint:', e.address, 'direction', e.direction, 'type', type)
    })
  })
}

usb.on('attach', device => console.log(device))
usb.on('detach', device => console.log(device))

usb.getDeviceList()
  //.filter(d => d.idVendor === 0x04d8 && d.idProduct === 0x00dd)
  .forEach(d => {
    d.open()
    d.interface(1).claim()
    dump(d)

    d.interface(1).endpoint(2).transfer([ 0x10, 0x00, 0x10 ], (err) => {
      console.log('here', err)
      d.interface(1).endpoint(130).transfer(1, (err, data) => {
        console.log('there', err, data)
      })
    })

    //d.interface(1).release(err => {})
  })