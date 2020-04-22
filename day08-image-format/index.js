import { getInput } from '../utils/input'
import { displayImage, findFewestZero, getLayers, visiblePixels } from './image'
import { pixel } from './constants'

const INPUT = getInput(import.meta.url, '')
const IMAGE = INPUT.map(data => Number(data))

const part1 = () => {
    const zeroLayer = findFewestZero(IMAGE)
    const ones = zeroLayer.filter(val => val === 1).length
    const twos = zeroLayer.filter(val => val === 2).length
    const number = ones * twos
    console.log(
        `Number of 1 digits multiplied by the number of 2 digits: ${number}`
    )
}

const part2 = () => {
    const layers = getLayers(IMAGE)
    const pixels = visiblePixels(layers)
    const layeredPixels = getLayers(pixels, { width: pixel.width, height: 1 })
    console.log('Message produced:')
    displayImage(layeredPixels)
}

part1()
part2()
