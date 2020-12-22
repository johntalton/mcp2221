import usb from 'usb'

usb.on('attach', device => console.log(device))
usb.on('detach', device => console.log(device))

usb.getDeviceList()
  //.filter(d => d.idVendor === 0x04d8 && d.idProduct === 0x00dd)
  .forEach(d => {
    d.open()
    console.log(d.interfaces[0].endpoints)
  })