import { getInput } from '../utils/input'
import { seqAmps } from './amps'

const INPUT = getInput(import.meta.url, ',')
const PROGRAM = INPUT.map(data => Number(data))

const part1 = async () => {
    const signals = []
    const phaseSettings = [0, 1, 2, 3, 4]
    const settingA = phaseSettings.slice()
    for (let i = 0; i < settingA.length; i += 1) {
        const phaseA = settingA[i]
        const settingB = settingA.filter(val => val !== phaseA)
        for (let j = 0; j < settingB.length; j += 1) {
            const phaseB = settingB[j]
            const settingC = settingB.filter(val => val !== phaseB)
            for (let k = 0; k < settingC.length; k += 1) {
                const phaseC = settingC[k]
                const settingD = settingC.filter(val => val !== phaseC)
                for (let l = 0; l < settingD.length; l += 1) {
                    const phaseD = settingD[l]
                    const phaseE = settingD.filter(val => val !== phaseD)[0]
                    const seq = [phaseA, phaseB, phaseC, phaseD, phaseE]
                    const signal = await seqAmps(PROGRAM, seq)
                    signals.push(signal)
                }
            }
        }
    }

    const max = Math.max(...signals)
    console.log(`Highest signal that can be sent to the thrusters: ${max}`)
}

part1()
