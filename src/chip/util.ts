import { Converter, EncoderBufferTarget } from '../converter/converter.js'
import { Bindable } from '../binding.js'

export const delayMs = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function send_request_only<Req, Res>(bindable: Bindable, req: Req, converter: Converter<Req, Res>): Promise<void> {
	const buffer = converter.from(req)
	const writtenBytes = await bindable.write(buffer)
}

export default async function send_request<Req, Res>(bindable: Bindable, req: Req, converter: Converter<Req, Res>, targetBuffer?: EncoderBufferTarget): Promise<Res> {
	await send_request_only(bindable, req, converter)
	// await delayMs(2) // by not waiting we induce a queued read
	const resBuffer = await bindable.read(64)
	return converter.to(resBuffer, targetBuffer)
}

