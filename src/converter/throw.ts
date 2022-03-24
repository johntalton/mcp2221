export class Unused extends Error {
  constructor() { super('unused') }
}

export class Unimplemented extends Error {
  constructor() { super('unimplemented') }
}

export class Unknown extends Error {
  constructor(name: string, value: any) { super(`unknown ${name} - "${value}"`) }
}

export class Invalid extends Error {
  constructor(name: string, value: any) { super(`invalid ${name} - "${value}"`) }
}
