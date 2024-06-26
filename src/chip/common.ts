import { Bindable } from '../binding.js'
import { Common } from '../interface/common.js'

import { StatusParametersRequest, ResetChipRequest } from '../messages/common.request.js'
import { StatusParametersResponse } from '../messages/common.response.js'

import { StatusParameter, ResetChip } from '../converter/common/common.js'

import { send_request_only } from './util.js'
import send_request from './util.js'

export class MCP2221Common extends Bindable implements Common {
  async status(req: StatusParametersRequest): Promise<StatusParametersResponse> {
    return send_request(this, req, StatusParameter)
  }

  async reset(req: ResetChipRequest): Promise<void> {
    return send_request_only(this, req, ResetChip)
  }
}
