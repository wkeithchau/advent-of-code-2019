import { orientation } from './constants'

const PLANE = {
    horizontal: 'horizontal',
    vertical: 'vertical',
}

class Segment {
    x1 = undefined
    x2 = undefined
    y1 = undefined
    y2 = undefined
    direction = undefined
    initial = undefined

    constructor(pointA, pointB, direction, steps) {
        this.x1 = pointA.x
        this.x2 = pointB.x
        this.y1 = pointA.y
        this.y2 = pointB.y
        this.direction = direction
        this.initial = steps
    }

    steps = pos => {
        if (this.direction === undefined || this.initial === undefined) {
            return
        }

        let startPos
        let selectedPos
        let plane
        if (this.direction === orientation.left) {
            startPos = this.x2
            selectedPos = this.x1
            plane = PLANE.horizontal
        } else if (this.direction === orientation.right) {
            startPos = this.x1
            selectedPos = this.x2
            plane = PLANE.horizontal
        } else if (this.direction === orientation.up) {
            startPos = this.y1
            selectedPos = this.y2
            plane = PLANE.vertical
        } else if (this.direction === orientation.down) {
            startPos = this.y2
            selectedPos = this.y1
            plane = PLANE.vertical
        }

        if (pos !== undefined) {
            selectedPos = pos
        }

        if (plane === PLANE.horizontal) {
            if (selectedPos < this.x1 || selectedPos > this.x2) {
                return
            }
        } else if (plane === PLANE.vertical) {
            if (selectedPos < this.y1 || selectedPos > this.y2) {
                return
            }
        }

        const travelled = Math.abs(startPos - selectedPos)
        return this.initial + travelled
    }
}

export default Segment
