import { getInput } from '../utils/input'
import Computer from './computer'

const INPUT = getInput(import.meta.url, ',')
const PROGRAM = INPUT.map(data => Number(data))

const part1 = async () => {
    const computer = new Computer('intercode')
    await computer.run(PROGRAM, [1])
}

part1()
