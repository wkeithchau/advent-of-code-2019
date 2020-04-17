import { expect } from 'chai'

import { object } from './constants'
import { loadMap, orbitCount, rootPath } from './map'

describe('Day06 - Orbit Map', function() {
    describe('loadMap', function() {
        it('Stores orbit in directory properly', function() {
            const orbits = [
                ['A', 'B'],
                ['B', 'C'],
                ['C', 'D'],
            ]
            const directory = loadMap(orbits)
            const objNames = Object.keys(directory)
            expect(objNames).to.have.members(['A', 'B', 'C', 'D'])
        })

        it('Stores orbit relationship properly', function() {
            const orbits = [
                ['A', 'B'],
                ['B', 'C'],
                ['C', 'D'],
            ]
            const directory = loadMap(orbits)
            const objs = Object.values(directory)
            const parentNames = objs.map(obj => {
                if (obj.parent !== undefined) {
                    return obj.parent.name
                }
            })

            expect(parentNames).to.have.ordered.members([
                undefined,
                'A',
                'B',
                'C',
            ])
        })
    })

    describe('orbitCount', function() {
        it('Counts all orbits', function() {
            const orbits = [
                ['A', 'B'],
                ['B', 'C'],
                ['C', 'D'],
            ]
            const directory = loadMap(orbits)
            const count = orbitCount(directory)
            expect(count).to.equal(6)
        })

        it('Sample test 1: orbit_total=42', function() {
            const input = [
                'COM)B',
                'B)C',
                'C)D',
                'D)E',
                'E)F',
                'B)G',
                'G)H',
                'D)I',
                'E)J',
                'J)K',
                'K)L',
            ]
            const orbits = input.map(i => i.split(')'))
            const directory = loadMap(orbits)
            const count = orbitCount(directory)
            expect(count).to.equal(42)
        })
    })

    describe('rootPath', function() {
        it('Traces path to the provided object name', function() {
            const orbits = [
                ['A', 'B'],
                ['B', 'C'],
                ['C', 'D'],
            ]
            const directory = loadMap(orbits)
            const dest = directory['D']
            const path = rootPath(dest, 'B')
            expect(path).to.have.ordered.members(['C', 'B'])
        })
    })

    describe('Overall', function() {
        it('Sample test 1: minimum_orbital_transfers=4', function() {
            const input = [
                'COM)B',
                'B)C',
                'C)D',
                'D)E',
                'E)F',
                'B)G',
                'G)H',
                'D)I',
                'E)J',
                'J)K',
                'K)L',
                'K)YOU',
                'I)SAN',
            ]
            const orbits = input.map(i => i.split(')'))
            const directory = loadMap(orbits)
            const departure = directory[object.departure].parent
            const arrival = directory[object.arrival].parent

            // Find path to get to COM
            const departurePath = rootPath(departure, object.com)
            const arrivalPath = rootPath(arrival, object.com)
            // Get first node that intersects
            const intersection = departurePath.filter(obj =>
                arrivalPath.includes(obj)
            )
            const nodeName = intersection[0]
            // Get orbital transfer count to the common node
            const d2n = rootPath(departure, nodeName)
            const a2n = rootPath(arrival, nodeName)
            // Total orbital transfer count
            const transfers = d2n.length + a2n.length

            expect(transfers).to.equal(4)
        })
    })
})
