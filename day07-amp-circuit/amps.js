import Computer from './computer'

export const seqAmps = async (program, input, logging = false) => {
    const ampA = new Computer('A')
    const inputA = [input[0], 0]
    const outputA = await ampA.run(program, inputA, { logging: logging })

    const ampB = new Computer('B')
    const inputB = [input[1], outputA[0]]
    const outputB = await ampB.run(program, inputB, { logging: logging })

    const ampC = new Computer('C')
    const inputC = [input[2], outputB[0]]
    const outputC = await ampC.run(program, inputC, { logging: logging })

    const ampD = new Computer('D')
    const inputD = [input[3], outputC[0]]
    const outputD = await ampD.run(program, inputD, { logging: logging })

    const ampE = new Computer('E')
    const inputE = [input[4], outputD[0]]
    const outputE = await ampE.run(program, inputE, { logging: logging })

    return outputE[0]
}

export const loopAmps = async (program, input, logging = false) => {
    const ampA = new Computer('A')
    const inputA = [input[0], 0]
    const ampB = new Computer('B')
    const inputB = [input[1]]
    const ampC = new Computer('C')
    const inputC = [input[2]]
    const ampD = new Computer('D')
    const inputD = [input[3]]
    const ampE = new Computer('E')
    const inputE = [input[4]]

    // Link up outputs between computers
    ampA.outputComputer = ampB
    ampB.outputComputer = ampC
    ampC.outputComputer = ampD
    ampD.outputComputer = ampE
    ampE.outputComputer = ampA

    ampA.run(program, inputA, { logging: logging, loop: true })
    ampB.run(program, inputB, { logging: logging, loop: true })
    ampC.run(program, inputC, { logging: logging, loop: true })
    ampD.run(program, inputD, { logging: logging, loop: true })
    ampE.run(program, inputE, { logging: logging, loop: true })

    let allEnd = false
    while (allEnd === false) {
        allEnd = ampA.end && ampB.end && ampC.end && ampD.end && ampE.end
        if (allEnd === false) {
            await new Promise(resolve => {
                setTimeout(resolve, 5)
            })
        }
    }
    const outputs = [
        ...ampA.output,
        ...ampB.output,
        ...ampC.output,
        ...ampD.output,
        ...ampE.output,
    ]
    const max = Math.max(...outputs)
    return max
}
