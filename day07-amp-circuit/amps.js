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
