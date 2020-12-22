import { describe, it } from 'mocha'
import { expect } from 'chai'

import { MCP2221Common, StatusParametersResponse } from '../src'

describe('MCP2221Common', () => {
  describe('constructor', () => {
    it('succeeds', () => {
      const hid = undefined
      const common = new MCP2221Common(hid)
      expect(common).to.not.be.undefined
      expect(common).to.be.instanceOf(MCP2221Common)
    })
  })

  describe('status', () => {
    it('succeeds', async () => {
      const hid = undefined
      const common = new MCP2221Common(hid)
      const res = await common.status({ opaque: '', command: 0x10 })
      expect(res).to.not.be.undefined
      expect(res as StatusParametersResponse).to.be.exist
    })
  })

  describe('reset', () => {
    it('succeeds', async () => {
      const hid = undefined
      const common = new MCP2221Common(hid)
      const res = await common.reset({ opaque: '', command: 0x70, magic: [171, 205, 239] })
      expect(res).to.be.undefined
    })
  })
})
