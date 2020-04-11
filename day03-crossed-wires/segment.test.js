import { expect } from 'chai'

import Segment from './segment'

describe('Segment Class', function() {
    describe('Constructor', function() {
        let x1
        let x2
        let y1
        let y2
        let segment

        before(function() {
            x1 = 1
            x2 = 2
            y1 = 3
            y2 = 4
            segment = new Segment(x1, x2, y1, y2)
        })

        it('Sets up x1 properly', function() {
            expect(segment.x1).to.equal(x1)
        })

        it('Sets up x2 properly', function() {
            expect(segment.x2).to.equal(x2)
        })

        it('Sets up y1 properly', function() {
            expect(segment.y1).to.equal(y1)
        })
        it('Sets up y2 properly', function() {
            expect(segment.y2).to.equal(y2)
        })
    })
})
