import { colorCode } from './constants'
import Navigator from './navigator'

class Map {
    panels = {}
    navigator

    input = []
    inputClosed = false
    end = false
    outputComputer = undefined

    constructor() {
        this.navigator = new Navigator()
    }

    paintPanel = () => {
        const color = this.input.shift()
        const [x, y] = this.navigator.current
        this.panels[`${x},${y}`] = color
    }

    moveNavigator = () => {
        const direction = this.input.shift()
        const [newX, newY] = this.navigator.turn(direction)
        let newPanelColor = this.panels[`${newX},${newY}`]
        if (newPanelColor === undefined) {
            newPanelColor = colorCode.black
        }
        this.outputComputer.input.push(newPanelColor)
    }

    execute = async () => {
        if (this.inputClosed === true) {
            this.end = true
        }
        if (this.input !== undefined && this.input.length > 1) {
            this.paintPanel()
            this.moveNavigator()
        }
    }

    run = async (startColor = colorCode.black) => {
        this.outputComputer.input.push(startColor)

        while (this.end !== true) {
            await this.execute()
        }
    }

    display = () => {
        const colors = Object.values(this.panels)
        const coordinates = Object.keys(this.panels)
        const xValues = []
        const yValues = []
        coordinates.forEach(coord => {
            const [x, y] = coord.split(',')
            xValues.push(x)
            yValues.push(y)
        })
        const xSize = Math.max(...xValues)
        const ySize = Math.max(...yValues)
        const pixels = []
        for (let i = 0; i < ySize + 1; i++) {
            const row = Array(xSize + 1).fill(colorCode.black)
            pixels.push(row)
        }

        coordinates.forEach((coord, idx) => {
            const x = xValues[idx]
            const y = yValues[idx]
            pixels[y][x] = colors[idx]
        })
        const display = []
        pixels.forEach(row => {
            const colored = row.map(value => {
                if (value === colorCode.white) {
                    return '█'
                }
                if (value === colorCode.black) {
                    return '.'
                }
            })
            const line = colored.join('')
            display.push(line)
            console.log(line)
        })
        return display
    }

    reset = () => {
        this.panels = {}
        this.input = []
        this.inputClosed = false
        this.end = false
        this.outputComputer = undefined
    }
}

export default Map
