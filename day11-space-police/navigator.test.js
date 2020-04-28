import { expect } from 'chai'
import sinon from 'sinon'

import { directionChar, turnCode } from './constants'
import Navigator from './navigator'

describe('Navigator Class', function() {
    let stubs
    let nav

    before(function() {
        stubs = []
    })

    beforeEach(function() {
        nav = new Navigator()
    })

    afterEach(function() {
        while (stubs.length !== 0) {
            const stub = stubs.shift()
            stub.restore()
        }
    })

    describe('turnLeft', function() {
        it('Sets direction to left when facing up', function() {
            nav.direction = directionChar.up
            nav.turnLeft()
            const direction = nav.direction
            expect(direction).to.equal(directionChar.left)
        })

        it('Sets direction to down when facing left', function() {
            nav.direction = directionChar.left
            nav.turnLeft()
            const direction = nav.direction
            expect(direction).to.equal(directionChar.down)
        })

        it('Sets direction to right when facing down', function() {
            nav.direction = directionChar.down
            nav.turnLeft()
            const direction = nav.direction
            expect(direction).to.equal(directionChar.right)
        })

        it('Sets direction to up when facing right', function() {
            nav.direction = directionChar.right
            nav.turnLeft()
            const direction = nav.direction
            expect(direction).to.equal(directionChar.up)
        })

        it('Moves left when facing right', function() {
            nav.direction = directionChar.up
            nav.turnLeft()
            const [x, y] = nav.current
            expect(x).to.equal(-1)
            expect(y).to.equal(0)
        })

        it('Moves down when facing left', function() {
            nav.direction = directionChar.left
            nav.turnLeft()
            const [x, y] = nav.current
            expect(x).to.equal(0)
            expect(y).to.equal(1)
        })

        it('Moves right when facing down', function() {
            nav.direction = directionChar.down
            nav.turnLeft()
            const [x, y] = nav.current
            expect(x).to.equal(1)
            expect(y).to.equal(0)
        })

        it('Moves up when facing right', function() {
            nav.direction = directionChar.right
            nav.turnLeft()
            const [x, y] = nav.current
            expect(x).to.equal(0)
            expect(y).to.equal(-1)
        })

        it('Returns current position', function() {
            nav.direction = directionChar.up
            const pos = nav.turnLeft()
            expect(pos).to.have.ordered.members(nav.current)
        })
    })

    describe('turnRight', function() {
        it('Sets direction to right when facing up', function() {
            nav.direction = directionChar.up
            nav.turnRight()
            const direction = nav.direction
            expect(direction).to.equal(directionChar.right)
        })

        it('Sets direction to down when facing right', function() {
            nav.direction = directionChar.right
            nav.turnRight()
            const direction = nav.direction
            expect(direction).to.equal(directionChar.down)
        })

        it('Sets direction to left when facing down', function() {
            nav.direction = directionChar.down
            nav.turnRight()
            const direction = nav.direction
            expect(direction).to.equal(directionChar.left)
        })

        it('Sets direction to up when facing left', function() {
            nav.direction = directionChar.left
            nav.turnRight()
            const direction = nav.direction
            expect(direction).to.equal(directionChar.up)
        })

        it('Moves right when facing right', function() {
            nav.direction = directionChar.up
            nav.turnRight()
            const [x, y] = nav.current
            expect(x).to.equal(1)
            expect(y).to.equal(0)
        })

        it('Moves down when facing right', function() {
            nav.direction = directionChar.right
            nav.turnRight()
            const [x, y] = nav.current
            expect(x).to.equal(0)
            expect(y).to.equal(1)
        })

        it('Moves left when facing down', function() {
            nav.direction = directionChar.down
            nav.turnRight()
            const [x, y] = nav.current
            expect(x).to.equal(-1)
            expect(y).to.equal(0)
        })

        it('Moves up when facing left', function() {
            nav.direction = directionChar.left
            nav.turnRight()
            const [x, y] = nav.current
            expect(x).to.equal(0)
            expect(y).to.equal(-1)
        })

        it('Returns current position', function() {
            nav.direction = directionChar.up
            const pos = nav.turnRight()
            expect(pos).to.have.ordered.members(nav.current)
        })
    })

    describe('turn', function() {
        it('Calls turnLeft when left is provided', function() {
            const leftSpy = sinon.spy(nav, 'turnLeft')
            stubs.push(leftSpy)
            nav.turn(turnCode.left)
            expect(leftSpy.calledOnce).to.be.true
        })

        it('Calls turnRight when right is provided', function() {
            const rightSpy = sinon.spy(nav, 'turnRight')
            stubs.push(rightSpy)
            nav.turn(turnCode.right)
            expect(rightSpy.calledOnce).to.be.true
        })
    })
})
