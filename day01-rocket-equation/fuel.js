export const fuelRequired = mass => {
    return Math.floor(mass / 3) - 2
}

export const advanceFuelRequired = mass => {
    let fuel = fuelRequired(mass)

    if (fuel > 0) {
        fuel += advanceFuelRequired(fuel)
    }
    return Math.max(fuel, 0)
}

export const totalFuel = (modules, fn = fuelRequired) => {
    let totalFuel = 0
    modules.forEach(mass => {
        const fuel = fn(mass)
        totalFuel += fuel
    })
    return totalFuel
}
