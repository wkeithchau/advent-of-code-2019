import { getInput } from '../utils/input'
import { meetCriteria } from './password'

const INPUT = getInput(import.meta.url, '\n')
const RANGE = INPUT[0].split('-').map(data => Number(data))

const part1 = () => {
    const passwords = []
    for (let i = RANGE[0]; i <= RANGE[1]; i += 1) {
        const meet = meetCriteria(i, RANGE)
        if (meet === true) {
            passwords.push(i)
        }
    }

    console.log(
        `Number of passwords that meet the criteria is: ${passwords.length}`
    )
}

const part2 = () => {
    const passwords = []
    for (let i = RANGE[0]; i <= RANGE[1]; i += 1) {
        const meet = meetCriteria(i, RANGE, 'strict')
        if (meet === true) {
            passwords.push(i)
        }
    }

    console.log(
        `Number of passwords that meet the criteria is: ${passwords.length}`
    )
}

part1()
part2()
