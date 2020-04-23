import { userInput } from '../utils/input'
import { opcode, opLength, parameterMode } from './constants'

class Computer {
    name = ''
    pointer = 0
    relativeBase = 0
    end = false
    debug = false
    logging = true
    loop = false
    program = []
    input = []
    output = []
    outputComputer = undefined

    constructor(name = '') {
        this.name = name
    }

    opcode = () => {
        const instruction = String(this.program[this.pointer]).padStart(5, '0')
        const op = Number(instruction.slice(3))
        const param1 = Number(instruction[2])
        const param2 = Number(instruction[1])
        const param3 = Number(instruction[0])
        return [op, param1, param2, param3]
    }

    getAddress = (val, param = 0) => {
        let position
        if (param === parameterMode.position) {
            position = val
        } else if (param === parameterMode.relative) {
            position = this.relativeBase + val
        }
        return position
    }

    getValue = (val, param = 0) => {
        let value
        if (param === parameterMode.position) {
            value = this.program[val]
            if (value === undefined) {
                this.program[val] = 0
                value = this.program[val]
            }
        } else if (param === parameterMode.immediate) {
            value = val
        } else if (param === parameterMode.relative) {
            const position = this.relativeBase + val
            value = this.program[position]
            if (value === undefined) {
                this.program[position] = 0
                value = this.program[position]
            }
        }
        return value
    }

    next = length => {
        this.pointer += length
    }

    addOp = (param1 = 0, param2 = 0, param3 = 0) => {
        const length = opLength.add
        const start = this.pointer + 1
        const end = this.pointer + length
        const positions = this.program.slice(start, end)
        const [position1, position2, destination] = positions

        const value1 = this.getValue(position1, param1)
        const value2 = this.getValue(position2, param2)
        const position = this.getAddress(destination, param3)
        this.program[position] = value1 + value2
        return length
    }

    multiplyOp = (param1 = 0, param2 = 0, param3 = 0) => {
        const length = opLength.multiply
        const start = this.pointer + 1
        const end = this.pointer + length
        const positions = this.program.slice(start, end)
        const [position1, position2, destination] = positions

        const value1 = this.getValue(position1, param1)
        const value2 = this.getValue(position2, param2)
        const position = this.getAddress(destination, param3)
        this.program[position] = value1 * value2
        return length
    }

    inputOp = async (param1 = 0) => {
        const length = opLength.input
        const start = this.pointer + 1
        const end = this.pointer + length
        const positions = this.program.slice(start, end)
        const [destination] = positions

        const position = this.getAddress(destination, param1)

        let input
        if (this.input.length === 0) {
            if (this.loop === true) {
                return
            }
            let question = 'input: '
            if (this.debug === true) {
                question = `${this.name} ${question}`
            }
            input = await userInput(question)
        } else {
            input = this.input.shift()
        }

        this.program[position] = Number(input)
        return length
    }

    outputOp = (param1 = 0) => {
        const length = opLength.output
        const start = this.pointer + 1
        const end = this.pointer + length
        const positions = this.program.slice(start, end)
        const [position] = positions

        const value = this.getValue(position, param1)
        if (this.logging === true) {
            let out = value
            if (this.debug === true) {
                out = `${this.name} output: ${out}`
            }
            console.log(out)
        }
        if (this.outputComputer !== undefined) {
            this.outputComputer.input.push(value)
        }
        this.output.push(value)
        return length
    }

    jumpTrueOp = (param1 = 0, param2 = 0) => {
        let length = opLength.jumpTrue
        const start = this.pointer + 1
        const end = this.pointer + length
        const positions = this.program.slice(start, end)
        const [position1, position2] = positions

        const value1 = this.getValue(position1, param1)
        const value2 = this.getValue(position2, param2)

        if (value1 !== 0) {
            this.pointer = value2
            length = 0
        }
        return length
    }

    jumpFalseOp = (param1 = 0, param2 = 0) => {
        let length = opLength.jumpFalse
        const start = this.pointer + 1
        const end = this.pointer + length
        const positions = this.program.slice(start, end)
        const [position1, position2] = positions

        const value1 = this.getValue(position1, param1)
        const value2 = this.getValue(position2, param2)

        if (value1 === 0) {
            this.pointer = value2
            length = 0
        }
        return length
    }

    lessThanOp = (param1 = 0, param2 = 0, param3 = 0) => {
        const length = opLength.lessThan
        const start = this.pointer + 1
        const end = this.pointer + length
        const positions = this.program.slice(start, end)
        const [position1, position2, destination] = positions

        const value1 = this.getValue(position1, param1)
        const value2 = this.getValue(position2, param2)
        const position = this.getAddress(destination, param3)
        this.program[position] = Number(value1 < value2)
        return length
    }

    equalOp = (param1 = 0, param2 = 0, param3 = 0) => {
        const length = opLength.lessThan
        const start = this.pointer + 1
        const end = this.pointer + length
        const positions = this.program.slice(start, end)
        const [position1, position2, destination] = positions

        const value1 = this.getValue(position1, param1)
        const value2 = this.getValue(position2, param2)
        const position = this.getAddress(destination, param3)
        this.program[position] = Number(value1 === value2)
        return length
    }

    adjustRelativeOp = (param1 = 0) => {
        const length = opLength.adjustRelative
        const start = this.pointer + 1
        const end = this.pointer + length
        const positions = this.program.slice(start, end)
        const [position] = positions

        const value = this.getValue(position, param1)
        this.relativeBase += value
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
        } else if (op === opcode.adjustRelative) {
            opFn = this.adjustRelativeOp
        } else if (op === opcode.equal) {
            opFn = this.equalOp
        }
        const length = await opFn(...param)
        if (length !== undefined) {
            this.next(length)
        }
    }

    run = async (
        program,
        input = [],
        options = { debug: false, logging: true, loop: false }
    ) => {
        this.program = program.slice()
        this.input = input.slice(0)

        if (options.debug === true) {
            this.debug = options.debug
        }

        if (options.logging === false) {
            this.logging = options.logging
        }

        if (options.loop === true) {
            this.loop = options.loop
        }

        while (this.end !== true) {
            await this.execute()
        }
        return this.output
    }

    reset = () => {
        this.name = ''
        this.pointer = 0
        this.relativeBase = 0
        this.end = false
        this.debug = false
        this.logging = true
        this.loop = false
        this.program = []
        this.input = []
        this.output = []
        this.outputComputer = undefined
    }
}

export default Computer
