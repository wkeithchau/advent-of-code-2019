export const opcode = {
    add: 1,
    multiply: 2,
    input: 3,
    output: 4,
    jumpTrue: 5,
    jumpFalse: 6,
    lessThan: 7,
    equal: 8,
    end: 99,
}

export const opLength = {
    add: 4,
    multiply: 4,
    input: 2,
    output: 2,
    jumpTrue: 3,
    jumpFalse: 3,
    lessThan: 4,
    equal: 4,
    end: 1,
}

export const parameterMode = {
    position: 0,
    immediate: 1,
}

export const systemId = {
    acu: 1,
    trc: 5,
}
