import { orientation } from './constants'
import Segment from './segment'

class Wire {
    xPos = 0
    yPos = 0
    segments = []
    steps = 0

    addLeft = length => {
        const newXPos = this.xPos - length
        const pointA = { x: newXPos, y: this.yPos }
        const pointB = { x: this.xPos, y: this.yPos }
        const segment = new Segment(
            pointA,
            pointB,
            orientation.left,
            this.steps
        )
        this.segments.push(segment)
        this.xPos = newXPos
        this.steps += length
    }

    addRight = length => {
        const newXPos = this.xPos + length
        const pointA = { x: this.xPos, y: this.yPos }
        const pointB = { x: newXPos, y: this.yPos }
        const segment = new Segment(
            pointA,
            pointB,
            orientation.right,
            this.steps
        )
        this.segments.push(segment)
        this.xPos = newXPos
        this.steps += length
    }

    addUp = length => {
        const newYPos = this.yPos + length
        const pointA = { x: this.xPos, y: this.yPos }
        const pointB = { x: this.xPos, y: newYPos }
        const segment = new Segment(pointA, pointB, orientation.up, this.steps)
        this.segments.push(segment)
        this.yPos = newYPos
        this.steps += length
    }

    addDown = length => {
        const newYPos = this.yPos - length
        const pointA = { x: this.xPos, y: newYPos }
        const pointB = { x: this.xPos, y: this.yPos }
        const segment = new Segment(
            pointA,
            pointB,
            orientation.down,
            this.steps
        )
        this.segments.push(segment)
        this.yPos = newYPos
        this.steps += length
    }

    addSegment = section => {
        const sec = section.slice()
        const direction = sec[0]
        const length = Number(sec.substring(1))

        if (direction === orientation.left) {
            this.addLeft(length)
        } else if (direction === orientation.right) {
            this.addRight(length)
        } else if (direction === orientation.up) {
            this.addUp(length)
        } else if (direction === orientation.down) {
            this.addDown(length)
        }
    }

    addSegments = sections => {
        sections.forEach(section => {
            this.addSegment(section)
        })
    }

    reset = () => {
        this.xPos = 0
        this.yPos = 0
        this.segments = []
        this.steps = 0
    }
}

export default Wire
