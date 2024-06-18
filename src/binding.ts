export type BindingBufferSource = ArrayBufferLike | ArrayBufferView

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
