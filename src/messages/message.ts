
export type Message = {
  opaque: string,
  command: number
}

export type Request = Message & {

}


export type Success = { status: 'success', statusCode: 0x00 }
export type Busy = { status: 'busy', statusCode: 0x01 }
export type NotSupported = { status: 'not-supported', statusCode: 0x02 }
export type NotAllowed = { status: 'not-allowed', statusCode: 0x03 }
export type Error = { status: 'error', statusCode: 0x41 }

export type Response = Message // & (Success | Busy | NotSupported | NotAllowed | Error)
