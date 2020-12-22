export type Converter<Req, Res> = {
  from: (req: Req) => ArrayBuffer,
  to: (buffer: ArrayBuffer) => Res
}
