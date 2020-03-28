import { getInput } from '../utils/input'
import { restoreState, runProgram } from './program'

const INPUT = getInput(import.meta.url, ',')
const PROGRAM = INPUT.map(data => Number(data))

const part1 = () => {
    const STATES = [
        [1, 12],
        [2, 2],
    ]

    const currentState = restoreState(PROGRAM, STATES)
    const completedState = runProgram(currentState)

    console.log(
        `The value is left at the program's position 0 after the program halts: ${completedState[0]}`
    )
}

part1()
