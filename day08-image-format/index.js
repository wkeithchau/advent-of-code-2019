import { getInput } from '../utils/input'
import { findFewestZero } from './image'

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

part1()
