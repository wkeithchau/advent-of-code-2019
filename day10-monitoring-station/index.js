import { getInput } from '../utils/input'

import { bestLocation, vapOrder } from './map'

const INPUT = getInput(import.meta.url, '\n')
const MAP = INPUT.map(data => data.split(''))

const part1 = () => {
    const asteroid = bestLocation(MAP)
    console.log(
        `Location x:${asteroid.x} y:${asteroid.y} can detect the most number of asteroids: ${asteroid.count}`
    )
}

const part2 = () => {
    const asteroid = bestLocation(MAP, true)
    const data = vapOrder(asteroid)
    const vap200 = data[199]
    const solution = vap200.x * 100 + vap200.y
    console.log(
        `The 200th asteroid's X coordinate multiplied by 100 plus Y coordinate is: ${solution}`
    )
}

part1()
part2()
