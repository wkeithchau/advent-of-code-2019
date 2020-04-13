export const hasSixDigits = number => {
    const numStr = number.toString()
    return numStr.length === 6
}

export const isWithinRange = (number, range) => {
    return number >= range[0] && number <= range[1]
}

export const hasDouble = number => {
    const numStr = number.toString()
    let double = false
    for (let i = 1; i < numStr.length; i += 1) {
        if (Number(numStr[i]) === Number(numStr[i - 1])) {
            double = true
        }
    }
    return double
}

export const hasStrictDouble = number => {
    const numStr = number.toString()
    const dups = {}
    for (let i = 1; i < numStr.length; i += 1) {
        if (Number(numStr[i]) === Number(numStr[i - 1])) {
            const digit = numStr[i]
            if (dups[digit] === undefined) {
                dups[digit] = []
            }
            dups[digit].push(i - 1, i)
        }
    }

    const doubles = Object.values(dups)
    let uniqueDouble = false
    doubles.forEach(double => {
        const group = double.filter(
            (value, idx) => double.indexOf(value) === idx
        )
        if (group.length === 2) {
            uniqueDouble = true
        }
    })
    return uniqueDouble
}

export const hasAccendingDigits = number => {
    const numStr = number.toString()
    let accending = true
    for (let i = 1; i < numStr.length; i += 1) {
        if (Number(numStr[i]) < Number(numStr[i - 1])) {
            accending = false
        }
    }
    return accending
}

export const meetCriteria = (
    number,
    range,
    pairs = 'normal',
    debug = false
) => {
    const sixDigits = hasSixDigits(number)
    const withinRange = isWithinRange(number, range)
    const accending = hasAccendingDigits(number)

    let doubleFn = hasDouble
    if (pairs === 'strict') {
        doubleFn = hasStrictDouble
    }
    const double = doubleFn(number)

    if (debug === false) {
        return sixDigits && withinRange && double && accending
    }

    return {
        sixDigits,
        withinRange,
        double,
        accending,
    }
}
