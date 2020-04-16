import { userInput } from '../utils/input'
import { opcode, opLength, parameterMode } from './constants'

class Computer {
    pointer = 0
    end = false
    program = []

    opcode = () => {
        const instruction = String(this.program[this.pointer]).padStart(5, '0')
        const op = Number(instruction.slice(3))
        const param1 = Number(instruction[2])
        const param2 = Number(instruction[1])
        const param3 = Number(instruction[0])
        return [op, param1, param2, param3]
    }

    next = length => {
        this.pointer += length
    }

    addOp = (param1 = 0, param2 = 0) => {
        const length = opLength.add
        const start = this.pointer + 1
        const end = this.pointer + length
        const positions = this.program.slice(start, end)
        const [position1, position2, destination] = positions

        let value1 = this.program[position1]
        if (param1 === parameterMode.immediate) {
            value1 = position1
        }
        let value2 = this.program[position2]
        if (param2 === parameterMode.immediate) {
            value2 = position2
        }
        this.program[destination] = value1 + value2
        return length
    }

    multiplyOp = (param1 = 0, param2 = 0) => {
        const length = opLength.multiply
        const start = this.pointer + 1
        const end = this.pointer + length
        const positions = this.program.slice(start, end)
        const [position1, position2, destination] = positions

        let value1 = this.program[position1]
        if (param1 === parameterMode.immediate) {
            value1 = position1
        }
        let value2 = this.program[position2]
        if (param2 === parameterMode.immediate) {
            value2 = position2
        }
        this.program[destination] = value1 * value2
        return length
    }

    inputOp = async () => {
        const length = opLength.input
        const start = this.pointer + 1
        const end = this.pointer + length
        const positions = this.program.slice(start, end)
        const [destination] = positions

        const input = await userInput('input: ')
        this.program[destination] = Number(input)
        return length
    }

    outputOp = (param1 = 0) => {
        const length = opLength.output
        const start = this.pointer + 1
        const end = this.pointer + length
        const positions = this.program.slice(start, end)
        const [position] = positions

        let value = this.program[position]
        if (param1 === parameterMode.immediate) {
            value = position
        }
        console.log(value)
        return length
    }

    jumpTrueOp = (param1, param2) => {
        let length = opLength.jumpTrue
        const start = this.pointer + 1
        const end = this.pointer + length
        const positions = this.program.slice(start, end)
        const [position1, position2] = positions

        let value1 = this.program[position1]
        if (param1 === parameterMode.immediate) {
            value1 = position1
        }
        let value2 = this.program[position2]
        if (param2 === parameterMode.immediate) {
            value2 = position2
        }

        if (value1 !== 0) {
            this.pointer = value2
            length = 0
        }
        return length
    }

    jumpFalseOp = (param1, param2) => {
        let length = opLength.jumpFalse
        const start = this.pointer + 1
        const end = this.pointer + length
        const positions = this.program.slice(start, end)
        const [position1, position2] = positions

        let value1 = this.program[position1]
        if (param1 === parameterMode.immediate) {
            value1 = position1
        }
        let value2 = this.program[position2]
        if (param2 === parameterMode.immediate) {
            value2 = position2
        }

        if (value1 === 0) {
            this.pointer = value2
            length = 0
        }
        return length
    }

    lessThanOp = (param1, param2) => {
        const length = opLength.lessThan
        const start = this.pointer + 1
        const end = this.pointer + length
        const positions = this.program.slice(start, end)
        const [position1, position2, destination] = positions

        let value1 = this.program[position1]
        if (param1 === parameterMode.immediate) {
            value1 = position1
        }
        let value2 = this.program[position2]
        if (param2 === parameterMode.immediate) {
            value2 = position2
        }
        this.program[destination] = Number(value1 < value2)
        return length
    }

    equalOp = (param1, param2) => {
        const length = opLength.lessThan
        const start = this.pointer + 1
        const end = this.pointer + length
        const positions = this.program.slice(start, end)
        const [position1, position2, destination] = positions

        let value1 = this.program[position1]
        if (param1 === parameterMode.immediate) {
            value1 = position1
        }
        let value2 = this.program[position2]
        if (param2 === parameterMode.immediate) {
            value2 = position2
        }
        this.program[destination] = Number(value1 === value2)
        return length
    }

    endOp = () => {
        this.end = true
        return opLength.end
    }

    execute = async () => {
        const param = this.opcode()
        const op = param.shift()

        let opFn = () => 1
        if (op === opcode.add) {
            opFn = this.addOp
        } else if (op === opcode.multiply) {
            opFn = this.multiplyOp
        } else if (op === opcode.input) {
            opFn = this.inputOp
        } else if (op === opcode.output) {
            opFn = this.outputOp
        } else if (op === opcode.end) {
            opFn = this.endOp
        } else if (op === opcode.jumpTrue) {
            opFn = this.jumpTrueOp
        } else if (op === opcode.jumpFalse) {
            opFn = this.jumpFalseOp
        } else if (op === opcode.lessThan) {
            opFn = this.lessThanOp
        } else if (op === opcode.equal) {
            opFn = this.equalOp
        }
        const length = await opFn(...param)
        this.next(length)
    }

    run = async program => {
        this.program = program

        while (this.end !== true) {
            await this.execute()
        }
    }

    reset = () => {
        this.pointer = 0
        this.end = false
        this.program = []
    }
}

const computer = new Computer()
export default computer
