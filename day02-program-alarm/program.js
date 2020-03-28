const setSize = 4

export const opcode = {
    add: 1,
    multiply: 2,
    end: 99,
}

export const getSet = (program, position) => {
    const set = program.slice(position, position + setSize)
    return set
}

export const addOp = (program, positions) => {
    const changedProgram = program.slice()
    const [position1, position2, destination] = positions
    const value1 = program[position1]
    const value2 = program[position2]
    changedProgram[destination] = value1 + value2
    return changedProgram
}

export const multiplyOp = (program, positions) => {
    const changedProgram = program.slice()
    const [position1, position2, destination] = positions
    const value1 = program[position1]
    const value2 = program[position2]
    changedProgram[destination] = value1 * value2
    return changedProgram
}

export const runProgram = program => {
    let instructions = program.slice()
    for (let i = 0; instructions[i] !== opcode.end; i += 4) {
        const set = getSet(instructions, i)
        const code = set[0]
        set.shift()

        let opFn = () => {}
        if (code === opcode.add) {
            opFn = addOp
        } else if (code === opcode.multiply) {
            opFn = multiplyOp
        }
        instructions = opFn(instructions, set)
    }
    return instructions
}

export const restoreState = (program, states = []) => {
    const newProgram = program.slice()
    states.forEach(state => {
        const [position, value] = state
        newProgram[position] = value
    })
    return newProgram
}
