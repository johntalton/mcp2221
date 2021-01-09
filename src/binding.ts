export interface Binding {
  read(length: number): Promise<ArrayBuffer>
  write(buffer: ArrayBuffer): Promise<number>
}
