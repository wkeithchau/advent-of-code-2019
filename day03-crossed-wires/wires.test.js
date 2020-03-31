import { expect } from 'chai'
import cloneDeep from 'lodash.clonedeep'

import { symbol } from './constants'
import Map from './map'
import { drawDown, drawLeft, drawRight, drawUp, getSymbol } from './wires'

describe.only('Day03 - Crossed Wires', function() {
    describe('getSymbol', function() {
        it('Returns `x` when existing symbol is already a wire', function() {
            const existing = symbol.wire1
            const desired = symbol.wire2
            const updated = getSymbol(existing, desired)
            expect(updated).to.equal(symbol.cross)
        })

        it('Returns the desired wire symbol when existing symbol is the same wire', function() {
            const existing = symbol.wire1
            const desired = symbol.wire1
            const updated = getSymbol(existing, desired)
            expect(updated).to.equal(desired)
        })

        it('Returns the desired wire symbol when the existing symbol is a space', function() {
            const existing = '.'
            const desired = symbol.wire1
            const updated = getSymbol(existing, desired)
            expect(updated).to.equal(desired)
        })

        it('Returns the port when the existing symbol is a port', function() {
            const existing = 'o'
            const desired = symbol.wire2
            const updated = getSymbol(existing, desired)
            expect(updated).to.equal(symbol.port)
        })

        it('Returns the cross symbol when the existing symbol is a cross', function() {
            const existing = 'x'
            const desired = symbol.wire2
            const updated = getSymbol(existing, desired)
            expect(updated).to.equal(symbol.cross)
        })
    })

    describe('drawLeft', function() {
        let blankGrid

        before(function() {
            const space = symbol.space
            blankGrid = [
                [space, space, space, space, space],
                [space, space, space, space, space],
                [space, space, space, space, space],
                [space, space, space, space, space],
                [space, space, space, space, space],
            ]
        })

        beforeEach(function() {
            Map.reset()
        })

        it('Drawing off the current grid', function() {
            const length = 5
            const head = [0, 2]
            const headType = symbol.wire1
            const grid = cloneDeep(blankGrid)
            grid[2][0] = headType
            Map.grid = grid

            drawLeft(length, head, headType)
            const updatedGrid = Map.grid
            // Assert grid width
            updatedGrid.forEach((row, idx) => {
                expect(row).to.have.length(10)
                if (idx !== head[1]) {
                    expect(row).to.have.ordered.members([
                        symbol.space,
                        symbol.space,
                        symbol.space,
                        symbol.space,
                        symbol.space,
                        symbol.space,
                        symbol.space,
                        symbol.space,
                        symbol.space,
                        symbol.space,
                    ])
                }
            })
            // Assert updated row
            expect(updatedGrid[head[1]]).to.have.ordered.members([
                headType,
                headType,
                headType,
                headType,
                headType,
                headType,
                symbol.space,
                symbol.space,
                symbol.space,
                symbol.space,
            ])
        })

        it('Drawing on the existing grid', function() {
            const length = 2
            const head = [3, 4]
            const headType = symbol.wire1
            const grid = cloneDeep(blankGrid)
            grid[4][3] = headType
            Map.grid = grid

            drawLeft(length, head, headType)
            const updatedGrid = Map.grid
            // Assert grid width
            updatedGrid.forEach((row, idx) => {
                expect(row).to.have.length(5)
                if (idx !== head[1]) {
                    expect(row).to.have.ordered.members([
                        symbol.space,
                        symbol.space,
                        symbol.space,
                        symbol.space,
                        symbol.space,
                    ])
                }
            })
            // Assert updated row
            expect(updatedGrid[head[1]]).to.have.ordered.members([
                symbol.space,
                headType,
                headType,
                headType,
                symbol.space,
            ])
        })

        it('Drawing on mixture of off/on the current grid', function() {
            const length = 3
            const head = [2, 1]
            const headType = symbol.wire1
            const grid = cloneDeep(blankGrid)
            grid[1][2] = headType
            Map.grid = grid

            drawLeft(length, head, headType)
            const updatedGrid = Map.grid
            // Assert grid width
            updatedGrid.forEach((row, idx) => {
                expect(row).to.have.length(6)
                if (idx !== head[1]) {
                    expect(row).to.have.ordered.members([
                        symbol.space,
                        symbol.space,
                        symbol.space,
                        symbol.space,
                        symbol.space,
                        symbol.space,
                    ])
                }
            })
            // Assert updated row
            expect(updatedGrid[head[1]]).to.have.ordered.members([
                headType,
                headType,
                headType,
                headType,
                symbol.space,
                symbol.space,
            ])
        })

        it('Returns the updated position of the head', function() {
            const length = 3
            const head = [2, 1]
            const headType = symbol.wire1
            const grid = cloneDeep(blankGrid)
            grid[1][2] = headType
            Map.grid = grid

            const updated = drawLeft(length, head, headType)
            expect(updated).to.be.an('array')
            expect(updated).to.have.ordered.members([0, 1])
        })
    })

    describe('drawRight', function() {
        it('', function() {})
    })

    describe('drawUp', function() {
        it('', function() {})
    })

    describe('drawDown', function() {
        it('', function() {})
    })

    // Basic sample:
    // wire1 = R8,U5,L5,D3
    // wire2 = U7,R6,D4,L4
    // distance = 6
    // Extended sample 1:
    // wire1 = R75,D30,R83,U83,L12,D49,R71,U7,L72
    // wire2 = U62,R66,U55,R34,D71,R55,D58,R83
    // distance = 159
    // Extended sample 2:
    // wire1 = R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
    // wire2 = U98,R91,D20,R16,D67,R40,U7,R15,U6,R7
    // distance = 135
})
