import { getInput } from '../utils/input'
import { object } from './constants'
import { loadMap, orbitCount, rootPath } from './map'

const INPUT = getInput(import.meta.url, '\n')
const ORBITS = INPUT.map(data => data.split(')'))

const part1 = () => {
    const directory = loadMap(ORBITS)
    const count = orbitCount(directory)
    console.log(`Total number of direct and indirect orbits: ${count}`)
}

const part2 = () => {
    const directory = loadMap(ORBITS)
    const departure = directory[object.departure].parent
    const arrival = directory[object.arrival].parent

    // Find path to get to COM
    const departurePath = rootPath(departure, object.com)
    const arrivalPath = rootPath(arrival, object.com)
    // Get first node that intersects
    const intersection = departurePath.filter(obj => arrivalPath.includes(obj))
    const nodeName = intersection[0]
    // Get orbital transfer count to the common node
    const d2n = rootPath(departure, nodeName)
    const a2n = rootPath(arrival, nodeName)
    // Total orbital transfer count
    const transfers = d2n.length + a2n.length

    console.log(`Minimum number of orbital transfers required: ${transfers}`)
}

part1()
part2()
