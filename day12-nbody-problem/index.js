import { getInput } from '../utils/input'

import System from './system'

const INPUT = getInput(import.meta.url, '\n')
const MOONS = INPUT.map(moon => {
    const regex = /<*>*/g
    let positions = moon.replace(regex, '').split(', ')
    positions = positions.map(pos => {
        const value = pos.split('=')[1]
        return Number(value)
    })
    return positions
})

const part1 = () => {
    System.setMoons(MOONS)
    System.simulate(1000)
    const totalEnergy = System.totalEnergy()
    console.log(
        `Total energy of the system after 1000 steps is: ${totalEnergy}`
    )
}

part1()
