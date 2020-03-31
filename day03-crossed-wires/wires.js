import { orientation, symbol } from './constants'
import Map from './map'

export const getSymbol = (oldSymbol, newSymbol) => {
    if (oldSymbol === symbol.wire1 || oldSymbol === symbol.wire2) {
        if (newSymbol !== oldSymbol) {
            return symbol.cross
        }
    } else if (oldSymbol === symbol.port || oldSymbol === symbol.cross) {
        return oldSymbol
    }
    return newSymbol
}

export const drawLeft = (length, head, headType) => {
    const [xPos, yPos] = head

    for (let i = 1; i <= length; i += 1) {
        const pos = xPos - i

        if (pos < 0) {
            Map.grid.forEach((row, idx) => {
                let newSymbol = symbol.space
                if (idx === yPos) {
                    newSymbol = headType
                }
                Map.grid[idx].unshift(newSymbol)
            })
        } else {
            Map.grid.forEach((row, idx) => {
                const currentSymbol = row[pos]
                let newSymbol = symbol.space
                if (idx === yPos) {
                    newSymbol = getSymbol(currentSymbol, headType)
                }
                Map.grid[idx][pos] = newSymbol
            })
        }
    }

    const newXPos = Math.max(0, xPos - length)
    return [newXPos, yPos]
}

export const drawRight = (length, head, headType) => {}

export const drawUp = (length, head, headType) => {}

export const drawDown = (length, head, headType) => {}

export const mapSection = (section, headType) => {
    const sec = section.slice()
    const direction = sec.shift()
    const length = Number(sec)

    let head
    if (headType === symbol.wire1) {
        head = Map.wire1Head
    } else if (headType === symbol.wire2) {
        head = Map.wire2Head
    }

    let updatedHead = []
    if (direction === orientation.left) {
        updatedHead = drawLeft(length, head, headType)
    } else if (direction === orientation.right) {
        updatedHead = drawRight(length, head, headType)
    } else if (direction === orientation.up) {
        updatedHead = drawUp(length, head, headType)
    } else if (direction === orientation.down) {
        updatedHead = drawDown(length, head, headType)
    }

    if (updatedHead.length !== 0) {
        Map.setHead(headType, updatedHead)
    }
}
