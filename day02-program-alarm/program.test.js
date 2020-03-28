import { expect } from 'chai'

import { addOp, getSet, multiplyOp, restoreState, runProgram } from './program'

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

    describe.skip('runProgram', function() {
        it('TODO: add tests', function() {
            runProgram()
        })
    })
})
