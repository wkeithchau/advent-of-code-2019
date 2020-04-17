import { getInput } from '../utils/input'
import { loadMap, orbitCount } from './map'

const INPUT = getInput(import.meta.url, '\n')
const ORBITS = INPUT.map(data => data.split(')'))

const part1 = () => {
    const directory = loadMap(ORBITS)
    const count = orbitCount(directory)
    console.log(`Total number of direct and indirect orbits: ${count}`)
}

part1()
