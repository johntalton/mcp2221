import { ResetChipRequest, StatusParametersRequest } from '../messages/common.request'
import { StatusParametersResponse } from '../messages/common.response'

export interface Common {
	status(req: StatusParametersRequest): Promise<StatusParametersResponse>
	reset(req: ResetChipRequest): Promise<void>
}
