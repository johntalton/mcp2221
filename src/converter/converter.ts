export type DecoderBufferSource = ArrayBufferLike | ArrayBufferView
export type EncoderBufferTarget = ArrayBufferLike | ArrayBufferView
export type DecoderBufferTarget = ArrayBufferLike | ArrayBufferView

export type Coder<T> = {
	encode: (req: T) => ArrayBuffer,
	decode: (bufferSource: DecoderBufferSource, bufferTarget?: DecoderBufferTarget) => T
}

// export interface Coder<T> {
// 	new(...args: any[]): any
// 	encode: (req: T) => ArrayBuffer,
// 	decode: (bufferSource: DecoderBufferSource, bufferTarget?: DecoderBufferTarget) => T
// }

export type Converter<Req, Res> = {
	from: Coder<Req>['encode'],
	to: Coder<Res>['decode']
}


