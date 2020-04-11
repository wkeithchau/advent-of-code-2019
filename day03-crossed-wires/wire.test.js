import { expect } from 'chai'
import sinon from 'sinon'

import { orientation } from './constants'
import Wire from './wire'

describe('Wire Class', function() {
    let spies
    let wire

    before(function() {
        spies = []
        wire = new Wire()
    })

    beforeEach(function() {
        wire.reset()
    })

    afterEach(function() {
        while (spies.length !== 0) {
            const spy = spies.shift()
            spy.restore()
        }
    })

    describe('addLeft', function() {
        it('Adds new segment', function() {
            const length = 5
            wire.addLeft(length)
            expect(wire.segments).to.have.length(1)
        })

        it('New segment has correct coordinates', function() {
            const length = 5
            const initialXPos = wire.xPos
            wire.addLeft(length)
            const segment = wire.segments[0]
            expect(segment.x1).to.equal(-length)
            expect(segment.x2).to.equal(initialXPos)
            expect(segment.y1).to.equal(wire.yPos)
            expect(segment.y2).to.equal(wire.yPos)
        })

        it('Updates xPos with new value', function() {
            const length = 5
            wire.addLeft(length)
            expect(wire.xPos).to.equal(-length)
        })
    })

    describe('addRight', function() {
        it('Adds new segment', function() {
            const length = 5
            wire.addRight(length)
            expect(wire.segments).to.have.length(1)
        })

        it('New segment has correct coordinates', function() {
            const length = 5
            const initialXPos = wire.xPos
            wire.addRight(length)
            const segment = wire.segments[0]
            expect(segment.x1).to.equal(initialXPos)
            expect(segment.x2).to.equal(length)
            expect(segment.y1).to.equal(wire.yPos)
            expect(segment.y2).to.equal(wire.yPos)
        })

        it('Updates xPos with new value', function() {
            const length = 5
            wire.addRight(length)
            expect(wire.xPos).to.equal(length)
        })
    })

    describe('addUp', function() {
        it('Adds new segment', function() {
            const length = 5
            wire.addUp(length)
            expect(wire.segments).to.have.length(1)
        })

        it('New segment has correct coordinates', function() {
            const length = 5
            const initialYPos = wire.yPos
            wire.addUp(length)
            const segment = wire.segments[0]
            expect(segment.x1).to.equal(wire.xPos)
            expect(segment.x2).to.equal(wire.xPos)
            expect(segment.y1).to.equal(initialYPos)
            expect(segment.y2).to.equal(length)
        })

        it('Updates yPos with new value', function() {
            const length = 5
            wire.addUp(length)
            expect(wire.yPos).to.equal(length)
        })
    })

    describe('addDown', function() {
        it('Adds new segment', function() {
            const length = 5
            wire.addDown(length)
            expect(wire.segments).to.have.length(1)
        })

        it('New segment has correct coordinates', function() {
            const length = 5
            const initialYPos = wire.yPos
            wire.addDown(length)
            const segment = wire.segments[0]
            expect(segment.x1).to.equal(wire.xPos)
            expect(segment.x2).to.equal(wire.xPos)
            expect(segment.y1).to.equal(-length)
            expect(segment.y2).to.equal(initialYPos)
        })

        it('Updates yPos with new value', function() {
            const length = 5
            wire.addDown(length)
            expect(wire.yPos).to.equal(-length)
        })
    })

    describe('addSegment', function() {
        it('Adding left direction calls addLeft', function() {
            const wireSpy = sinon.spy(wire, 'addLeft')
            spies.push(wireSpy)

            const direction = orientation.left
            const length = 11
            wire.addSegment(`${direction}${length}`)

            expect(wireSpy.calledOnce).to.be.true
            expect(wireSpy.calledOnceWith(length)).to.be.true
        })

        it('Adding left direction passes in length correctly', function() {
            const wireSpy = sinon.spy(wire, 'addLeft')
            spies.push(wireSpy)

            const direction = orientation.left
            const length = 11
            wire.addSegment(`${direction}${length}`)

            expect(wireSpy.calledOnceWith(length)).to.be.true
        })

        it('Adding right direction calls addRight', function() {
            const wireSpy = sinon.spy(wire, 'addRight')
            spies.push(wireSpy)

            const direction = orientation.right
            const length = 11
            wire.addSegment(`${direction}${length}`)

            expect(wireSpy.calledOnce).to.be.true
            expect(wireSpy.calledOnceWith(length)).to.be.true
        })

        it('Adding right direction passes in length correctly', function() {
            const wireSpy = sinon.spy(wire, 'addRight')
            spies.push(wireSpy)

            const direction = orientation.right
            const length = 11
            wire.addSegment(`${direction}${length}`)

            expect(wireSpy.calledOnceWith(length)).to.be.true
        })

        it('Adding up direction calls addUp', function() {
            const wireSpy = sinon.spy(wire, 'addUp')
            spies.push(wireSpy)

            const direction = orientation.up
            const length = 11
            wire.addSegment(`${direction}${length}`)

            expect(wireSpy.calledOnce).to.be.true
            expect(wireSpy.calledOnceWith(length)).to.be.true
        })

        it('Adding up direction passes in length correctly', function() {
            const wireSpy = sinon.spy(wire, 'addUp')
            spies.push(wireSpy)

            const direction = orientation.up
            const length = 11
            wire.addSegment(`${direction}${length}`)

            expect(wireSpy.calledOnceWith(length)).to.be.true
        })

        it('Adding down direction calls addDown', function() {
            const wireSpy = sinon.spy(wire, 'addDown')
            spies.push(wireSpy)

            const direction = orientation.down
            const length = 11
            wire.addSegment(`${direction}${length}`)

            expect(wireSpy.calledOnce).to.be.true
            expect(wireSpy.calledOnceWith(length)).to.be.true
        })

        it('Adding down direction passes in length correctly', function() {
            const wireSpy = sinon.spy(wire, 'addDown')
            spies.push(wireSpy)

            const direction = orientation.down
            const length = 11
            wire.addSegment(`${direction}${length}`)

            expect(wireSpy.calledOnceWith(length)).to.be.true
        })
    })

    describe('addSegments', function() {
        it('Calls addSegment correctly', function() {
            const wireSpy = sinon.spy(wire, 'addSegment')
            spies.push(wireSpy)

            const wireSections = ['R8', 'U5', 'L5', 'D3']
            wire.addSegments(wireSections)

            expect(wireSpy.callCount).to.equal(wireSections.length)
        })
    })
})
