import { expect } from 'chai'
import sinon from 'sinon'

import { seqAmps } from './amps'

describe('Day07 - Amp Circuit', function() {
    let stubs

    before(function() {
        stubs = []
    })

    afterEach(function() {
        while (stubs.length !== 0) {
            const stub = stubs.shift()
            stub.restore()
        }
    })

    describe('seqAmps', function() {
        it('Sample test 1: max=43210 with seq=[4,3,2,1,0]', async function() {
            const program = [
                3,
                15,
                3,
                16,
                1002,
                16,
                10,
                16,
                1,
                16,
                15,
                15,
                4,
                15,
                99,
                0,
                0,
            ]
            const seq = [4, 3, 2, 1, 0]

            const consoleStub = sinon.stub(console, 'log')
            stubs.push(consoleStub)

            const result = await seqAmps(program, seq)
            expect(result).to.equal(43210)
        })

        it('Sample test 2: max=54321 with seq=[0,1,2,3,4]', async function() {
            const program = [
                3,
                23,
                3,
                24,
                1002,
                24,
                10,
                24,
                1002,
                23,
                -1,
                23,
                101,
                5,
                23,
                23,
                1,
                24,
                23,
                23,
                4,
                23,
                99,
                0,
                0,
            ]
            const seq = [0, 1, 2, 3, 4]

            const consoleStub = sinon.stub(console, 'log')
            stubs.push(consoleStub)

            const result = await seqAmps(program, seq)
            expect(result).to.equal(54321)
        })

        it('Sample test 3: max=65210 with seq=[1,0,4,3,2]', async function() {
            const program = [
                3,
                31,
                3,
                32,
                1002,
                32,
                10,
                32,
                1001,
                31,
                -2,
                31,
                1007,
                31,
                0,
                33,
                1002,
                33,
                7,
                33,
                1,
                33,
                31,
                31,
                1,
                32,
                31,
                31,
                4,
                31,
                99,
                0,
                0,
                0,
            ]
            const seq = [1, 0, 4, 3, 2]

            const consoleStub = sinon.stub(console, 'log')
            stubs.push(consoleStub)

            const result = await seqAmps(program, seq)
            expect(result).to.equal(65210)
        })
    })
})
