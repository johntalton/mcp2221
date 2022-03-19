import { Converter } from '../converter.js'

import { I2CWriteDataRequest, I2CWriteDataRepeatedSTARTRequest, I2CWriteDataNoSTOPRequest, I2CReadDataRequest, I2CReadDataRepeatedSTARTRequest, I2CReadGetDataRequest } from '../../messages/i2c.request.js'
import { I2CWriteDataResponse, I2CWriteDataRepeatedSTARTResponse, I2CWriteDataNoSTOPResponse, I2CReadDataResponse, I2CReadDataRepeatedSTARTResponse, I2CReadGetDataResponse } from '../../messages/i2c.response.js'

import { I2CWriteDataRequestCoder, I2CWriteDataResponseCoder } from './write-data.js'
import { I2CWriteDataRepeatedSTARTRequestCoder, I2CWriteDataRepeatedSTARTResponseCoder } from './write-data-repeated-start.js'
import { I2CWriteDataNoSTOPRequestCoder, I2CWriteDataNoSTOPResponseCoder } from './write-data-no-stop.js'
import { I2CReadDataRequestCoder, I2CReadDataResponseCoder } from './read-data.js'
import { I2CReadDataRepeatedSTARTResponseCoder, I2CReadDataRepeatedSTARTRequestCoder } from './read-data-repeated-start.js'
import { I2CReadGetDataResponseCoder, I2CReadGetDataRequestCoder } from './read-get-data.js'

export const I2CWriteData: Converter<I2CWriteDataRequest, I2CWriteDataResponse> = {
	to: I2CWriteDataResponseCoder.decode,
	from: I2CWriteDataRequestCoder.encode
}

export const I2CWriteDataRepeatedSTART: Converter<I2CWriteDataRepeatedSTARTRequest, I2CWriteDataRepeatedSTARTResponse> = {
	to: I2CWriteDataRepeatedSTARTResponseCoder.decode,
	from: I2CWriteDataRepeatedSTARTRequestCoder.encode
}

export const I2CWriteDataNoSTOP: Converter<I2CWriteDataNoSTOPRequest, I2CWriteDataNoSTOPResponse> = {
	to: I2CWriteDataNoSTOPResponseCoder.decode,
	from: I2CWriteDataNoSTOPRequestCoder.encode
}


export const I2CReadData: Converter<I2CReadDataRequest, I2CReadDataResponse> = {
	to: I2CReadDataResponseCoder.decode,
	from: I2CReadDataRequestCoder.encode
}

export const I2CReadDataRepeatedSTART: Converter<I2CReadDataRepeatedSTARTRequest, I2CReadDataRepeatedSTARTResponse> = {
	to: I2CReadDataRepeatedSTARTResponseCoder.decode,
	from: I2CReadDataRepeatedSTARTRequestCoder.encode
}

export const I2CReadGetData: Converter<I2CReadGetDataRequest, I2CReadGetDataResponse> = {
	to: I2CReadGetDataResponseCoder.decode,
	from: I2CReadGetDataRequestCoder.encode
}
