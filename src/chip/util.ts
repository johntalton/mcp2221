/* eslint-disable fp/no-throw */
import { Converter } from '../converter/converter.js'
import { Binding } from '../binding.js'

const delayMs = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export default async function send_request<Req, Res>(binding: Binding, req: Req, converter: Converter<Req, Res>): Promise<Res> {
	const buffer = converter.from(req)

	const writtenBytes = await binding.write(buffer)
	const resBuffer = await binding.read(64)

	await delayMs(1)

	return converter.to(resBuffer)
}
