import { getInput } from '../utils/input'

import Wire from './wire'
import { closestCross, findCrosses } from './wires'

const INPUT = getInput(import.meta.url, '\n')
const WIRE1 = INPUT[0].split(',')
const WIRE2 = INPUT[1].split(',')

const part1 = () => {
    const wire1 = new Wire()
    wire1.addSegments(WIRE1)
    const wire2 = new Wire()
    wire2.addSegments(WIRE2)

    const crosses = findCrosses(wire1, wire2)
    const cross = closestCross(crosses)
    const distance = cross.distance

    console.log(
        `Closest intersection to the port has Manhattan distance: ${distance}`
    )
}

part1()
