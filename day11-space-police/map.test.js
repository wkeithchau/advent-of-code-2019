import { expect } from 'chai'
import sinon from 'sinon'

import Map from './map'
import Navigator from './navigator'

describe('Map Class', function() {
    let stubs
    let map

    before(function() {
        stubs = []
    })

    beforeEach(function() {
        map = new Map()
    })

    afterEach(function() {
        while (stubs.length !== 0) {
            const stub = stubs.shift()
            stub.restore()
        }
    })

    describe('Constructor', function() {
        it('Creates a Navigator', function() {
            const m = new Map()
            const navigator = m.navigator
            expect(navigator).to.be.an.instanceOf(Navigator)
        })
    })

    describe('paintPanel', function() {
        it('Creates new panel with the provided color', function() {
            map.input = [1]
            const panelBefore = map.panels['0,0']
            map.paintPanel()
            const panelAfter = map.panels['0,0']
            expect(panelBefore).to.be.undefined
            expect(panelAfter).to.equal(1)
        })

        it('Modifies existing with the provided color', function() {
            map.input = [1]
            map.panels['0,0'] = 0
            const panelBefore = map.panels['0,0']
            map.paintPanel()
            const panelAfter = map.panels['0,0']
            expect(panelBefore).to.equal(0)
            expect(panelAfter).to.equal(1)
        })
    })

    describe('moveNavigator', function() {
        it('Outputs the color of existing panel', function() {
            map.input = [0]
            map.panels['-1,0'] = 1
            map.outputComputer = { input: [] }
            map.moveNavigator()
            const input = map.outputComputer.input
            expect(input).to.have.ordered.members([1])
        })

        it('Outputs the defaults color black of new panel', function() {
            map.input = [0]
            map.outputComputer = { input: [] }
            map.moveNavigator()
            const input = map.outputComputer.input
            expect(input).to.have.ordered.members([0])
        })
    })

    describe('execute', function() {
        it('Sets true to true when inputCLosed is true', async function() {
            map.inputClosed = true
            await map.execute()
            const end = map.end
            expect(end).to.be.true
        })

        it('Calls paintPanel when there is at least 2 inputs', async function() {
            const paintSpy = sinon.spy(map, 'paintPanel')
            stubs.push(paintSpy)

            map.outputComputer = { input: [] }
            map.input = [0, 0]
            await map.execute()
            expect(paintSpy.calledOnce).to.be.true
        })

        it('Does not call paintPanel when there is less than 2 inputs', async function() {
            const paintSpy = sinon.spy(map, 'paintPanel')
            stubs.push(paintSpy)

            map.outputComputer = { input: [] }
            map.input = [0]
            await map.execute()
            expect(paintSpy.calledOnce).to.be.false
        })

        it('Calls moveNavigator when there is at least 2 inputs', async function() {
            const moveSpy = sinon.spy(map, 'moveNavigator')
            stubs.push(moveSpy)

            map.outputComputer = { input: [] }
            map.input = [0, 0]
            await map.execute()
            expect(moveSpy.calledOnce).to.be.true
        })

        it('Does not call moveNavigator when there is less than 2 inputs', async function() {
            const moveSpy = sinon.spy(map, 'moveNavigator')
            stubs.push(moveSpy)

            map.outputComputer = { input: [] }
            map.input = [0]
            await map.execute()
            expect(moveSpy.calledOnce).to.be.false
        })
    })

    describe('run', function() {
        it('Sends first input to outputComputer as black', async function() {
            map.outputComputer = { input: [] }
            map.end = true
            await map.run()
            const output = map.outputComputer.input
            expect(output).to.have.ordered.members([0])
        })

        it('Runs execute', async function() {
            const executeSpy = sinon.spy(map, 'execute')
            stubs.push(executeSpy)

            map.outputComputer = { input: [] }
            map.inputClosed = true
            await map.run()
            expect(executeSpy.calledOnce).to.be.true
        })

        it('Stops running when end is true', async function() {
            const executeSpy = sinon.spy(map, 'execute')
            stubs.push(executeSpy)

            map.outputComputer = { input: [] }
            map.end = true
            await map.run()
            expect(executeSpy.calledOnce).to.be.false
        })
    })
})
