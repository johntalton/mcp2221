import pkg from '@johntalton/mcp2221'
const { MCP2221 } = pkg

const usb = null
const chip = await MCP2221.openPromisified(usb)
const res = await chip.common.status({ opaque: 'synthetic', command: 0x10 })
console.log(res)