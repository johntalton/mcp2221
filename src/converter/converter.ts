export type DecoderBufferSource = ArrayBufferLike | ArrayBufferView
export type EncoderBufferTarget = ArrayBufferLike | ArrayBufferView

export type Coder<T> = {
  encode: (req: T) => ArrayBuffer,
  decode: (bufferSource: DecoderBufferSource) => T
}

export type Converter<Req, Res> = {
  from: Coder<Req>['encode'],
  to: Coder<Res>['decode']
}
