import { getInput } from '../utils/input'

const INPUT = getInput(import.meta.url, '\n')
const WIRE1 = INPUT[0].split(',')
const WIRE2 = INPUT[1].split(',')

// map out wire1
// map out wrire2

// mapping out wires
/**
 * use '1' for wire1 in the map
 * use '2' for wire2 in the map
 * when there is already a '1' in place, mark as 'x'
 * after mapping wire1, map wire2 on the same board
 *
 *
 * handle right, left (array push, unshift)
 * handle up, down (add/edit array above or below at the same position)
 */

// check for crosses
// get distance of crosses from central port
// provide shortest distance
