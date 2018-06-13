/**
 * LS-8 v2.0 emulator skeleton code
 */

// Constant variables associated with intruction bytes
ADD = '0b10101000',
AND = '0b10110011',
CALL = '0b01001000',
CMP = '0b10100000',
DEC = '0b01111001',
DIV = '0b10101011',
HLT = '0b00000001',
INC = '0b01111000',
INT = '0b01001010',
IRET = '0b00001011',
JEQ = '0b01010001',
JGT = '0b01010100',
JLT = '0b01010011',
JMP = '0b01010000',
JNE = '0b01010010',
LD = '0b10011000',
LDI = '0b10011001',
MOD = '0b10101100',
MUL = '0b10101010',
NOP = '0b00000000',
NOT = '0b01110000',
OR = '0b10110001',
POP = '0b01001100',
PRA = '0b01000010',
PRN = '0b01000011',
PUSH = '0b01001101',
RET = '0b00001001',
ST = '0b10011010',
SUB = '0b10101001',
XOR = '0b10110010';


/**
 * Class for simulating a simple Computer (CPU & memory)
 */
class CPU {

  /**
   * Initialize the CPU
   */
  constructor(ram) {
    this.ram = ram;

    this.reg = new Array(8).fill(0); // General-purpose registers R0-R7
    
    // Special-purpose registers
    this.PC = 0; // Program Counter
    this.SP = 244; // Stack Pointer
  }
  
  /**
   * Store value in memory address, useful for program loading
   */
  poke(address, value) {
    this.ram.write(address, value);
  }

  /**
   * Starts the clock ticking on the CPU
   */
  startClock() {
    this.clock = setInterval(() => {
      this.tick();
    }, 1); // 1 ms delay == 1 KHz clock == 0.000001 GHz
  }

  /**
   * Stops the clock
   */
  stopClock() {
    clearInterval(this.clock);
  }

  /**
   * ALU functionality
   *
   * The ALU is responsible for math and comparisons.
   *
   * If you have an instruction that does math, i.e. MUL, the CPU would hand
   * it off to it's internal ALU component to do the actual work.
   *
   * op can be: ADD SUB MUL DIV INC DEC CMP
   */
  alu(op, regA, regB) {
    switch (op) {
      case 'MUL':
        // !!! IMPLEMENT ME
        this.reg[regA] *= this.reg[regB];
        break;
    }
  }

  /**
   * Advances the CPU one cycle
   */
  tick() {
    // Load the instruction register (IR--can just be a local variable here)
    // from the memory address pointed to by the PC. (I.e. the PC holds the
    // index into memory of the instruction that's about to be executed
    // right now.)

    // !!! IMPLEMENT ME
    const IR = this.ram.read(this.PC);

    // Debugging output
    // console.log(`${this.PC}: ${IR.toString(2)}`);

    // Get the two bytes in memory _after_ the PC in case the instruction
    // needs them.

    // !!! IMPLEMENT ME
    const operandA = this.ram.read(this.PC + 1);
    const operandB = this.ram.read(this.PC + 2);

    // Execute the instruction. Perform the actions for the instruction as
    // outlined in the LS-8 spec.

    // !!! IMPLEMENT ME
    const instBin = `0b${IR.toString(2).padStart(8, 0)}`;
    const argNum = Number(instBin) >> 6;
    // const isALU = (instBin && '0b00100000') >> 5;
    // const category = (instBin && '0b00011000') >> 3;
    // const instruction = (instBin && '0b00000111');
    
    switch (instBin) {
      case HLT:
        this.stopClock();
        break;
      case LDI:
        this.reg[operandA] = operandB;
        break;
      case MUL:
        this.alu('MUL', operandA, operandB);
        break;
      case PUSH:
        this.reg[7] = this.reg[operandA];
        this.ram.write(--this.SP, operandA);
        break;
      case PRN:
        console.log(this.reg[operandA]);
        break;
      default:
        // console.log(instBin, argNum);
    }

    // Increment the PC register to go to the next instruction. Instructions
    // can be 1, 2, or 3 bytes long. Hint: the high 2 bits of the
    // instruction byte tells you how many bytes follow the instruction byte
    // for any particular instruction.
    
    // !!! IMPLEMENT ME
    this.PC += argNum + 1;
  }
}

module.exports = CPU;
