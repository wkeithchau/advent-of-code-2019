import { getInput } from '../utils/input'
import Computer from './computer'

const INPUT = getInput(import.meta.url, ',')
const PROGRAM = INPUT.map(data => Number(data))
