import fs from 'fs'
import path from 'path'

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
