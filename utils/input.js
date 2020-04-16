import fs from 'fs'
import path from 'path'
import readline from 'readline'

const PROCESS_PATH = `file://${process.cwd()}`

const readFile = path => {
    return fs.readFileSync(path, 'utf8')
}

export const getInput = (absUrl, seperator) => {
    const relativePath = path.relative(PROCESS_PATH, absUrl)
    const inputPath = `${path.dirname(relativePath)}/input`

    const input = readFile(inputPath)
    const lines = input.split(seperator)
    return lines
}

export const userInput = question => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })

    return new Promise(resolve => {
        rl.question(question, input => {
            resolve(input)
            rl.close()
        })
    })
}
