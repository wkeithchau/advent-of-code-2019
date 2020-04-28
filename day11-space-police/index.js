import { getInput } from '../utils/input'

import Computer from './computer'
import { colorCode } from './constants'
import Map from './map'

const INPUT = getInput(import.meta.url, ',')
const PROGRAM = INPUT.map(data => Number(data))

const part1 = async () => {
    const map = new Map()
    const robot = new Computer('robot')
    // Link the map and robot together
    map.outputComputer = robot
    robot.outputComputer = map

    map.run()
    robot.run(PROGRAM, [], { loop: true, logging: false })

    let allEnd = false
    while (allEnd === false) {
        allEnd = map.end && robot.end
        if (allEnd === false) {
            await new Promise(resolve => {
                setTimeout(resolve, 5)
            })
        }
    }

    const panels = map.panels
    const panelCount = Object.keys(panels).length
    console.log(
        `Number of panels that the robot painted at least once: ${panelCount}`
    )
}

const part2 = async () => {
    const map = new Map()
    const robot = new Computer('robot')
    // Link the map and robot together
    map.outputComputer = robot
    robot.outputComputer = map

    map.run(colorCode.white)
    robot.run(PROGRAM, [], { loop: true, logging: false })

    let allEnd = false
    while (allEnd === false) {
        allEnd = map.end && robot.end
        if (allEnd === false) {
            await new Promise(resolve => {
                setTimeout(resolve, 5)
            })
        }
    }

    console.log('Registration Identifier:')
    map.display()

    // const panelCount = Object.keys(panels).length
    // console.log(
    //     `Number of panels that the robot painted at least once: ${panelCount}`
    // )
}

part1()
part2()
