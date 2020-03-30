import { orientation } from './constants'
import Map from './map'

export const drawLeft = length => {}

export const drawRight = length => {}

export const drawUp = length => {}

export const drawDown = length => {}

export const mapSection = section => {
    const sec = section.slice()
    const direction = sec.shift()
    const length = Number(sec)

    if (direction === orientation.left) {
        drawLeft(length)
    } else if (direction === orientation.right) {
        drawRight(length)
    } else if (direction === orientation.up) {
        drawUp(length)
    } else if (direction === orientation.down) {
        drawDown(length)
    }
}
