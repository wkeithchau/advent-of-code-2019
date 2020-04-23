import { getInput } from '../utils/input'
import Computer from './computer'

const INPUT = getInput(import.meta.url, ',')
const PROGRAM = INPUT.map(data => Number(data))

const part1 = async () => {
    const computer = new Computer('intercode')
    const output = await computer.run(PROGRAM, [1], { logging: false })
    console.log(`BOOST keycode: ${output[0]}`)
}

const part2 = async () => {
    const computer = new Computer('intercode')
    const output = await computer.run(PROGRAM, [2], { logging: false })
    console.log(`Coordinates of the distress signal: ${output[0]}`)
}

part1()
part2()
