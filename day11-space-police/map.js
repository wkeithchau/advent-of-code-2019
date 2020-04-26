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

    run = async () => {
        this.outputComputer.input.push(colorCode.black)

        while (this.end !== true) {
            await this.execute()
        }
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
