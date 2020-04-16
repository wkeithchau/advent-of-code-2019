import { getInput } from '../utils/input'
import { systemId } from './constants'
import Computer from './computer'

const INPUT = getInput(import.meta.url, ',')
const PROGRAM = INPUT.map(data => Number(data))

const diagnose = async () => {
    console.log('Diagnostic Test')
    console.log(`Part1 - air conditioner unit: system_id=${systemId.acu}`)
    console.log(
        `Part2 - thermal radiator controller: system_id=${systemId.trc}`
    )
    await Computer.run(PROGRAM)
}

diagnose()
