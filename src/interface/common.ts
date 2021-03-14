import { ResetChipRequest, StatusParametersRequest } from '../messages/common.request.js'
import { StatusParametersResponse } from '../messages/common.response.js'

export interface Common {
  status(req: StatusParametersRequest): Promise<StatusParametersResponse>
  reset(req: ResetChipRequest): Promise<void>
}
