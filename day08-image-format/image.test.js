import { expect } from 'chai'
import sinon from 'sinon'

import { displayImage, findFewestZero, getLayers, visiblePixels } from './image'

describe('Day08 - Image Format', function() {
    describe('getLayer', function() {
        it('Return the image as layers', function() {
            const imageString = '123456789012'
            const image = imageString.split('').map(data => Number(data))
            const pixelDim = { width: 3, height: 2 }
            const layers = getLayers(image, pixelDim)
            expect(layers).to.have.length(2)
            expect(layers[0]).to.have.length(6)
            expect(layers[1]).to.have.length(6)
        })
    })

    describe('findFewestZero', function() {
        it('Return layer with the fewest zeroes', function() {
            const imageString = '123456000009789012000302'
            const image = imageString.split('').map(data => Number(data))
            const pixelDim = { width: 3, height: 2 }
            const layer = findFewestZero(image, pixelDim)
            expect(layer).to.have.length(6)
            expect(layer).to.have.ordered.members([1, 2, 3, 4, 5, 6])
        })
    })

    describe('visiblePixels', function() {
        it('Sample test 1: 0222112222120000', function() {
            const imageString = '0222112222120000'
            const image = imageString.split('').map(data => Number(data))
            const layers = getLayers(image, { width: 2, height: 2 })
            const pixels = visiblePixels(layers)
            expect(pixels).to.have.length(4)
            expect(pixels).to.have.ordered.members([0, 1, 1, 0])
        })
    })

    describe('displayImage', function() {
        let stubs

        before(function() {
            stubs = []
        })

        afterEach(function() {
            while (stubs.length !== 0) {
                const stub = stubs.shift()
                stub.restore()
            }
        })

        it('Shows `ABC`', function() {
            const consoleStub = sinon.stub(console, 'log')
            stubs.push(consoleStub)
            const imageString =
                '00011100001111111100011111100001101100011000001101100001100110001100110000011011000000011000001101111111100110000000111111111011000001101100000001100000110110000011011000011011000001101111111100011111100'
            const image = imageString.split('').map(data => Number(data))
            const layeredPixels = getLayers(image, { width: 29, height: 1 })
            const display = displayImage(layeredPixels)
            expect(display[0]).to.equal('   ███    ████████   ██████  ')
            expect(display[1]).to.equal('  ██ ██   ██     ██ ██    ██ ')
            expect(display[2]).to.equal(' ██   ██  ██     ██ ██       ')
            expect(display[3]).to.equal('██     ██ ████████  ██       ')
            expect(display[4]).to.equal('█████████ ██     ██ ██       ')
            expect(display[5]).to.equal('██     ██ ██     ██ ██    ██ ')
            expect(display[6]).to.equal('██     ██ ████████   ██████  ')
        })

        it('Sample test 1: 0222112222120000', function() {
            const consoleStub = sinon.stub(console, 'log')
            stubs.push(consoleStub)
            const imageString = '0222112222120000'
            const image = imageString.split('').map(data => Number(data))
            const layers = getLayers(image, { width: 2, height: 2 })
            const pixels = visiblePixels(layers)
            const layeredPixels = getLayers(pixels, { width: 2, height: 1 })
            const display = displayImage(layeredPixels)
            expect(display[0]).to.equal(' █')
            expect(display[1]).to.equal('█ ')
        })
    })
})
