import { expect } from 'chai'
import sinon from 'sinon'

import System from './system'

describe('System Class', function() {
    let sinonArray

    before(function() {
        sinonArray = []
    })

    beforeEach(function() {
        System.reset()
    })

    afterEach(function() {
        while (sinonArray.length !== 0) {
            const stub = sinonArray.shift()
            stub.restore()
        }
    })

    after(function() {
        System.reset()
    })

    describe('setMoons', function() {
        it('Saves the moons that were passed in', function() {
            const moons = [
                [1, 2, 3],
                [4, 5, 6],
            ]
            System.setMoons(moons)
            const systemMoons = System.moons
            systemMoons.forEach((sMoon, idx) => {
                expect(sMoon).to.have.ordered.members(moons[idx])
            })
        })

        it('Initialise velocity array', function() {
            const moons = [
                [1, 2, 3],
                [4, 5, 6],
            ]
            System.setMoons(moons)
            const velocity = System.velocity
            const expectedVelocity = [
                [0, 0, 0],
                [0, 0, 0],
            ]
            velocity.forEach((v, idx) => {
                expect(v).to.have.ordered.members(expectedVelocity[idx])
            })
        })
    })

    describe('applyGravity', function() {
        it('Basic test 1: <x=-1, y=0, z=2> <x=2, y=-10, z=-7> <x=4, y=-8, z=8> <x=3, y=5, z=-1>', function() {
            const moons = [
                [-1, 0, 2],
                [2, -10, -7],
                [4, -8, 8],
                [3, 5, -1],
            ]
            System.setMoons(moons)
            System.applyGravity()
            const velocity = System.velocity
            const expectedVelocity = [
                [3, -1, -1],
                [1, 3, 3],
                [-3, 1, -3],
                [-1, -3, 1],
            ]
            velocity.forEach((v, idx) => {
                expect(v).to.have.ordered.members(expectedVelocity[idx])
            })
        })
    })

    describe('applyVelocity', function() {
        it('Basic test 1: vel=<x= 3, y=-1, z=-1> vel=<x= 1, y= 3, z= 3> vel=<x=-3, y= 1, z=-3> vel=<x=-1, y=-3, z= 1>', function() {
            const moons = [
                [-1, 0, 2],
                [2, -10, -7],
                [4, -8, 8],
                [3, 5, -1],
            ]
            System.setMoons(moons)
            System.velocity = [
                [3, -1, -1],
                [1, 3, 3],
                [-3, 1, -3],
                [-1, -3, 1],
            ]
            System.applyVelocity()
            const updatedMoons = System.moons
            const expectedPos = [
                [2, -1, 1],
                [3, -7, -4],
                [1, -7, 5],
                [2, 2, 0],
            ]
            updatedMoons.forEach((v, idx) => {
                expect(v).to.have.ordered.members(expectedPos[idx])
            })
        })
    })

    describe('step', function() {
        it('Calls applyGravity', function() {
            const gravitySpy = sinon.spy(System, 'applyGravity')
            sinonArray.push(gravitySpy)
            System.setMoons([])
            System.step()
            expect(gravitySpy.calledOnce).to.be.true
        })

        it('Calls applyVelocity', function() {
            const velocitySpy = sinon.spy(System, 'applyGravity')
            sinonArray.push(velocitySpy)
            System.setMoons([])
            System.step()
            expect(velocitySpy.calledOnce).to.be.true
        })

        it('Increase stepCount by 1', function() {
            const initialCount = System.stepCount
            System.setMoons([])
            System.step()
            expect(System.stepCount).to.equal(initialCount + 1)
        })
    })

    describe('simulate', function() {
        it('Calls step', function() {
            const stepSpy = sinon.spy(System, 'step')
            sinonArray.push(stepSpy)
            System.setMoons([])
            System.simulate(1)
            expect(stepSpy.calledOnce).to.be.true
        })

        it('Calls step multiple times', function() {
            const stepSpy = sinon.spy(System, 'step')
            sinonArray.push(stepSpy)
            System.setMoons([])
            System.simulate(5)
            const callCount = stepSpy.callCount
            expect(callCount).to.equal(5)
        })
    })

    describe('potentialEnergy', function() {
        it('Basic test 1: <x= 2, y= 1, z=-3> <x= 1, y=-8, z= 0> <x= 3, y=-6, z= 1> <x= 2, y= 0, z= 4>', function() {
            const moons = [
                [2, 1, -3],
                [1, -8, 0],
                [3, -6, 1],
                [2, 0, 4],
            ]
            System.moons = moons
            const energy = System.potentialEnergy()
            const expectedEnergy = [6, 9, 10, 6]
            energy.forEach((e, idx) => {
                expect(e).to.equal(expectedEnergy[idx])
            })
        })
    })

    describe('KineticEnergy', function() {
        it('Basic test 1: <x=-3, y=-2, z= 1> <x=-1, y= 1, z= 3> <x= 3, y= 2, z=-3> <x= 1, y=-1, z=-1>', function() {
            const velocity = [
                [-3, -2, 1],
                [-1, 1, 3],
                [3, 2, -3],
                [1, -1, -1],
            ]
            System.velocity = velocity
            const energy = System.kineticEnergy()
            const expectedEnergy = [6, 5, 8, 3]
            energy.forEach((e, idx) => {
                expect(e).to.equal(expectedEnergy[idx])
            })
        })
    })

    describe('totalEnergy', function() {
        it('Basic test 1: total energy equals to 179', function() {
            const moons = [
                [2, 1, -3],
                [1, -8, 0],
                [3, -6, 1],
                [2, 0, 4],
            ]
            const velocity = [
                [-3, -2, 1],
                [-1, 1, 3],
                [3, 2, -3],
                [1, -1, -1],
            ]
            System.moons = moons
            System.velocity = velocity
            const total = System.totalEnergy()
            expect(total).to.equal(179)
        })
    })
})
