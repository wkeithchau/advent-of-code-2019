import { expect } from 'chai'
import readline from 'readline'
import sinon from 'sinon'

import { opLength } from './constants'
import Computer from './computer'

describe('Computer Class', function() {
    let stubs

    before(function() {
        stubs = []
    })

    beforeEach(function() {
        Computer.reset()
    })

    afterEach(function() {
        while (stubs.length !== 0) {
            const spy = stubs.shift()
            spy.restore()
        }
    })

    describe('opcode', function() {
        it('Returns the opcode in first element of the array', function() {
            Computer.program = [2]
            const code = Computer.opcode()
            const op = code[0]
            expect(op).to.equal(2)
        })

        it('Sets default value of 0 for param1 in second element of the array', function() {
            Computer.program = [2]
            const code = Computer.opcode()
            const param1 = code[1]
            expect(param1).to.equal(0)
        })

        it('Sets default value of 0 for param2 in third element of the array', function() {
            Computer.program = [2]
            const code = Computer.opcode()
            const param2 = code[2]
            expect(param2).to.equal(0)
        })

        it('Sets default value of 0 for param3 in fourth element of the array', function() {
            Computer.program = [2]
            const code = Computer.opcode()
            const param3 = code[3]
            expect(param3).to.equal(0)
        })
    })

    describe('next', function() {
        it('Increments the pointer based on the argument provided', function() {
            const initialPointer = Computer.pointer
            const length = 2
            Computer.next(length)
            const pointer = Computer.pointer
            expect(initialPointer).to.equal(0)
            expect(pointer).to.equal(length)
        })
    })

    describe('addOp', function() {
        it('param1 position mode and param2 position mode', function() {
            Computer.program = [1, 4, 5, 6, 8, 10, 0]
            Computer.addOp(0, 0)
            const destValue = Computer.program[6]
            expect(destValue).to.equal(18)
        })

        it('param1 immediate mode and param2 position mode', function() {
            Computer.program = [11, 4, 5, 6, 8, 10, 0]
            Computer.addOp(1, 0)
            const destValue = Computer.program[6]
            expect(destValue).to.equal(14)
        })

        it('param1 position mode and param2 immediate mode', function() {
            Computer.program = [101, 4, 5, 6, 8, 10, 0]
            Computer.addOp(0, 1)
            const destValue = Computer.program[6]
            expect(destValue).to.equal(13)
        })

        it('param1 immediate mode and param2 immediate mode', function() {
            Computer.program = [111, 4, 5, 6, 8, 10, 0]
            Computer.addOp(1, 1)
            const destValue = Computer.program[6]
            expect(destValue).to.equal(9)
        })

        it('Returns instruction length of 4', function() {
            Computer.program = [1, 4, 5, 6, 8, 10, 0]
            const length = Computer.addOp(0, 0)
            expect(length).to.equal(opLength.add)
        })

        it('Sample test 1: 1,9,10,3', function() {
            Computer.program = [1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50]
            Computer.addOp()
            const endProgram = [1, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50]
            expect(Computer.program).to.have.members(endProgram)
        })
    })

    describe('multiplyOp', function() {
        it('param1 position mode and param2 position mode', function() {
            Computer.program = [1, 4, 5, 6, 6, 10, 0]
            Computer.multiplyOp(0, 0)
            const destValue = Computer.program[6]
            expect(destValue).to.equal(60)
        })

        it('param1 immediate mode and param2 position mode', function() {
            Computer.program = [11, 4, 5, 6, 6, 10, 0]
            Computer.multiplyOp(1, 0)
            const destValue = Computer.program[6]
            expect(destValue).to.equal(40)
        })

        it('param1 position mode and param2 immediate mode', function() {
            Computer.program = [101, 4, 5, 6, 6, 10, 0]
            Computer.multiplyOp(0, 1)
            const destValue = Computer.program[6]
            expect(destValue).to.equal(30)
        })

        it('param1 immediate mode and param2 immediate mode', function() {
            Computer.program = [111, 4, 5, 6, 6, 10, 0]
            Computer.multiplyOp(1, 1)
            const destValue = Computer.program[6]
            expect(destValue).to.equal(20)
        })

        it('Returns instruction length of 4', function() {
            Computer.program = [1, 4, 5, 6, 6, 10, 0]
            const length = Computer.multiplyOp(0, 0)
            expect(length).to.equal(opLength.multiply)
        })

        it('Sample test 1: 2,3,11,0', function() {
            Computer.program = [1, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50]
            Computer.pointer = 4
            Computer.multiplyOp()
            const endProgram = [3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50]
            expect(Computer.program).to.have.members(endProgram)
        })

        it('Sample test 2: 1002,4,3,4,33', function() {
            Computer.program = [1002, 4, 3, 4, 33]
            Computer.multiplyOp(0, 1)
            const endProgram = [1002, 4, 3, 4, 99]
            expect(Computer.program).to.have.members(endProgram)
        })
    })

    describe('inputOp', function() {
        it('Prints out `input: ` asking for user input', async function() {
            let print
            let input = 99
            const readlineStub = sinon
                .stub(readline, 'createInterface')
                .callsFake(() => ({
                    question: (question, callback) => {
                        print = question
                        callback(input)
                    },
                    close: () => {},
                }))
            stubs.push(readlineStub)

            Computer.program = [3, 2, 0]
            await Computer.inputOp()
            expect(print).to.equal('input: ')
        })

        it('Places the input into destination', async function() {
            let input = 99
            const readlineStub = sinon
                .stub(readline, 'createInterface')
                .callsFake(() => ({
                    question: (question, callback) => {
                        callback(input)
                    },
                    close: () => {},
                }))
            stubs.push(readlineStub)

            Computer.program = [3, 2, 0]
            await Computer.inputOp()
            const destValue = Computer.program[2]
            expect(destValue).to.equal(input)
        })

        it('Returns instruction length of 2', async function() {
            const readlineStub = sinon
                .stub(readline, 'createInterface')
                .callsFake(() => ({
                    question: (question, callback) => {
                        callback()
                    },
                    close: () => {},
                }))
            stubs.push(readlineStub)

            Computer.program = [3, 2, 0]
            const length = await Computer.inputOp()
            expect(length).to.equal(opLength.input)
        })
    })

    describe('outputOp', function() {
        it('param1 position mode', function() {
            const consoleStub = sinon.stub(console, 'log')
            stubs.push(consoleStub)

            const output = 0
            Computer.program = [4, 2, output]
            Computer.outputOp(0)
            expect(consoleStub.calledOnceWith(output)).to.be.true
        })

        it('param1 immediate mode', function() {
            const consoleStub = sinon.stub(console, 'log')
            stubs.push(consoleStub)

            const position = 2
            Computer.program = [104, position, 0]
            Computer.outputOp(1)
            expect(consoleStub.calledOnceWith(position)).to.be.true
        })

        it('Returns instruction length of 2', async function() {
            const consoleStub = sinon.stub(console, 'log')
            stubs.push(consoleStub)

            Computer.program = [4, 2, 0]
            const length = Computer.outputOp()
            expect(length).to.equal(opLength.output)
        })
    })

    describe('jumpTrueOp', function() {
        it('param1 position mode is a non-zero value with param2 position mode', function() {
            Computer.program = [5, 3, 4, 3, 10]
            Computer.jumpTrueOp(0, 0)
            const pointer = Computer.pointer
            expect(pointer).to.equal(10)
        })

        it('param1 immediate mode is a non-zero value with param2 position mode', function() {
            Computer.program = [15, 3, 4, 3, 10]
            Computer.jumpTrueOp(1, 0)
            const pointer = Computer.pointer
            expect(pointer).to.equal(10)
        })

        it('param1 position mode is a non-zero value with param2 immediate mode', function() {
            Computer.program = [105, 3, 4, 3, 10]
            Computer.jumpTrueOp(0, 1)
            const pointer = Computer.pointer
            expect(pointer).to.equal(4)
        })

        it('param1 immediate mode is a non-zero value with param2 immediate mode', function() {
            Computer.program = [115, 3, 4, 3, 10]
            Computer.jumpTrueOp(1, 1)
            const pointer = Computer.pointer
            expect(pointer).to.equal(4)
        })

        it('param1 position mode is not a non-zero value with param2 position mode', function() {
            Computer.program = [0, 0, 4, 3, 10]
            Computer.pointer = -1
            Computer.jumpTrueOp(0, 0)
            const pointer = Computer.pointer
            expect(pointer).to.equal(-1)
        })

        it('param1 immediate mode is not a non-zero value with param2 position mode', function() {
            Computer.program = [0, 0, 4, 3, 10]
            Computer.pointer = -1
            Computer.jumpTrueOp(1, 0)
            const pointer = Computer.pointer
            expect(pointer).to.equal(-1)
        })

        it('param1 position mode is not a non-zero value with param2 immediate mode', function() {
            Computer.program = [0, 0, 4, 3, 10]
            Computer.pointer = -1
            Computer.jumpTrueOp(0, 1)
            const pointer = Computer.pointer
            expect(pointer).to.equal(-1)
        })

        it('param1 immediate mode is not a non-zero value with param2 immediate mode', function() {
            Computer.program = [0, 0, 4, 3, 10]
            Computer.pointer = -1
            Computer.jumpTrueOp(1, 1)
            const pointer = Computer.pointer
            expect(pointer).to.equal(-1)
        })

        it('Returns instruction length of 0 when true', function() {
            Computer.program = [5, 3, 4, 3, 10]
            const length = Computer.jumpTrueOp(0, 0)
            expect(length).to.equal(0)
        })

        it('Returns instruction length of 3 when false', function() {
            Computer.program = [0, 0, 4, 3, 10]
            const length = Computer.jumpTrueOp(0, 0)
            expect(length).to.equal(opLength.jumpTrue)
        })
    })

    describe('jumpFalseOp', function() {
        it('param1 position mode is a zero value with param2 position mode', function() {
            Computer.program = [0, 0, 4, 3, 10]
            Computer.jumpFalseOp(0, 0)
            const pointer = Computer.pointer
            expect(pointer).to.equal(10)
        })

        it('param1 immediate mode is a zero value with param2 position mode', function() {
            Computer.program = [0, 0, 4, 3, 10]
            Computer.jumpFalseOp(1, 0)
            const pointer = Computer.pointer
            expect(pointer).to.equal(10)
        })

        it('param1 position mode is a zero value with param2 immediate mode', function() {
            Computer.program = [0, 0, 4, 3, 10]
            Computer.jumpFalseOp(0, 1)
            const pointer = Computer.pointer
            expect(pointer).to.equal(4)
        })

        it('param1 immediate mode is a zero value with param2 immediate mode', function() {
            Computer.program = [0, 0, 4, 3, 10]
            Computer.jumpFalseOp(1, 1)
            const pointer = Computer.pointer
            expect(pointer).to.equal(4)
        })

        it('param1 position mode is not a zero value with param2 position mode', function() {
            Computer.program = [6, 3, 4, 3, 10]
            Computer.pointer = -1
            Computer.jumpFalseOp(0, 0)
            const pointer = Computer.pointer
            expect(pointer).to.equal(-1)
        })

        it('param1 immediate mode is not a zero value with param2 position mode', function() {
            Computer.program = [16, 3, 4, 3, 10]
            Computer.pointer = -1
            Computer.jumpFalseOp(1, 0)
            const pointer = Computer.pointer
            expect(pointer).to.equal(-1)
        })

        it('param1 position mode is not a zero value with param2 immediate mode', function() {
            Computer.program = [106, 3, 4, 3, 10]
            Computer.pointer = -1
            Computer.jumpFalseOp(0, 1)
            const pointer = Computer.pointer
            expect(pointer).to.equal(-1)
        })

        it('param1 immediate mode is not a zero value with param2 immediate mode', function() {
            Computer.program = [116, 3, 4, 3, 10]
            Computer.pointer = -1
            Computer.jumpFalseOp(1, 1)
            const pointer = Computer.pointer
            expect(pointer).to.equal(-1)
        })

        it('Returns instruction length of 0 when true', function() {
            Computer.program = [0, 0, 4, 3, 10]
            const length = Computer.jumpFalseOp(0, 0)
            expect(length).to.equal(0)
        })

        it('Returns instruction length of 3 when false', function() {
            Computer.program = [5, 3, 4, 3, 10]
            const length = Computer.jumpFalseOp(0, 0)
            expect(length).to.equal(opLength.jumpFalse)
        })
    })

    describe('lessThanOp', function() {
        it('param1 position mode is less than param2 position mode', function() {
            Computer.program = [7, 4, 5, 6, 3, 10, 0]
            Computer.lessThanOp(0, 0)
            const destValue = Computer.program[6]
            expect(destValue).to.equal(1)
        })

        it('param1 immediate mode is less than param2 position mode', function() {
            Computer.program = [17, 4, 5, 6, 3, 10, 0]
            Computer.lessThanOp(1, 0)
            const destValue = Computer.program[6]
            expect(destValue).to.equal(1)
        })

        it('param1 position mode is less than param2 immediate mode', function() {
            Computer.program = [107, 4, 5, 6, 3, 10, 0]
            Computer.lessThanOp(0, 1)
            const destValue = Computer.program[6]
            expect(destValue).to.equal(1)
        })

        it('param1 immediate mode is less than param2 immediate mode', function() {
            Computer.program = [117, 4, 5, 6, 3, 10, 0]
            Computer.lessThanOp(1, 1)
            const destValue = Computer.program[6]
            expect(destValue).to.equal(1)
        })

        it('param1 position mode is not less than param2 position mode', function() {
            Computer.program = [7, 5, 4, 6, 3, 10, 0]
            Computer.lessThanOp(0, 0)
            const destValue = Computer.program[6]
            expect(destValue).to.equal(0)
        })

        it('param1 immediate mode is not less than param2 position mode', function() {
            Computer.program = [17, 5, 4, 6, 3, 10, 0]
            Computer.lessThanOp(1, 0)
            const destValue = Computer.program[6]
            expect(destValue).to.equal(0)
        })

        it('param1 position mode is not less than param2 immediate mode', function() {
            Computer.program = [107, 5, 4, 6, 3, 10, 0]
            Computer.lessThanOp(0, 1)
            const destValue = Computer.program[6]
            expect(destValue).to.equal(0)
        })

        it('param1 immediate mode is not less than param2 immediate mode', function() {
            Computer.program = [117, 5, 4, 6, 3, 10, 0]
            Computer.lessThanOp(1, 1)
            const destValue = Computer.program[6]
            expect(destValue).to.equal(0)
        })

        it('Returns instruction length of 4', function() {
            Computer.program = [7, 4, 5, 6, 3, 10, 0]
            const length = Computer.lessThanOp(0, 0)
            expect(length).to.equal(opLength.lessThan)
        })
    })

    describe('equalOp', function() {
        it('param1 position mode is equal param2 position mode', function() {
            Computer.program = [8, 4, 4, 6, 4, 4, 0]
            Computer.equalOp(0, 0)
            const destValue = Computer.program[6]
            expect(destValue).to.equal(1)
        })

        it('param1 immediate mode is equal param2 position mode', function() {
            Computer.program = [18, 4, 4, 6, 4, 4, 0]
            Computer.equalOp(1, 0)
            const destValue = Computer.program[6]
            expect(destValue).to.equal(1)
        })

        it('param1 position mode is equal param2 immediate mode', function() {
            Computer.program = [108, 4, 4, 6, 4, 4, 0]
            Computer.equalOp(0, 1)
            const destValue = Computer.program[6]
            expect(destValue).to.equal(1)
        })

        it('param1 immediate mode is equal param2 immediate mode', function() {
            Computer.program = [118, 4, 4, 6, 4, 4, 0]
            Computer.equalOp(1, 1)
            const destValue = Computer.program[6]
            expect(destValue).to.equal(1)
        })

        it('param1 position mode is not equal param2 position mode', function() {
            Computer.program = [8, 5, 4, 6, 3, 10, 0]
            Computer.equalOp(0, 0)
            const destValue = Computer.program[6]
            expect(destValue).to.equal(0)
        })

        it('param1 immediate mode is not equal param2 position mode', function() {
            Computer.program = [18, 5, 4, 6, 3, 10, 0]
            Computer.equalOp(1, 0)
            const destValue = Computer.program[6]
            expect(destValue).to.equal(0)
        })

        it('param1 position mode is not equal param2 immediate mode', function() {
            Computer.program = [108, 5, 4, 6, 3, 10, 0]
            Computer.equalOp(0, 1)
            const destValue = Computer.program[6]
            expect(destValue).to.equal(0)
        })

        it('param1 immediate mode is not equal param2 immediate mode', function() {
            Computer.program = [118, 5, 4, 6, 3, 10, 0]
            Computer.equalOp(1, 1)
            const destValue = Computer.program[6]
            expect(destValue).to.equal(0)
        })

        it('Returns instruction length of 4', function() {
            Computer.program = [8, 4, 5, 6, 3, 10, 0]
            const length = Computer.equalOp(0, 0)
            expect(length).to.equal(opLength.equal)
        })
    })

    describe('endOp', function() {
        it('Sets end to true', function() {
            Computer.program = [99]
            const initialEnd = Computer.end
            Computer.endOp()
            const end = Computer.end
            expect(initialEnd).to.be.false
            expect(end).to.be.true
        })

        it('Returns instruction length of 1', function() {
            Computer.program = [99]
            const length = Computer.endOp()
            expect(length).to.equal(opLength.end)
        })
    })

    describe('execute', function() {
        it('Calls addOp when opcode is 1', async function() {
            const addStub = sinon.stub(Computer, 'addOp')
            stubs.push(addStub)

            Computer.program = [1]
            await Computer.execute()
            expect(addStub.calledOnce).to.be.true
        })

        it('Calls multiplyOp when opcode is 2', async function() {
            const multiplyStub = sinon.stub(Computer, 'multiplyOp')
            stubs.push(multiplyStub)

            Computer.program = [2]
            await Computer.execute()
            expect(multiplyStub.calledOnce).to.be.true
        })

        it('Calls inputOp when opcode is 3', async function() {
            const inputStub = sinon.stub(Computer, 'inputOp')
            stubs.push(inputStub)

            Computer.program = [3]
            await Computer.execute()
            expect(inputStub.calledOnce).to.be.true
        })

        it('Calls outputOp when opcode is 4', async function() {
            const outputStub = sinon.stub(Computer, 'outputOp')
            stubs.push(outputStub)

            Computer.program = [4]
            await Computer.execute()
            expect(outputStub.calledOnce).to.be.true
        })

        it('Calls jumpTrueOp when opcode is 5', async function() {
            const jumpTrueStub = sinon.stub(Computer, 'jumpTrueOp')
            stubs.push(jumpTrueStub)

            Computer.program = [5]
            await Computer.execute()
            expect(jumpTrueStub.calledOnce).to.be.true
        })

        it('Calls jumpFalseOp when opcode is 6', async function() {
            const jumpFalseStub = sinon.stub(Computer, 'jumpFalseOp')
            stubs.push(jumpFalseStub)

            Computer.program = [6]
            await Computer.execute()
            expect(jumpFalseStub.calledOnce).to.be.true
        })

        it('Calls lessThanOp when opcode is 7', async function() {
            const lessThanStub = sinon.stub(Computer, 'lessThanOp')
            stubs.push(lessThanStub)

            Computer.program = [7]
            await Computer.execute()
            expect(lessThanStub.calledOnce).to.be.true
        })

        it('Calls equalOp when opcode is 8', async function() {
            const equalStub = sinon.stub(Computer, 'equalOp')
            stubs.push(equalStub)

            Computer.program = [8]
            await Computer.execute()
            expect(equalStub.calledOnce).to.be.true
        })

        it('Calls endOp when opcode is 99', async function() {
            const endStub = sinon.stub(Computer, 'endOp')
            stubs.push(endStub)

            Computer.program = [99]
            await Computer.execute()
            expect(endStub.calledOnce).to.be.true
        })

        it('Calls next', async function() {
            const nextStub = sinon.stub(Computer, 'next')
            stubs.push(nextStub)

            Computer.program = [0]
            await Computer.execute()
            expect(nextStub.calledOnce).to.be.true
        })
    })

    describe('run', function() {
        it('Save provided argument into program', async function() {
            Computer.end = true
            const inputProgram = [1, 2, 3]
            await Computer.run(inputProgram)
            const program = Computer.program
            expect(program).to.have.ordered.members(inputProgram)
        })

        it('Finishes when it end is true', async function() {
            let callCount = 0
            const executeStub = sinon
                .stub(Computer, 'execute')
                .callsFake(() => {
                    callCount += 1
                    if (callCount >= 5) {
                        Computer.end = true
                    }
                })
            stubs.push(executeStub)

            const program = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            const initialEnd = Computer.end
            await Computer.run(program)
            const end = Computer.end
            expect(callCount).to.equal(5)
            expect(initialEnd).to.be.false
            expect(end).to.be.true
        })
    })
})
