import { DecoderBufferSource } from "./converter/converter.js"

export type BindingBufferSource = ArrayBufferLike | ArrayBufferView

export interface Binding {
	// read(length: number): Promise<ArrayBuffer>
	// write(bufferSource: BindingBufferSource): Promise<void>

	readable: ReadableStream
  writable: WritableStream
}


export type BYOBMode = 'byob'
const BYOB_MODE:BYOBMode = 'byob'

export type ReadOptions = {
	timeoutMs?: number,
	signal?: AbortSignal,
	mode?: BYOBMode|undefined
}

export function makeHIDStreamBinding(source: Binding) {
	return {
		async read(count: number, options: ReadOptions = {}) {
			const {
				timeoutMs = 100,
				signal = undefined,
				mode = BYOB_MODE
			} = options

			// console.log('bindings:read', mode)

			if (source.readable === null) { throw new Error('null readable') }
			if (source.readable.locked) { throw new Error('locked reader') }
			if (signal?.aborted ?? false) { throw new Error('read aborted') }

			const reader: any = source.readable.getReader({ mode })

			const flags = {
				aborted: false,
				timedout: false
			}

			signal?.addEventListener('abort', event => {
				console.warn('aborted')
				flags.aborted = true
				reader.cancel('aborted')
					.catch((e: any) => console.warn(e))
			})

			const timer = setTimeout(() => {
				console.warn('timeout')
				flags.timedout = true
				reader.cancel('timeout')
					.catch((e: any) => console.warn(e))
			}, timeoutMs)

			let sharedReadBuffer = new ArrayBuffer(count)
			let offset = ArrayBuffer.isView(sharedReadBuffer) ? sharedReadBuffer.byteOffset : 0
			let buffer = ArrayBuffer.isView(sharedReadBuffer) ? sharedReadBuffer.buffer : sharedReadBuffer
			let bytesRead = 0

			try {
				while(true) { // (bytesRead < count) && !(signal?.aborted ?? false) // redundant ?
					const { value, done } = (mode === BYOB_MODE) ? await reader.read(new Uint8Array(buffer, offset, count - bytesRead)) : await reader.read()
					if(done) {
						console.log('DONE means closed?', value)
						break
					}

					if(mode !== BYOB_MODE) {
						console.log('copy chunk into shared')
						const sharedReadBuffer8 = new Uint8Array(sharedReadBuffer)
						sharedReadBuffer8.set(value, offset)
					}

					buffer = value.buffer
					offset += value.byteLength
					bytesRead += value.byteLength

					if(bytesRead === count) { break }
					if(bytesRead > count) {
						console.warn('received more then expected', count, bytesRead)
						break
					}

					console.log('read insufficient - again', count, bytesRead)
				}

				if(flags.aborted || flags.timedout) {
					throw new Error(`read canceled by ${flags.aborted ? 'abort signal' : 'timeout'}`)
				}

				return (mode === BYOB_MODE) ? new Uint8Array(buffer, 0, bytesRead) : new Uint8Array(sharedReadBuffer, 0, bytesRead)
			}
			finally {
				clearTimeout(timer)
				reader.releaseLock()
			}
		},

		async write(buffer: ArrayBufferLike | ArrayBufferView) {
			// source.writable.locked
			// console.log('bindings:write')
			const writer = source.writable.getWriter()
			try {
				await writer.ready
				await writer.write(buffer)
				return buffer.byteLength
			}
			finally {
				await writer.ready
				writer.releaseLock()
			}
		}
	}
}

export class Bindable {
	readonly #stream

	constructor(binding: Binding) {
		this.#stream = makeHIDStreamBinding(binding)

	}

	get read() { return this.#stream.read }
	get write() { return this.#stream.write }
}
