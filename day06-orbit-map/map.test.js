import { expect } from 'chai'

import { loadMap, orbitCount } from './map'

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
})
