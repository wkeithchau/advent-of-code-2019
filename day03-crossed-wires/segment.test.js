import { expect } from 'chai'

import { orientation } from './constants'
import Segment from './segment'

describe('Segment Class', function() {
    describe('Constructor', function() {
        let pointA
        let pointB
        let direction
        let initial
        let segment

        before(function() {
            pointA = { x: 1, y: 3 }
            pointB = { x: 2, y: 4 }
            direction = orientation.right
            initial = 44
            segment = new Segment(pointA, pointB, direction, initial)
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

        it('Sets up direction', function() {
            expect(segment.direction).to.equal(direction)
        })

        it('Sets up initial', function() {
            expect(segment.initial).to.equal(initial)
        })
    })

    describe('steps', function() {
        let pointA
        let pointB
        let initial

        before(function() {
            pointA = { x: 1, y: 2 }
            pointB = { x: 6, y: 7 }
            initial = 44
        })

        it('Returns undefined when direction is not provided', function() {
            const segment = new Segment(pointA, pointB, undefined, initial)
            const steps = segment.steps()
            expect(steps).to.be.undefined
        })

        it('Returns undefined when initial is not provided', function() {
            const segment = new Segment(pointA, pointB, orientation.up)
            const steps = segment.steps()
            expect(steps).to.be.undefined
        })

        it('Returns length of segment when no argument is provided', function() {
            const segment = new Segment(pointA, pointB, orientation.up, initial)
            const steps = segment.steps()
            expect(steps).to.equal(initial + 5)
        })

        it('Returns distance from starting point when travelling left', function() {
            const segment = new Segment(
                pointA,
                pointB,
                orientation.left,
                initial
            )
            const steps = segment.steps(2)
            expect(steps).to.equal(initial + 4)
        })

        it('Returns distance from starting point when travelling right', function() {
            const segment = new Segment(
                pointA,
                pointB,
                orientation.right,
                initial
            )
            const steps = segment.steps(2)
            expect(steps).to.equal(initial + 1)
        })

        it('Returns distance from starting point when travelling up', function() {
            const segment = new Segment(pointA, pointB, orientation.up, initial)
            const steps = segment.steps(6)
            expect(steps).to.equal(initial + 4)
        })

        it('Returns distance from starting point when travelling down', function() {
            const segment = new Segment(
                pointA,
                pointB,
                orientation.down,
                initial
            )
            const steps = segment.steps(6)
            expect(steps).to.equal(initial + 1)
        })

        it('Returns undefined when specified point is below segment x range', function() {
            const segment = new Segment(
                pointA,
                pointB,
                orientation.left,
                initial
            )
            const steps = segment.steps(0)
            expect(steps).to.undefined
        })

        it('Returns undefined when specified point is above segment x range', function() {
            const segment = new Segment(
                pointA,
                pointB,
                orientation.right,
                initial
            )
            const steps = segment.steps(7)
            expect(steps).to.undefined
        })

        it('Returns undefined when specified point is below segment y range', function() {
            const segment = new Segment(pointA, pointB, orientation.up, initial)
            const steps = segment.steps(8)
            expect(steps).to.undefined
        })

        it('Returns undefined when specified point is above segment y range', function() {
            const segment = new Segment(
                pointA,
                pointB,
                orientation.down,
                initial
            )
            const steps = segment.steps(1)
            expect(steps).to.undefined
        })
    })
})
