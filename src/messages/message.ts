
export type Message = {
  opaque: string,
}

export type Request = Message & {
  command?: number
}

export type Response = Message & {
  command: number,
  status: string,
  statusCode?: number
}

export type Success = Response & { status: 'success', statusCode: 0x00 }
export type Busy = Response & { status: 'busy', statusCode: 0x01 }
export type NotSupported = Response & { status: 'not-supported', statusCode: 0x02 }
export type NotAllowed = Response & { status: 'not-allowed', statusCode: 0x03 }
export type Error = Response & { status: 'error', statusCode: 0x41 }
