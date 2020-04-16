import { getInput } from '../utils/input'
import Computer from './computer'

const INPUT = getInput(import.meta.url, ',')
const PROGRAM = INPUT.map(data => Number(data))

const part1 = async () => {
    console.log('part1 - ACU Test')
    await Computer.run(PROGRAM)
}

part1()
