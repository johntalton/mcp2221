import { Common, Binding } from '../'

import { StatusParametersRequest, ResetChipRequest } from '../messages/common.request'
import { StatusParametersResponse } from '../messages/common.response'

import { StatusParameter, ResetChip } from '../converter/common'

import send_request from './util'

export class MCP2221Common implements Common {
  private readonly _binding: Binding

  constructor(binding: Binding) { this._binding = binding }

  async status(req: StatusParametersRequest): Promise<StatusParametersResponse> {
    return send_request(this._binding, req, StatusParameter)
  }

  async reset(req: ResetChipRequest): Promise<void> {
    return send_request(this._binding, req, ResetChip)
  }
}
