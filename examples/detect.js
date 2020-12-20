const usbDetect = require('usb-detection')

usbDetect.startMonitoring()

usbDetect.on('change', device => {
  console.log('change', device)

})

// usbDetect.startMonitoring()