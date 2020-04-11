import { orientation } from './constants'
import Segment from './segment'

class Wire {
    xPos = 0
    yPos = 0
    segments = []

    addLeft = length => {
        const newXPos = this.xPos - length
        const segment = new Segment(newXPos, this.xPos, this.yPos, this.yPos)
        this.segments.push(segment)
        this.xPos = newXPos
    }

    addRight = length => {
        const newXPos = this.xPos + length
        const segment = new Segment(this.xPos, newXPos, this.yPos, this.yPos)
        this.segments.push(segment)
        this.xPos = newXPos
    }

    addUp = length => {
        const newYPos = this.yPos + length
        const segment = new Segment(this.xPos, this.xPos, this.yPos, newYPos)
        this.segments.push(segment)
        this.yPos = newYPos
    }

    addDown = length => {
        const newYPos = this.yPos - length
        const segment = new Segment(this.xPos, this.xPos, newYPos, this.yPos)
        this.segments.push(segment)
        this.yPos = newYPos
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

    reset = () => {
        this.xPos = 0
        this.yPos = 0
        this.segments = []
    }
}

export default Wire
