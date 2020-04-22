import { getInput } from '../utils/input'

const INPUT = getInput(import.meta.url, ',')
const PROGRAM = INPUT.map(data => Number(data))
