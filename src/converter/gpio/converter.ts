
import { Converter } from '../converter.js'

import { SetGPIOOutputValuesRequest, GetGPIOValuesRequest } from '../../messages/gpio.request.js'
import { SetGPIOOutputValuesResponse, GetGPIOValuesResponse } from '../../messages/gpio.response.js'

import { GetGPIOValuesRequestCoder, GetGPIOValuesResponseCoder } from './get.js'
import { SetGPIOOutputValuesRequestCoder, SetGPIOOutputValuesResponseCoder } from './set.js'

export const SetGPIOOutputValues: Converter<SetGPIOOutputValuesRequest, SetGPIOOutputValuesResponse> = {
	to: SetGPIOOutputValuesResponseCoder.decode,
	from: SetGPIOOutputValuesRequestCoder.encode
}

export const GetGPIOValues: Converter<GetGPIOValuesRequest, GetGPIOValuesResponse> = {
	to: GetGPIOValuesResponseCoder.decode,
	from: GetGPIOValuesRequestCoder.encode
}
