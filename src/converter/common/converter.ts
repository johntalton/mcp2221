import { Converter } from '../converter.js'

import { StatusParametersRequest, ResetChipRequest } from '../../messages/common.request.js'
import { StatusParametersResponse } from '../../messages/common.response.js'

import { StatusParametersRequestCoder, StatusParametersResponseCoder } from './status.js'
import { ResetChipRequestCoder, ResetChipResponseCoder } from './reset.js'

export const StatusParameter: Converter<StatusParametersRequest, StatusParametersResponse> = {
	to: StatusParametersResponseCoder.decode,
	from: StatusParametersRequestCoder.encode
}

export const ResetChip: Converter<ResetChipRequest, void> = {
	to: ResetChipResponseCoder.decode,
	from: ResetChipRequestCoder.encode
}
