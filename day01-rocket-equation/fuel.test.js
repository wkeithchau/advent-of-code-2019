import { expect } from 'chai'

import { advanceFuelRequired, fuelRequired, totalFuel } from './fuel'

describe('Day01 - Rocket Equation', function() {
    describe('fuelRequired', function() {
        it('Sample test 1: mass of 12 returns 2', function() {
            const fuel = fuelRequired(12)
            expect(fuel).to.equal(2)
        })

        it('Sample test 2: mass of 1969 returns 654', function() {
            const fuel = fuelRequired(1969)
            expect(fuel).to.equal(654)
        })

        it('Sample test 3: mass of 100756 returns 33583', function() {
            const fuel = fuelRequired(100756)
            expect(fuel).to.equal(33583)
        })
    })

    describe('advanceFuelRequired', function() {
        it('Sample test 1: mass of 14 returns 2', function() {
            const fuel = advanceFuelRequired(12)
            expect(fuel).to.equal(2)
        })

        it('Sample test 2: mass of 1969 returns 966', function() {
            const fuel = advanceFuelRequired(1969)
            expect(fuel).to.equal(966)
        })

        it('Sample test 3: mass of 100756 returns 50346', function() {
            const fuel = advanceFuelRequired(100756)
            expect(fuel).to.equal(50346)
        })
    })

    describe('totalFuel', function() {
        it('Sums all the values returned by the function', function() {
            const list = [1, 2, 3, 4]
            const total = totalFuel(list, value => value)
            expect(total).to.equal(10)
        })
    })
})
