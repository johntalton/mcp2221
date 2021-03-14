/* eslint-disable fp/no-throw */
import { Converter } from '../converter/converter.js'
import { Binding } from '../binding.js'

export default async function send_request<Req, Res>(binding: Binding, req: Req, converter: Converter<Req, Res>): Promise<Res> {
  const buffer = converter.from(req)

  const writtenBytes = await binding.write(buffer)
  if(writtenBytes < 0) { throw new Error('bytes written error') }

  const resBuffer = await binding.read(64)

  return converter.to(resBuffer)
}
