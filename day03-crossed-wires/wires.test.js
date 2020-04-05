import { expect } from 'chai'
import cloneDeep from 'lodash.clonedeep'

import { orientation, symbol } from './constants'
import Map from './map'
import {
    drawDown,
    drawLeft,
    drawRight,
    drawUp,
    getSymbol,
    mapSection,
} from './wires'

describe('Day03 - Crossed Wires', function() {
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

        after(function() {
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

        after(function() {
            Map.reset()
        })

        it('Drawing off the current grid', function() {
            const length = 5
            const head = [4, 2]
            const headType = symbol.wire1
            const grid = cloneDeep(blankGrid)
            grid[2][4] = headType
            Map.grid = grid

            drawRight(length, head, headType)
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
                symbol.space,
                symbol.space,
                symbol.space,
                symbol.space,
                headType,
                headType,
                headType,
                headType,
                headType,
                headType,
            ])
        })

        it('Drawing on the existing grid', function() {
            const length = 2
            const head = [1, 0]
            const headType = symbol.wire1
            const grid = cloneDeep(blankGrid)
            grid[0][1] = headType
            Map.grid = grid

            drawRight(length, head, headType)
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
            const head = [2, 3]
            const headType = symbol.wire1
            const grid = cloneDeep(blankGrid)
            grid[3][2] = headType
            Map.grid = grid

            drawRight(length, head, headType)
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
                symbol.space,
                symbol.space,
                headType,
                headType,
                headType,
                headType,
            ])
        })

        it('Returns the updated position of the head', function() {
            const length = 3
            const head = [2, 1]
            const headType = symbol.wire1
            const grid = cloneDeep(blankGrid)
            grid[1][2] = headType
            Map.grid = grid

            const updated = drawRight(length, head, headType)
            expect(updated).to.be.an('array')
            expect(updated).to.have.ordered.members([5, 1])
        })
    })

    describe('drawUp', function() {
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

        after(function() {
            Map.reset()
        })

        it('Drawing off the current grid', function() {
            const length = 5
            const head = [2, 0]
            const headType = symbol.wire1
            const grid = cloneDeep(blankGrid)
            grid[0][2] = headType
            Map.grid = grid

            drawUp(length, head, headType)
            const updatedGrid = Map.grid
            // Assert rows
            updatedGrid.forEach((row, idx) => {
                expect(row).to.have.length(5)
                if (idx <= 5) {
                    expect(row).to.have.ordered.members([
                        symbol.space,
                        symbol.space,
                        headType,
                        symbol.space,
                        symbol.space,
                    ])
                } else {
                    expect(row).to.have.ordered.members([
                        symbol.space,
                        symbol.space,
                        symbol.space,
                        symbol.space,
                        symbol.space,
                    ])
                }
            })
        })

        it('Drawing on the existing grid', function() {
            const length = 2
            const head = [4, 3]
            const headType = symbol.wire1
            const grid = cloneDeep(blankGrid)
            grid[3][4] = headType
            Map.grid = grid

            drawUp(length, head, headType)
            const updatedGrid = Map.grid
            // Assert rows
            updatedGrid.forEach((row, idx) => {
                expect(row).to.have.length(5)
                if (idx >= 1 && idx <= 3) {
                    expect(row).to.have.ordered.members([
                        symbol.space,
                        symbol.space,
                        symbol.space,
                        symbol.space,
                        headType,
                    ])
                } else {
                    expect(row).to.have.ordered.members([
                        symbol.space,
                        symbol.space,
                        symbol.space,
                        symbol.space,
                        symbol.space,
                    ])
                }
            })
        })

        it('Drawing on mixture of off/on the current grid', function() {
            const length = 3
            const head = [1, 2]
            const headType = symbol.wire1
            const grid = cloneDeep(blankGrid)
            grid[2][1] = headType
            Map.grid = grid

            drawUp(length, head, headType)
            const updatedGrid = Map.grid
            // Assert rows
            updatedGrid.forEach((row, idx) => {
                expect(row).to.have.length(5)
                if (idx <= 3) {
                    expect(row).to.have.ordered.members([
                        symbol.space,
                        headType,
                        symbol.space,
                        symbol.space,
                        symbol.space,
                    ])
                } else {
                    expect(row).to.have.ordered.members([
                        symbol.space,
                        symbol.space,
                        symbol.space,
                        symbol.space,
                        symbol.space,
                    ])
                }
            })
        })

        it('Returns the updated position of the head', function() {
            const length = 3
            const head = [1, 2]
            const headType = symbol.wire1
            const grid = cloneDeep(blankGrid)
            grid[2][1] = headType
            Map.grid = grid

            const updated = drawUp(length, head, headType)
            expect(updated).to.be.an('array')
            expect(updated).to.have.ordered.members([1, 0])
        })
    })

    describe('drawDown', function() {
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

        after(function() {
            Map.reset()
        })

        it('Drawing off the current grid', function() {
            const length = 5
            const head = [2, 4]
            const headType = symbol.wire1
            const grid = cloneDeep(blankGrid)
            grid[4][2] = headType
            Map.grid = grid

            drawDown(length, head, headType)
            const updatedGrid = Map.grid
            // Assert rows
            updatedGrid.forEach((row, idx) => {
                expect(row).to.have.length(5)
                if (idx >= 4) {
                    expect(row).to.have.ordered.members([
                        symbol.space,
                        symbol.space,
                        headType,
                        symbol.space,
                        symbol.space,
                    ])
                } else {
                    expect(row).to.have.ordered.members([
                        symbol.space,
                        symbol.space,
                        symbol.space,
                        symbol.space,
                        symbol.space,
                    ])
                }
            })
        })

        it('Drawing on the existing grid', function() {
            const length = 2
            const head = [0, 1]
            const headType = symbol.wire1
            const grid = cloneDeep(blankGrid)
            grid[1][0] = headType
            Map.grid = grid

            drawDown(length, head, headType)
            const updatedGrid = Map.grid
            // Assert rows
            updatedGrid.forEach((row, idx) => {
                expect(row).to.have.length(5)
                if (idx >= 1 && idx <= 3) {
                    expect(row).to.have.ordered.members([
                        headType,
                        symbol.space,
                        symbol.space,
                        symbol.space,
                        symbol.space,
                    ])
                } else {
                    expect(row).to.have.ordered.members([
                        symbol.space,
                        symbol.space,
                        symbol.space,
                        symbol.space,
                        symbol.space,
                    ])
                }
            })
        })

        it('Drawing on mixture of off/on the current grid', function() {
            const length = 3
            const head = [3, 2]
            const headType = symbol.wire1
            const grid = cloneDeep(blankGrid)
            grid[2][3] = headType
            Map.grid = grid

            drawDown(length, head, headType)
            const updatedGrid = Map.grid
            // Assert rows
            updatedGrid.forEach((row, idx) => {
                expect(row).to.have.length(5)
                if (idx >= 2) {
                    expect(row).to.have.ordered.members([
                        symbol.space,
                        symbol.space,
                        symbol.space,
                        headType,
                        symbol.space,
                    ])
                } else {
                    expect(row).to.have.ordered.members([
                        symbol.space,
                        symbol.space,
                        symbol.space,
                        symbol.space,
                        symbol.space,
                    ])
                }
            })
        })

        it('Returns the updated position of the head', function() {
            const length = 3
            const head = [1, 2]
            const headType = symbol.wire1
            const grid = cloneDeep(blankGrid)
            grid[2][1] = headType
            Map.grid = grid

            const updated = drawDown(length, head, headType)
            expect(updated).to.be.an('array')
            expect(updated).to.have.ordered.members([1, 5])
        })
    })

    describe('mapSection', function() {
        let headType
        let initialGrid

        before(function() {
            headType = symbol.wire2
            const space = symbol.space
            initialGrid = [
                [space, space, space, space, space],
                [space, space, space, space, space],
                [space, space, headType, space, space],
                [space, space, space, space, space],
                [space, space, space, space, space],
            ]
        })

        beforeEach(function() {
            Map.reset()
        })

        after(function() {
            Map.reset()
        })

        it('Draw left correctly', function() {
            Map.grid = cloneDeep(initialGrid)
            Map.wire2Head = [2, 2]
            const section = `${orientation.left}1`

            mapSection(section, headType)
            const head = Map.wire2Head
            expect(head).to.have.ordered.members([1, 2])
        })

        it('Draw right correctly', function() {
            Map.grid = cloneDeep(initialGrid)
            Map.wire2Head = [2, 2]
            const section = `${orientation.right}1`

            mapSection(section, headType)
            const head = Map.wire2Head
            expect(head).to.have.ordered.members([3, 2])
        })

        it('Draw up correctly', function() {
            Map.grid = cloneDeep(initialGrid)
            Map.wire2Head = [2, 2]
            const section = `${orientation.up}1`

            mapSection(section, headType)
            const head = Map.wire2Head
            expect(head).to.have.ordered.members([2, 1])
        })

        it('Draw down correctly', function() {
            Map.grid = cloneDeep(initialGrid)
            Map.wire2Head = [2, 2]
            const section = `${orientation.down}1`

            mapSection(section, headType)
            const head = Map.wire2Head
            expect(head).to.have.ordered.members([2, 3])
        })

        it('Draw nothing when the direction is unknown', function() {
            Map.grid = cloneDeep(initialGrid)
            Map.wire2Head = [2, 2]
            const section = 'Z1'

            mapSection(section, headType)
            const head = Map.wire2Head
            expect(head).to.have.ordered.members([2, 2])
        })
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
