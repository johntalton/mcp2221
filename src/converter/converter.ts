export type Coder<T> = {
  encode: (req: T) => ArrayBuffer,
  decode: (buffer: ArrayBuffer) => T
}

export type Converter<Req, Res> = {
  from: Coder<Req>['encode'],
  to: Coder<Res>['decode']
}
