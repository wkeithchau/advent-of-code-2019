import { expect } from 'chai'

import { loopAmps, seqAmps } from './amps'

describe('Day07 - Amp Circuit', function() {
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
            const result = await seqAmps(program, seq)
            expect(result).to.equal(65210)
        })
    })

    describe('loopAmps', function() {
        this.timeout(5000)

        it('Sample test 1: max=139629729 with seq=[9,8,7,6,5]', async function() {
            const program = [
                3,
                26,
                1001,
                26,
                -4,
                26,
                3,
                27,
                1002,
                27,
                2,
                27,
                1,
                27,
                26,
                27,
                4,
                27,
                1001,
                28,
                -1,
                28,
                1005,
                28,
                6,
                99,
                0,
                0,
                5,
            ]
            const seq = [9, 8, 7, 6, 5]
            const result = await loopAmps(program, seq)
            expect(result).to.equal(139629729)
        })

        it('Sample test 2: max=18216 with seq=[9,7,8,5,6]', async function() {
            const program = [
                3,
                52,
                1001,
                52,
                -5,
                52,
                3,
                53,
                1,
                52,
                56,
                54,
                1007,
                54,
                5,
                55,
                1005,
                55,
                26,
                1001,
                54,
                -5,
                54,
                1105,
                1,
                12,
                1,
                53,
                54,
                53,
                1008,
                54,
                0,
                55,
                1001,
                55,
                1,
                55,
                2,
                53,
                55,
                53,
                4,
                53,
                1001,
                56,
                -1,
                56,
                1005,
                56,
                6,
                99,
                0,
                0,
                0,
                0,
                10,
            ]
            const seq = [9, 7, 8, 5, 6]
            const result = await loopAmps(program, seq)
            expect(result).to.equal(18216)
        })
    })
})
