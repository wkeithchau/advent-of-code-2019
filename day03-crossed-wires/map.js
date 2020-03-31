import { symbol } from './constants'

class Map {
    grid = [[symbol.port]]
    portPosition = [0, 0]
    wire1Head = [0, 0]
    wire2Head = [0, 0]

    setPortPosition = (row, column) => {
        this.portPosition[0] = row
        this.portPosition[1] = column
    }

    setHead = (headType, head) => {
        if (headType === symbol.wire1) {
            this.setWire1Head(...head)
        } else if (headType === symbol.wire2) {
            this.setWire2Head(...head)
        }
    }

    setWire1Head = (row, column) => {
        this.wire1Head[0] = row
        this.wire1Head[1] = column
    }

    setWire2Head = (row, column) => {
        this.wire2Head[0] = row
        this.wire2Head[1] = column
    }

    show = () => {
        console.log()
        this.grid.forEach(row => {
            console.log(row.join(' '))
            console.log()
        })
    }

    reset = () => {
        this.grid = [[symbol.port]]
        this.portPosition = [0, 0]
        this.wire1Head = [0, 0]
        this.wire2Head = [0, 0]
    }
}

const map = new Map()
export default map