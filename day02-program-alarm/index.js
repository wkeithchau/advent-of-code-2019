import { getInput } from '../utils/input'
import { findOutput, getAnswer, restoreState, runProgram } from './program'

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

const part2 = () => {
    const desiredOutput = [0, 19690720]
    const results = []
    const valueRange = [0, 99]

    for (let i = valueRange[0]; i < valueRange[1]; i += 1) {
        for (let j = valueRange[0]; j < valueRange[1]; j += 1) {
            const states = [
                [1, j],
                [2, i],
            ]

            const currentState = restoreState(PROGRAM, states)
            const completedState = runProgram(currentState)

            results.push(completedState)
        }
    }

    const [matchedNoun, matchedVerb] = findOutput(results, desiredOutput)
    const answer = getAnswer(matchedNoun, matchedVerb)

    console.log(
        `Output of ${desiredOutput[1]} has noun=${matchedNoun} and verb=${matchedVerb} and gives the answer: ${answer}`
    )
}

part1()
part2()
