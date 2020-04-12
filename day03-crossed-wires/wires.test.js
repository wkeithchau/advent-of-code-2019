import { expect } from 'chai'

import { closestCross, crossDistance, findCrosses } from './wires'
import Wire from './wire'
import Segment from './segment'

describe('Day03 - Crossed Wires', function() {
    describe('crossDistance', function() {
        it('Distance calculated correctly with positive x and positive y', function() {
            const x = 45
            const y = 77
            const cross = { x, y }
            const distance = crossDistance(cross)
            expect(distance).to.equal(122)
        })

        it('Distance calculated correctly with negative x and positive y', function() {
            const x = -45
            const y = 77
            const cross = { x, y }
            const distance = crossDistance(cross)
            expect(distance).to.equal(122)
        })

        it('Distance calculated correctly with positive x and negative y', function() {
            const x = 45
            const y = -77
            const cross = { x, y }
            const distance = crossDistance(cross)
            expect(distance).to.equal(122)
        })

        it('Distance calculated correctly with negative x and negative y', function() {
            const x = -45
            const y = -77
            const cross = { x, y }
            const distance = crossDistance(cross)
            expect(distance).to.equal(122)
        })
    })

    describe('findCrosses', function() {
        it('Finds one cross', function() {
            const wire1 = new Wire()
            const wire2 = new Wire()
            wire1.segments.push(new Segment({ x: -5, y: 0 }, { x: 5, y: 0 }))
            wire2.segments.push(new Segment({ x: -1, y: -5 }, { x: -1, y: 1 }))

            const crosses = findCrosses(wire1, wire2)

            expect(crosses).to.have.length(1)
            expect(crosses[0].x).to.equal(-1)
            expect(crosses[0].y).to.equal(0)
        })

        it('Finds multiple crosses', function() {
            const wire1 = new Wire()
            const wire2 = new Wire()
            wire1.segments.push(new Segment({ x: -5, y: 0 }, { x: 5, y: 0 }))
            wire1.segments.push(new Segment({ x: -5, y: -5 }, { x: 5, y: -5 }))
            wire2.segments.push(new Segment({ x: -1, y: -5 }, { x: -1, y: 1 }))
            wire2.segments.push(new Segment({ x: 2, y: -1 }, { x: 2, y: 1 }))

            const crosses = findCrosses(wire1, wire2)
            const expectedCrosses = [
                { x: -1, y: 0, distance: 1 },
                { x: 2, y: 0, distance: 2 },
                { x: -1, y: -5, distance: 6 },
            ]

            expect(crosses).to.have.length(3)
            expect(crosses).to.have.deep.members(expectedCrosses)
        })
    })

    describe('closestCross', function() {
        let cross1
        let cross2

        before(function() {
            cross1 = { x: 3, y: 3, distance: 6 }
            cross2 = { x: 10, y: 4, distance: 14 }
        })

        it('Returns cross with shortest distance', function() {
            const crosses = [cross1, cross2]
            const cross = closestCross(crosses)
            expect(cross).to.deep.equal(cross1)
        })

        it('Ignores cross at the port', function() {
            const cross0 = { x: 0, y: 0, distance: 0 }
            const crosses = [cross0, cross1, cross2]
            const cross = closestCross(crosses)
            expect(cross).to.deep.equal(cross1)
        })
    })

    describe('Sample Tests', function() {
        it('Basic sample: distance of 6', function() {
            const WIRE1 = ['R8', 'U5', 'L5', 'D3']
            const WIRE2 = ['U7', 'R6', 'D4', 'L4']
            const expectedDistance = 6

            const wire1 = new Wire()
            wire1.addSegments(WIRE1)
            const wire2 = new Wire()
            wire2.addSegments(WIRE2)

            const crosses = findCrosses(wire1, wire2)
            const cross = closestCross(crosses)
            expect(cross.distance).to.equal(expectedDistance)
        })

        it('Extended sample 1: distance of 159', function() {
            const WIRE1 = [
                'R75',
                'D30',
                'R83',
                'U83',
                'L12',
                'D49',
                'R71',
                'U7',
                'L72',
            ]
            const WIRE2 = [
                'U62',
                'R66',
                'U55',
                'R34',
                'D71',
                'R55',
                'D58',
                'R83',
            ]
            const expectedDistance = 159

            const wire1 = new Wire()
            wire1.addSegments(WIRE1)
            const wire2 = new Wire()
            wire2.addSegments(WIRE2)

            const crosses = findCrosses(wire1, wire2)
            const cross = closestCross(crosses)
            expect(cross.distance).to.equal(expectedDistance)
        })

        it('Extended sample 2: distance of 135', function() {
            const WIRE1 = [
                'R98',
                'U47',
                'R26',
                'D63',
                'R33',
                'U87',
                'L62',
                'D20',
                'R33',
                'U53',
                'R51',
            ]
            const WIRE2 = [
                'U98',
                'R91',
                'D20',
                'R16',
                'D67',
                'R40',
                'U7',
                'R15',
                'U6',
                'R7',
            ]
            const expectedDistance = 135

            const wire1 = new Wire()
            wire1.addSegments(WIRE1)
            const wire2 = new Wire()
            wire2.addSegments(WIRE2)

            const crosses = findCrosses(wire1, wire2)
            const cross = closestCross(crosses)
            expect(cross.distance).to.equal(expectedDistance)
        })
    })
})
