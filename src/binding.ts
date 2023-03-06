/* eslint-disable immutable/no-mutation */
/* eslint-disable fp/no-mutation */
/* eslint-disable immutable/no-this */
/* eslint-disable fp/no-this */
export type BindingBufferSource = ArrayBuffer | SharedArrayBuffer | ArrayBufferView

export interface Binding {
	read(length: number): Promise<ArrayBuffer>
	write(bufferSource: BindingBufferSource): Promise<void>
}

export class Bindable {
	protected readonly binding: Binding

	constructor(binding: Binding) {
		this.binding = binding
	}
}
