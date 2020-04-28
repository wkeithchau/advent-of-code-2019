import { directionChar, turnCode } from './constants'

class Navigator {
    current = [0, 0]
    direction = directionChar.up

    turnLeft = () => {
        if (this.direction === directionChar.up) {
            this.direction = directionChar.left
            this.current[0] += -1
        } else if (this.direction === directionChar.left) {
            this.direction = directionChar.down
            this.current[1] += 1
        } else if (this.direction === directionChar.down) {
            this.direction = directionChar.right
            this.current[0] += 1
        } else if (this.direction === directionChar.right) {
            this.direction = directionChar.up
            this.current[1] += -1
        }
        return this.current
    }

    turnRight = () => {
        if (this.direction === directionChar.up) {
            this.direction = directionChar.right
            this.current[0] += 1
        } else if (this.direction === directionChar.right) {
            this.direction = directionChar.down
            this.current[1] += 1
        } else if (this.direction === directionChar.down) {
            this.direction = directionChar.left
            this.current[0] += -1
        } else if (this.direction === directionChar.left) {
            this.direction = directionChar.up
            this.current[1] += -1
        }
        return this.current
    }

    turn = direction => {
        if (direction === turnCode.left) {
            return this.turnLeft()
        } else if (direction === turnCode.right) {
            return this.turnRight()
        }
    }

    reset = () => {
        this.current = [0, 0]
        this.direction = directionChar.up
    }
}

export default Navigator
