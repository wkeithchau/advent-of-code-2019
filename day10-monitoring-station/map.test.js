import { expect } from 'chai'

import {
    bestLocation,
    findAsteroids,
    getAngle,
    surveyAsteroids,
    vapOrder,
} from './map'

describe('Day10 - Monitoring Station', function() {
    describe('findAsteroids', function() {
        it('Retuns asteroid in 1D map', function() {
            const map = [['.', '#', '.']]
            const asteroids = findAsteroids(map)
            expect(asteroids).to.have.length(1)
            const asteroid = asteroids[0]
            expect(asteroid[0]).to.equal(1)
            expect(asteroid[1]).to.equal(0)
        })

        it('Retuns asteroid in 2D map', function() {
            const map = [
                ['.', '#', '.'],
                ['.', '.', '#'],
                ['#', '.', '.'],
            ]
            const expectedAsteroids = [
                [1, 0],
                [2, 1],
                [0, 2],
            ]
            const asteroids = findAsteroids(map)
            expect(asteroids).to.have.length(3)
            expect(asteroids[0]).to.have.ordered.members(expectedAsteroids[0])
            expect(asteroids[1]).to.have.ordered.members(expectedAsteroids[1])
            expect(asteroids[2]).to.have.ordered.members(expectedAsteroids[2])
        })
    })

    describe('getAngle', function() {
        it('Returns ++ angle', function() {
            const xDiff = 1
            const yDiff = 1
            const angle = getAngle(xDiff, yDiff)
            expect(angle).to.equal('1++')
        })

        it('Returns -- angle', function() {
            const xDiff = -1
            const yDiff = -1
            const angle = getAngle(xDiff, yDiff)
            expect(angle).to.equal('1--')
        })

        it('Returns +- angle', function() {
            const xDiff = 1
            const yDiff = -1
            const angle = getAngle(xDiff, yDiff)
            expect(angle).to.equal('1+-')
        })

        it('Returns -+ angle', function() {
            const xDiff = -1
            const yDiff = 1
            const angle = getAngle(xDiff, yDiff)
            expect(angle).to.equal('1-+')
        })

        it('Returns NaN', function() {
            const xDiff = 0
            const yDiff = 0
            const angle = getAngle(xDiff, yDiff)
            expect(angle).to.equal('NaN++')
        })
    })

    describe('surveyAsteroids', function() {
        it('Returns survey data', function() {
            const asteroids = [
                [1, 0],
                [2, 1],
                [0, 2],
            ]
            const expectedData = [
                { x: 1, y: 0, data: ['1++', '2-+'], count: 2 },
                { x: 2, y: 1, data: ['1--', '0.5-+'], count: 2 },
                { x: 0, y: 2, data: ['2+-', '0.5+-'], count: 2 },
            ]
            const data = surveyAsteroids(asteroids)
            expect(data).to.have.length(3)
            data.forEach((asteroidData, idx) => {
                expect(asteroidData.x).to.equal(expectedData[idx].x)
                expect(asteroidData.y).to.equal(expectedData[idx].y)
                expect(asteroidData.data).to.have.ordered.members(
                    expectedData[idx].data
                )
                expect(asteroidData.count).to.equal(expectedData[idx].count)
            })
        })
    })

    describe('bestLocation', function() {
        it('test 1: 3x3 covering all angles', function() {
            const input = ['#.#', '.#.', '#.#']
            const map = input.map(val => val.split(''))
            const expectedAsteroid = { x: 1, y: 1, count: 4 }
            const asteroid = bestLocation(map)
            expect(asteroid.x).to.equal(expectedAsteroid.x)
            expect(asteroid.y).to.equal(expectedAsteroid.y)
            expect(asteroid.count).to.equal(expectedAsteroid.count)
        })

        it('Basic test 1: 5x5', function() {
            const input = ['.#..#', '.....', '#####', '....#', '...##']
            const map = input.map(val => val.split(''))
            const expectedAsteroid = { x: 3, y: 4, count: 8 }
            const asteroid = bestLocation(map)
            expect(asteroid.x).to.equal(expectedAsteroid.x)
            expect(asteroid.y).to.equal(expectedAsteroid.y)
            expect(asteroid.count).to.equal(expectedAsteroid.count)
        })

        it('Sample test 1: 10x10 with 33 asteroids', function() {
            const input = [
                '......#.#.',
                '#..#.#....',
                '..#######.',
                '.#.#.###..',
                '.#..#.....',
                '..#....#.#',
                '#..#....#.',
                '.##.#..###',
                '##...#..#.',
                '.#....####',
            ]
            const map = input.map(val => val.split(''))
            const expectedAsteroid = { x: 5, y: 8, count: 33 }
            const asteroid = bestLocation(map)
            expect(asteroid.x).to.equal(expectedAsteroid.x)
            expect(asteroid.y).to.equal(expectedAsteroid.y)
            expect(asteroid.count).to.equal(expectedAsteroid.count)
        })

        it('Sample test 2: 10x10 with 35 asteroids', function() {
            const input = [
                '#.#...#.#.',
                '.###....#.',
                '.#....#...',
                '##.#.#.#.#',
                '....#.#.#.',
                '.##..###.#',
                '..#...##..',
                '..##....##',
                '......#...',
                '.####.###.',
            ]
            const map = input.map(val => val.split(''))
            const expectedAsteroid = { x: 1, y: 2, count: 35 }
            const asteroid = bestLocation(map)
            expect(asteroid.x).to.equal(expectedAsteroid.x)
            expect(asteroid.y).to.equal(expectedAsteroid.y)
            expect(asteroid.count).to.equal(expectedAsteroid.count)
        })

        it('Sample test 3: 10x10 with 41 asteroids', function() {
            const input = [
                '.#..#..###',
                '####.###.#',
                '....###.#.',
                '..###.##.#',
                '##.##.#.#.',
                '....###..#',
                '..#.#..#.#',
                '#..#.#.###',
                '.##...##.#',
                '.....#.#..',
            ]
            const map = input.map(val => val.split(''))
            const expectedAsteroid = { x: 6, y: 3, count: 41 }
            const asteroid = bestLocation(map)
            expect(asteroid.x).to.equal(expectedAsteroid.x)
            expect(asteroid.y).to.equal(expectedAsteroid.y)
            expect(asteroid.count).to.equal(expectedAsteroid.count)
        })

        it('Sample test 4: 20x20 with 210 asteroids', function() {
            const input = [
                '.#..##.###...#######',
                '##.############..##.',
                '.#.######.########.#',
                '.###.#######.####.#.',
                '#####.##.#.##.###.##',
                '..#####..#.#########',
                '####################',
                '#.####....###.#.#.##',
                '##.#################',
                '#####.##.###..####..',
                '..######..##.#######',
                '####.##.####...##..#',
                '.#####..#.######.###',
                '##...#.##########...',
                '#.##########.#######',
                '.####.#.###.###.#.##',
                '....##.##.###..#####',
                '.#.#.###########.###',
                '#.#.#.#####.####.###',
                '###.##.####.##.#..##',
            ]
            const map = input.map(val => val.split(''))
            const expectedAsteroid = { x: 11, y: 13, count: 210 }
            const asteroid = bestLocation(map)
            expect(asteroid.x).to.equal(expectedAsteroid.x)
            expect(asteroid.y).to.equal(expectedAsteroid.y)
            expect(asteroid.count).to.equal(expectedAsteroid.count)
        })
    })

    describe('vapOrder', function() {
        it('Sample test 4: 20x20 200th vaporized at 8,2', function() {
            const input = [
                '.#..##.###...#######',
                '##.############..##.',
                '.#.######.########.#',
                '.###.#######.####.#.',
                '#####.##.#.##.###.##',
                '..#####..#.#########',
                '####################',
                '#.####....###.#.#.##',
                '##.#################',
                '#####.##.###..####..',
                '..######..##.#######',
                '####.##.####...##..#',
                '.#####..#.######.###',
                '##...#.##########...',
                '#.##########.#######',
                '.####.#.###.###.#.##',
                '....##.##.###..#####',
                '.#.#.###########.###',
                '#.#.#.#####.####.###',
                '###.##.####.##.#..##',
            ]
            const map = input.map(val => val.split(''))
            const asteroid = bestLocation(map, true)
            const data = vapOrder(asteroid)
            const vap200 = data[199]
            expect(vap200.x).to.equal(8)
            expect(vap200.y).to.equal(2)
        })
    })
})
