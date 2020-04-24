import { getInput } from '../utils/input'

import { bestLocation } from './map'

const INPUT = getInput(import.meta.url, '\n')
const MAP = INPUT.map(data => data.split(''))

const part1 = () => {
    const asteroid = bestLocation(MAP)
    console.log(
        `Location x:${asteroid.x} y:${asteroid.y} can detect the most number of asteroids: ${asteroid.count}`
    )
}

part1()
