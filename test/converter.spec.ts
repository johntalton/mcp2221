
import { describe, it } from 'mocha'
import { expect } from 'chai'

import {
  StatusParametersRequestCoder, StatusParametersResponseCoder,
  ResetChipRequestCoder, ResetChipResponseCoder,
  ReadFlashDataRequestCoder, ReadFlashDataResponseCoder,
  WriteFlashDataRequestCoder, WriteFlashDataResponseCoder,
  SendFlashAccessPasswordRequestCoder, SendFlashAccessPasswordResponseCoder,
  GetGPIOValuesRequestCoder, GetGPIOValuesResponseCoder,
  SetGPIOOutputValuesRequestCoder, SetGPIOOutputValuesResponseCoder,
  I2CReadDataRequestCoder, I2CReadDataResponseCoder,
  I2CReadDataRepeatedSTARTRequestCoder, I2CReadDataRepeatedSTARTResponseCoder,
  I2CReadGetDataRequestCoder, I2CReadGetDataResponseCoder,
  I2CWriteDataNoSTOPRequestCoder, I2CWriteDataNoSTOPResponseCoder,
  I2CWriteDataRequestCoder, I2CWriteDataResponseCoder,
  I2CWriteDataRepeatedSTARTRequestCoder, I2CWriteDataRepeatedSTARTResponseCoder,
  GetSRAMSettingsRequestCoder, GetSRAMSettingsResponseCoder,
  SetSRAMSettingsRequestCoder, SetSRAMSettingsResponseCoder

} from '../src/converter/coder'
import { Coder } from '../src/converter/converter'
import { Message } from '../src/messages/message'


type Test<T> = {
  coder: Coder<T>
  buffer: ArrayBuffer
  message: T
}

describe('Converter', () => {
  describe('to/from', () => {
    const matrix: Array<Test<any>>= [
      //
      { coder: StatusParametersRequestCoder, buffer: Uint8Array.from([ 16, 0, 0, 0, 0 ]), message: { opaque: '' } },
      { coder: StatusParametersRequestCoder, buffer: Uint8Array.from([ 16, 0, 0x10, 0, 0 ]), message: { opaque: '', cancelI2c: true } },
      { coder: StatusParametersResponseCoder, buffer: Uint8Array.from([]), message: { opaque: '' } },
      //
      { coder: ResetChipRequestCoder, buffer: Uint8Array.from([]), message: { opaque: '' } },
      { coder: ResetChipResponseCoder, buffer: Uint8Array.from([]), message: { opaque: '' } },
      //
      { coder: ReadFlashDataRequestCoder, buffer: Uint8Array.from([]), message: { opaque: '' } },
      { coder: ReadFlashDataRequestCoder, buffer: Uint8Array.from([]), message: { opaque: '' } },
      { coder: ReadFlashDataResponseCoder, buffer: Uint8Array.from([]), message: { opaque: '' } },
      //
      { coder: WriteFlashDataRequestCoder, buffer: Uint8Array.from([]), message: { opaque: '' } },
      { coder: WriteFlashDataResponseCoder, buffer: Uint8Array.from([]), message: { opaque: '' } },
      //
      { coder: SendFlashAccessPasswordRequestCoder, buffer: Uint8Array.from([]), message: { opaque: '' } },
      //
      { coder: GetGPIOValuesRequestCoder, buffer: Uint8Array.from([]), message: { opaque: '' } },
      { coder: GetGPIOValuesRequestCoder, buffer: Uint8Array.from([]), message: { opaque: '' } },
      { coder: GetGPIOValuesRequestCoder, buffer: Uint8Array.from([]), message: { opaque: '' } },
      { coder: GetGPIOValuesRequestCoder, buffer: Uint8Array.from([]), message: { opaque: '' } },
      { coder: GetGPIOValuesRequestCoder, buffer: Uint8Array.from([]), message: { opaque: '' } },
      { coder: GetGPIOValuesRequestCoder, buffer: Uint8Array.from([]), message: { opaque: '' } },
      //
      { coder: SetGPIOOutputValuesRequestCoder, buffer: Uint8Array.from([]), message: { opaque: '' } },
      //
      { coder: I2CReadDataRequestCoder, buffer: Uint8Array.from([]), message: { opaque: '' } },
      { coder: I2CReadDataResponseCoder, buffer: Uint8Array.from([]), message: { opaque: '' } },
      //
      { coder: I2CReadDataRepeatedSTARTRequestCoder, buffer: Uint8Array.from([]), message: { opaque: '' } },
      { coder: I2CReadDataRepeatedSTARTResponseCoder, buffer: Uint8Array.from([]), message: { opaque: '' } },
      //
      { coder: I2CReadGetDataRequestCoder, buffer: Uint8Array.from([]), message: { opaque: '' } },
      { coder: I2CReadGetDataResponseCoder, buffer: Uint8Array.from([]), message: { opaque: '' } },
      //
      { coder: I2CWriteDataNoSTOPRequestCoder, buffer: Uint8Array.from([]), message: { opaque: '' } },
      { coder: I2CWriteDataNoSTOPResponseCoder, buffer: Uint8Array.from([]), message: { opaque: '' } },
      //
      { coder: I2CWriteDataRequestCoder, buffer: Uint8Array.from([]), message: { opaque: '' } },
      { coder: I2CWriteDataResponseCoder, buffer: Uint8Array.from([]), message: { opaque: '' } },
      //
      { coder: I2CWriteDataRepeatedSTARTRequestCoder, buffer: Uint8Array.from([]), message: { opaque: '' } },
      { coder: I2CWriteDataRepeatedSTARTResponseCoder, buffer: Uint8Array.from([]), message: { opaque: '' } },
      //
      { coder: GetSRAMSettingsRequestCoder, buffer: Uint8Array.from([]), message: { opaque: '' } },
      { coder: GetSRAMSettingsResponseCoder, buffer: Uint8Array.from([]), message: { opaque: '' } },
      //
      { coder: SetSRAMSettingsRequestCoder, buffer: Uint8Array.from([]), message: { opaque: '' } },
      { coder: SetSRAMSettingsResponseCoder, buffer: Uint8Array.from([]), message: { opaque: '' } }
    ]

    matrix.forEach((test, i) => {
      const { coder, buffer, message } = test

      it('encode #' + i, async function() {
        try {
          const result = coder.encode(message)
          expect(new Uint8Array(result)).to.deep.equal(buffer)
        }
        catch(e) {
          if(e.message === 'unused') { this.skip() }
          throw e
        }
      })

      it('decode #' + i, async function() {
        try {
          const msg = coder.decode(buffer)
          expect(msg).to.deep.equal(message)
        }
        catch(e) {
          if(e.message === 'unused') { this.skip() }
          throw e
        }
      })
    })

  })
})