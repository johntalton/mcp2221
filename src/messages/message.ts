export const COMMAND_CODE = {
  // common
  STATUS_SET_PARAMETERS: 0x10,
  RESET: 0x70,

  // flash
  READ_FLASH_DATA: 0xB0,
  WRITE_FLASH_DATA: 0xB1,
  SEND_FLASH_ACCESS_PASSWORD: 0xB2,

  // gpio
  SET_GPIO_OUTPUT_VALUES: 0x50,
  GET_GPIO_VALUES: 0x51,

  // I²C
  I2C_WRITE_DATA: 0x90,
  I2C_WRITE_DATA_REPEATED_START: 0x92,
  I2C_WRITE_DATA_NO_STOP: 0x94,

  I2C_READ_DATA: 0x91,
  I2C_READ_DATA_REPEATED_START: 0x93,
  I2C_READ_GET_DATA: 0x40
}

export type Message = {
  opaque: string,
  command: number,
}

export type Request = Message & {

}

export type Response = Message & {

}