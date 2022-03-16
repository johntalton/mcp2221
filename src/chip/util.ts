/* eslint-disable fp/no-throw */
import { Converter } from '../converter/converter.js'
import { Binding } from '../binding.js'

export default async function send_request<Req, Res>(binding: Binding, req: Req, converter: Converter<Req, Res>): Promise<Res> {
	const buffer = converter.from(req)

	// it seems all repots should include a report id of 0
	const reportId = 0 // always :P
	const reportBuffer = new Uint8Array(65)
	reportBuffer[0] = reportId
	reportBuffer.set(new Uint8Array(buffer), 1)

	const writtenBytes = await binding.write(reportBuffer)
	if (writtenBytes < 0) { throw new Error('bytes written error') }

	const resBuffer = await binding.read(64)

	return converter.to(resBuffer)
}
