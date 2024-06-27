import {
  DutyCycle, Divider,
  InitialLEDState, SuspendState, USBCFGState,
  LOGIC_0, LOGIC_1, GpioDirection,
  Voltage, VoltageOption,
  Security, InterruptEdge,
  Gp0Designation, Gp1Designation, Gp2Designation, Gp3Designation,
  I2CReadPending,
  CancelationStatus
} from './message.fragments.js'
import { Status } from './message.js'

export const STATUS_COMMAND = 0x10
export const RESET_CHIP_COMMAND = 0x70

export const GPIO_SET_COMMAND = 0x50
export const GPIO_GET_COMMAND = 0x51

export const SRAM_SET_COMMAND = 0x60
export const SRAM_GET_COMMAND = 0x61

export const I2C_READ_DATA_COMMAND = 0x91
export const I2C_READ_DATA_REPEATED_START_COMMAND = 0x93
export const I2C_READ_GET_DATA_COMMAND = 0x40
export const I2C_WRITE_DATA_NO_STOP_COMMAND = 0x94
export const I2C_WRITE_DATA_REPEATED_START_COMMAND = 0x92
export const I2C_WRITE_DATA_COMMAND = 0x90

export const READ_FLASH_DATA_COMMAND = 0xB0
export const READ_FLASH_DATA_CHIP_SETTINGS_SUB_COMMAND = 0x00
export const READ_FLASH_DATA_GP_SETTINGS_SUB_COMMAND = 0x01
export const READ_FLASH_USB_MANUFACTURER_SUB_COMMAND_CODE = 0x02
export const READ_FLASH_USB_PRODUCT_SUB_COMMAND_CODE = 0x03
export const READ_FLASH_USB_SERIAL_NUMBER_SUB_COMMAND_CODE = 0x04
export const READ_FLASH_DATA_FACTORY_SERIAL_NUMBER_SUB_COMMAND = 0x05

export const WRITE_FLASH_DATA_COMMAND = 0xB1
export const WRITE_FLASH_DATA_CHIP_SETTINGS_SUB_COMMAND = 0x00
export const WRITE_FLASH_DATA_GP_SETTINGS_SUB_COMMAND = 0x01
export const WRITE_FLASH_DATA_MANUFACTURER_SUB_COMMAND = 0x02
export const WRITE_FLASH_DATA_PRODUCT_SUB_COMMAND = 0x03
export const WRITE_FLASH_DATA_SERIAL_NUMBER_SUB_COMMAND = 0x04

export const SEND_FLASH_ACCESS_COMMAND = 0xB2

//
export const MAX_REPORT_SIZE = 64
export const USB_STRING_MAX_BYTE_LENGTH = 60 // MAX_REPORT_SIZE - 4
export const MAX_16BIT_USB_STRING_LENGTH = 30 // USB_STRING_MAX_BYTE_LENGTH / 2
export const MAX_I2C_WRITE_BYTES_LENGTH = 60
export const MAX_I2C_READ_BYTES_LENGTH = 60
//
export const EXPECTED_CHIP_BYTE_LENGTH = 18
export const EXPECTED_GP_BYTE_LENGTH = 4
export const EXPECTED_CHIP_SETTINGS_BYTE_LENGTH = 10

//
export const USB_STRING_MAGIC_THREE = 0x03

//
export const RESET_MAGIC = [ 0xAB, 0xCD, 0xEF ]

//
export const ACCESS_PASSWORD_BYTE_LENGTH = 8

//
export const RevisionA6_11 = {
  hardware: { major: 'A', minor: '6' },
  firmware: { major: '1', minor: '1' }
}

export const RevisionA6_12 = {
  hardware: { major: 'A', minor: '6' },
  firmware: { major: '1', minor: '2' }
}

//
export const NO_ALTER_GPIO_FLAG = 0x00

//
export const STATUS_I2C_CANCEL_FLAG = 0x10
export const STATUS_SET_CLOCK_FLAG = 0x20

//
export const READ_BACK_BYTES_I2C_ERROR_FLAG = 127

//
export const ALTER_GPIO_CLOCK_FLAG = 0x80
export const ALTER_DAC_REF_FLAG = 0x80
export const ALTER_DAC_VALUE_FLAG = 0x80
export const ALTER_ADC_REF_FLAG = 0x80
export const ALTER_INTERRUPT_FLAG = 0x80

