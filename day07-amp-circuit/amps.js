import Computer from './computer'

export const seqAmps = async (program, input) => {
    const ampA = new Computer()
    const inputA = [input[0], 0]
    const outputA = await ampA.run(program, inputA)

    const ampB = new Computer()
    const inputB = [input[1], outputA[0]]
    const outputB = await ampB.run(program, inputB)

    const ampC = new Computer()
    const inputC = [input[2], outputB[0]]
    const outputC = await ampC.run(program, inputC)

    const ampD = new Computer()
    const inputD = [input[3], outputC[0]]
    const outputD = await ampD.run(program, inputD)

    const ampE = new Computer()
    const inputE = [input[4], outputD[0]]
    const outputE = await ampE.run(program, inputE)

    return outputE[0]
}
