import { expect } from 'chai'

import Segment from './segment'

describe('Segment Class', function() {
    describe('Constructor', function() {
        let pointA
        let pointB
        let segment

        before(function() {
            pointA = { x: 1, y: 3 }
            pointB = { x: 2, y: 4 }
            segment = new Segment(pointA, pointB)
        })

        it('Sets up x1 properly', function() {
            expect(segment.x1).to.equal(pointA.x)
        })

        it('Sets up x2 properly', function() {
            expect(segment.x2).to.equal(pointB.x)
        })

        it('Sets up y1 properly', function() {
            expect(segment.y1).to.equal(pointA.y)
        })
        it('Sets up y2 properly', function() {
            expect(segment.y2).to.equal(pointB.y)
        })
    })
})