//
export function dont_care() { return 0x00 }
export function not_zero() { return 0x01 }
export function any_other(other: number) {
  if(other === 0) { return not_zero() }
  return dont_care() & ~other
}

//
export const StatusSuccess: Status = 'success'
export const StatusBusy: Status = 'busy'
export const StatusError: Status = 'error'
export const StatusNotAllowed: Status = 'not-allowed'
export const StatusNotSupported: Status = 'not-supported'

//
export const I2CCancelationNone: CancelationStatus = 'none'
export const I2CCancelationMarked: CancelationStatus = 'marked'
export const I2CCancelationIdle: CancelationStatus = 'idle'

//
export const I2CReadPending0: I2CReadPending = 0
export const I2CReadPending1: I2CReadPending = 1
export const I2CReadPending2: I2CReadPending = 2

//
export const VoltageOptionVrm: VoltageOption = 'Vrm'
export const VoltageOptionVdd: VoltageOption = 'Vdd'

//
export const VoltageOff: Voltage = 'Off'
export const Voltage1V: Voltage = '1.024V'
export const Voltage2V: Voltage = '2.048V'
export const Voltage4V: Voltage = '4.096V'

//
export const DutyCycle00: DutyCycle = '0%'
export const DutyCycle25: DutyCycle = '25%'
export const DutyCycle50: DutyCycle = '50%'
export const DutyCycle75: DutyCycle = '75%'

//
export const Divider00375: Divider = '375 kHz'
export const Divider00750: Divider = '750 kHz'
export const Divider01500: Divider = '1.5 MHz'
export const Divider03000: Divider = '3 MHz'
export const Divider06000: Divider = '6 MHz'
export const Divider12000: Divider = '12 MHz'
export const Divider24000: Divider = '24 MHz'

//
export const InitialLEDStateOn: InitialLEDState = 'on'
export const InitialLEDStateOff: InitialLEDState = 'off'

//
export const SuspendStateOn: SuspendState = 'on'
export const SuspendStateOff: SuspendState = 'off'

//
export const USBCFGStateOn: USBCFGState = 'on'
export const USBCFGStateOff: USBCFGState = 'off'

//
export const InterruptEdgePositive: InterruptEdge = 'positive'
export const InterruptEdgeNegative: InterruptEdge = 'negative'
export const InterruptEdgeBoth: InterruptEdge = 'both'
export const InterruptEdgeOff: InterruptEdge = 'off'

//
export const GpioDirectionIn: GpioDirection = 'in'
export const GpioDirectionOut: GpioDirection = 'out'

//
export const Logic0: LOGIC_0 = 0
export const Logic1: LOGIC_1 = 1

//
export const SecurityUnsecured: Security = 'unsecured'
export const SecurityPasswordProtected: Security = 'password-protected'
export const SecurityPermanentlyLocked: Security = 'permanently-locked'


//
export const Gp0DesignationUART_RX: Gp0Designation = 'LED UART RX'
export const Gp0DesignationSSPND: Gp0Designation = 'SSPND'
export const Gp0DesignationGPIO: Gp0Designation = 'Gpio'

export const Gp1DesignationClockOutput: Gp1Designation = 'Clock Output'
export const Gp1DesignationInterruptDetection: Gp1Designation = 'Interrupt Detection'
export const Gp1DesignationUART_TX : Gp1Designation = 'LED UART TX'
export const Gp1DesignationADC_1: Gp1Designation = 'ADC1'
export const Gp1DesignationGPIO: Gp1Designation = 'Gpio'

export const Gp2DesignationDAC_1: Gp2Designation = 'DAC1'
export const Gp2DesignationADC_2: Gp2Designation = 'ADC2'
export const Gp2DesignationUSB: Gp2Designation = 'USB'
export const Gp2DesignationGPIO: Gp2Designation = 'Gpio'

export const Gp3DesignationDAC_2: Gp3Designation = 'DAC2'
export const Gp3DesignationADC_3: Gp3Designation = 'ADC3'
export const Gp3DesignationLedI2C: Gp3Designation = 'LED I2C'
export const Gp3DesignationGPIO: Gp3Designation = 'Gpio'