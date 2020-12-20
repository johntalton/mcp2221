import { Request, COMMAND_CODE } from './message'

// Read Flash Data
export type ReadFlashDataRequest = Request & {
  command: typeof COMMAND_CODE.READ_FLASH_DATA,
  subCommands,
  //  Read Chip Settings
  //  Read GP Settings
  //  Read USB Manufacturer Descriptor String
  //  Read USB Product Descriptor String
  //  Read USB Serial Number Descriptor String
  //  Read Chip Factory Serial Number
}

// Write Flash Data
export type WriteFlashDataRequest = Request & {
  command: typeof COMMAND_CODE.WRITE_FLASH_DATA,
  subCommand: number
  // 00 Write Chip Settings
  // 01 Write GP Settings
  // 02 Write USB Manufacturer Descriptor String
  // 03 Write USB Product Descriptor String
  // 04 Write USB Serial Number Descriptor String

  //data
}



// Send Flash Access Password
export type SendFlashAccessPasswordRequest = Request & {
  command: typeof COMMAND_CODE.SEND_FLASH_ACCESS_PASSWORD
  // password
}
