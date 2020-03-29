import { expect } from 'chai'

import {
    addOp,
    findOutput,
    getAnswer,
    getSet,
    multiplyOp,
    restoreState,
    runProgram,
} from './program'

describe('Day02 - Program Alarm', function() {
    describe('addOp', function() {
        it('Sample test 1: 1,9,10,3', function() {
            const set = [9, 10, 3]
            const startProgram = [1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50]
            const endProgram = [1, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50]
            const changedProgram = addOp(startProgram, set)
            expect(changedProgram).to.have.members(endProgram)
        })
    })

    describe('multiplyOp', function() {
        it('Sample test 1: 2,3,11,0', function() {
            const set = [3, 11, 0]
            const startProgram = [1, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50]
            const endProgram = [3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50]
            const changedProgram = multiplyOp(startProgram, set)
            expect(changedProgram).to.have.members(endProgram)
        })
    })

    describe('getSet', function() {
        let program

        before(function() {
            program = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        })

        it('Gets the opcode currently', function() {
            const set = getSet(program, 0)
            const opcode = set[0]
            expect(opcode).to.equal(program[0])
        })

        it('Gets the position 1 currently', function() {
            const set = getSet(program, 0)
            const opcode = set[1]
            expect(opcode).to.equal(program[1])
        })

        it('Gets the position 2 currently', function() {
            const set = getSet(program, 0)
            const opcode = set[2]
            expect(opcode).to.equal(program[2])
        })

        it('Gets the destination position currently', function() {
            const set = getSet(program, 0)
            const opcode = set[3]
            expect(opcode).to.equal(program[3])
        })

        it('Gets the correct set based on the position provided', function() {
            const set = getSet(program, 4)
            const [opcode, pos1, pos2, des] = set
            expect(opcode).to.equal(program[4])
            expect(pos1).to.equal(program[5])
            expect(pos2).to.equal(program[6])
            expect(des).to.equal(program[7])
        })
    })

    describe('restoreState', function() {
        let program = [1, 2, 3, 4, 5, 6, 7, 8, 9]

        it('Sets the provided to the specified position', function() {
            const state = [5, 11]
            const newProgram = restoreState(program, [state])
            const pos = state[0]
            expect(newProgram[pos]).to.equal(state[1])
        })
    })

    describe('runProgram', function() {
        it('Executes add operation', function() {
            const op = [1, 2, 5, 0, 99, 3]
            const result = runProgram(op)
            expect(result[0]).to.equal(8)
        })

        it('Executes multiply operation', function() {
            const op = [2, 2, 5, 0, 99, 3]
            const result = runProgram(op)
            expect(result[0]).to.equal(15)
        })

        it('Executes multiple operations in a single run', function() {
            const op = [1, 1, 2, 0, 2, 5, 6, 0, 1, 9, 10, 0, 99]
            const result = runProgram(op)
            expect(result[0]).to.equal(19)
        })
    })

    describe('findOutput', function() {
        let results = [
            [12, 4, 5, 6],
            [55, 6, 2, 1],
            [1, 2, 3, 4],
        ]

        it('Returns empty array when no desired output is provided', function() {
            const result = findOutput(results)
            expect(result).to.be.an('array')
            expect(result).to.be.empty
        })

        it('Returns an array with 2 values', function() {
            const result = findOutput(results, [0, 1])
            expect(result).to.be.an('array')
            expect(result).to.not.be.empty
            expect(result).to.have.length(2)
        })

        it('Returns noun and verb of the desired output', function() {
            const result = findOutput(results, [0, 55])
            expect(result).to.be.an('array')
            expect(result).to.have.length(2)
            expect(result[0]).to.equal(6)
            expect(result[1]).to.equal(2)
        })
    })

    describe('getAnswer', function() {
        it('Calculates the answer correctly', function() {
            const noun = 13
            const verb = 44
            const answer = getAnswer(noun, verb)
            expect(answer).to.equal(100 * 13 + 44)
        })

        it('Expects the answer to return 0 with noun=0 and verb=0', function() {
            const noun = 0
            const verb = 0
            const answer = getAnswer(noun, verb)
            expect(answer).to.equal(0)
        })
    })
})
