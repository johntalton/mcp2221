import { Converter } from '../converter/converter'
import { Binding } from '../binding'

export default async function send_request<Req, Res>(binding: Binding, req: Req, converter: Converter<Req, Res>): Promise<Res> {
  const buffer = converter.from(req)

  const writtenBytes = await binding.write(buffer)
  if(writtenBytes < 0) { throw new Error('bytes written error') }

  const resBuffer = await binding.read(64)

  return converter.to(resBuffer)
}
