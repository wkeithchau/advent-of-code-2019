import { expect } from 'chai'

import {
    hasAccendingDigits,
    hasDouble,
    hasStrictDouble,
    hasSixDigits,
    isWithinRange,
    meetCriteria,
} from './password'

describe('Day04 - Secure Container', function() {
    describe('hasSixDigits', function() {
        it('Returns true when number has 6 digits', function() {
            const number = 123456
            const result = hasSixDigits(number)
            expect(result).to.be.true
        })

        it('Returns false when number has less than 6 digits', function() {
            const number = 12345
            const result = hasSixDigits(number)
            expect(result).to.be.false
        })

        it('Returns false when number has more than 6 digits', function() {
            const number = 1234567
            const result = hasSixDigits(number)
            expect(result).to.be.false
        })
    })

    describe('isWithinRange', function() {
        it('Returns true when number is inside range', function() {
            const range = [100001, 200000]
            const number = 123456
            const result = isWithinRange(number, range)
            expect(result).to.be.true
        })

        it('Returns true when number is on the lower range boundary', function() {
            const range = [100001, 200000]
            const number = 100001
            const result = isWithinRange(number, range)
            expect(result).to.be.true
        })

        it('Returns true when number is on the upper range boundary', function() {
            const range = [100001, 200000]
            const number = 200000
            const result = isWithinRange(number, range)
            expect(result).to.be.true
        })

        it('Returns false when number is outside the lower range boundary', function() {
            const range = [100001, 200000]
            const number = 100000
            const result = isWithinRange(number, range)
            expect(result).to.be.false
        })

        it('Returns false when number is outside the upper range boundary', function() {
            const range = [100001, 200000]
            const number = 200001
            const result = isWithinRange(number, range)
            expect(result).to.be.false
        })
    })

    describe('hasDouble', function() {
        it('Returns true when there is one adjacent digit that is duplicated', function() {
            const number = 122345
            const result = hasDouble(number)
            expect(result).to.be.true
        })

        it('Returns true when there is more than one adjacent digit that is duplicated', function() {
            const number = 122234
            const result = hasDouble(number)
            expect(result).to.be.true
        })

        it('Returns false when there is no adjacent digit that is duplicated', function() {
            const number = 123456
            const result = hasDouble(number)
            expect(result).to.be.false
        })
    })

    describe('hasStrictDouble', function() {
        it('Returns true when all doubles are unique', function() {
            const number = 112233
            const result = hasStrictDouble(number)
            expect(result).to.be.true
        })

        it('Returns false when doubles are in group more than 3', function() {
            const number = 123444
            const result = hasStrictDouble(number)
            expect(result).to.be.false
        })

        it('Returns true when doubles are in pairs', function() {
            const number = 111122
            const result = hasStrictDouble(number)
            expect(result).to.be.true
        })
    })

    describe('hasAccendingDigits', function() {
        it('Returns true when all digits are in accending order', function() {
            const number = 122345
            const result = hasAccendingDigits(number)
            expect(result).to.be.true
        })

        it('Returns false when the second digit breaks accending order', function() {
            const number = 101234
            const result = hasAccendingDigits(number)
            expect(result).to.be.false
        })

        it('Returns false when the third digit breaks accending order', function() {
            const number = 120123
            const result = hasAccendingDigits(number)
            expect(result).to.be.false
        })

        it('Returns false when the fourth digit breaks accending order', function() {
            const number = 123012
            const result = hasAccendingDigits(number)
            expect(result).to.be.false
        })

        it('Returns false when the fifth digit breaks accending order', function() {
            const number = 123401
            const result = hasAccendingDigits(number)
            expect(result).to.be.false
        })

        it('Returns false when the sixth digit breaks accending order', function() {
            const number = 123450
            const result = hasAccendingDigits(number)
            expect(result).to.be.false
        })

        it('Sample test 1 - 111123 returns true', function() {
            const number = 111123
            const result = hasAccendingDigits(number)
            expect(result).to.be.true
        })

        it('Sample test 2 - 135679 returns true', function() {
            const number = 111123
            const result = hasAccendingDigits(number)
            expect(result).to.be.true
        })
    })

    describe('meetCriteria', function() {
        describe('Basic Double', function() {
            it('Sample test 1 - 111111 passes', function() {
                const range = [100000, 999999]
                const number = 111111
                const result = meetCriteria(number, range)
                expect(result).to.be.true
            })

            it('Sample test 2 - 223450 fails', function() {
                const range = [100000, 999999]
                const number = 223450
                const result = meetCriteria(number, range)
                expect(result).to.be.false
            })

            it('Sample test 3 - 123789 fails', function() {
                const range = [100000, 999999]
                const number = 123789
                const result = meetCriteria(number, range)
                expect(result).to.be.false
            })
        })

        describe('Strict Double', function() {
            it('111111 fails', function() {
                const range = [100000, 999999]
                const number = 111111
                const result = meetCriteria(number, range, 'strict')
                expect(result).to.be.false
            })

            it('222455 passes', function() {
                const range = [100000, 999999]
                const number = 222455
                const result = meetCriteria(number, range, 'strict')
                expect(result).to.be.true
            })

            it('222289 fails', function() {
                const range = [100000, 999999]
                const number = 222289
                const result = meetCriteria(number, range, 'strict')
                expect(result).to.be.false
            })
        })
    })

    describe('Overall Sample Tests', function() {
        it('Sample test 1 - 111111 meets these criteria', function() {
            const number = 111111
            const sixDigits = hasSixDigits(number)
            const double = hasDouble(number)
            const accending = hasAccendingDigits(number)
            expect(sixDigits).to.be.true
            expect(double).to.be.true
            expect(accending).to.be.true
        })

        it('Sample test 2 - 223450 fails accending order', function() {
            const number = 223450
            const sixDigits = hasSixDigits(number)
            const double = hasDouble(number)
            const accending = hasAccendingDigits(number)
            expect(sixDigits).to.be.true
            expect(double).to.be.true
            expect(accending).to.be.false
        })

        it('Sample test 3 - 123789 fails double', function() {
            const number = 123789
            const sixDigits = hasSixDigits(number)
            const double = hasDouble(number)
            const accending = hasAccendingDigits(number)
            expect(sixDigits).to.be.true
            expect(double).to.be.false
            expect(accending).to.be.true
        })
    })
})
