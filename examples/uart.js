// sreen -U /dev/tty.usbmodem14401 115200

const stream = require('stream/promises')

//const SerialPort = require('serialport')
const SerialPort = require('@serialport/stream')
const ByteLength = require('@serialport/parser-byte-length')
const Bindings = require('@serialport/bindings')

SerialPort.Binding = Bindings

async function openDevices() {
  const portList = await SerialPort.list()
  return portList
    .filter(p => p.vendorId === '04d8' && p.productId === '00dd')
    .map(item => ({
      ...item,
      port: new SerialPort(item.path, {
        baudRate: 115200,
        dataBits: 8,
        stopBits: 1,
        parity: 'none',
        autoOpen: false })
    }))
    // .map(item => ({
    //   ...item,
    //   parser: item.port.pipe(new ByteLength({ length: 2 }))
    // }))
}

async function main() {
  const devices = await openDevices()

  devices.forEach(d => {

    //d.parser.on('data', chunk => console.log('chunk', chunk))

    d.port.on('open', () => {
      console.log('----- OPEN', d.path)

      d.port.write(Buffer.from([

      ]), 'ascii', async err => {
        if(err) { console.log('WRITE ERROR', err); return }
        console.log('WRITE SUCCESS')

       })

      setTimeout(() => {
        d.port.close()
      }, 5 * 1000)
    })
    d.port.on('error', () => console.log('----- ERROR'))
    d.port.on('close', () => console.log('----- CLOSE'))

    d.port.open()
  })
}

main()