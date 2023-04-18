/* eslint-disable fp/no-throw */
import { Converter } from '../converter/converter.js'
import { Binding } from '../binding.js'

// const delayMs = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function send_request_only<Req, Res>(binding: Binding, req: Req, converter: Converter<Req, Res>): Promise<void> {
	const buffer = converter.from(req)
	const writtenBytes = await binding.write(buffer)
}

export default async function send_request<Req, Res>(binding: Binding, req: Req, converter: Converter<Req, Res>): Promise<Res> {
	await send_request_only(binding, req, converter)
	// await delayMs(1)
	const resBuffer = await binding.read(64)
	return converter.to(resBuffer)
}

