import { expect } from 'chai'

import { findFewestZero, getLayers } from './image'

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
})
