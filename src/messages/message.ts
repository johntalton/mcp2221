export type Message = {
  opaque: string,
}

export type Request = Message & {
  command?: number
}

export type Status = 'success' | 'busy' | 'not-supported' | 'not-allowed' | 'error'
export const StatusSuccess: Status = 'success'
export const StatusBusy: Status = 'busy'
export const StatusError: Status = 'error'
export const StatusNotAllowed: Status = 'not-allowed'
export const StatusNotSupported: Status = 'not-supported'

export type WithStatus = {
  status: Status,
  statusCode?: number
 }

export type WithI2CState = {
  i2cState?: number,  // todo this is optional until split respon w/ and w/o status and state
  i2cStateName?: string
}

export type Response = Message & WithStatus & WithI2CState & {
  command: number
}

export type Success = Response & { status: 'success', statusCode: 0x00 }
export type Busy = Response & { status: 'busy', statusCode: 0x01 }
export type NotSupported = Response & { status: 'not-supported', statusCode: 0x02 }
export type NotAllowed = Response & { status: 'not-allowed', statusCode: 0x03 }
export type Error = Response & { status: 'error', statusCode: 0x41 }
