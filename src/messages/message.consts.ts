
import {
  DutyCycle, Divider,
  InitialLEDState, SuspendState, USBCFGState,
  LOGIC_0, LOGIC_1, GpioDirection,
  Voltage, VoltageOption,
  Security, InterruptEdge,
  Gp0Designation, Gp1Designation, Gp2Designation, Gp3Designation,
  I2CReadPending
} from './message.fragments.js'

export const RESET_MAGIC = [ 0xAB, 0xCD, 0xEF ]

export const RevisionA6_11 = {
  hardware: { major: 'A', minor: '6' },
  firmware: { major: '1', minor: '1' }
}

export const RevisionA6_12 = {
  hardware: { major: 'A', minor: '6' },
  firmware: { major: '1', minor: '2' }
}

export function dont_care() { return 0x00 }

export function any_other() { return 0x00 }

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