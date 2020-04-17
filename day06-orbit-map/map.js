import Orbit from './orbit'

export const loadMap = orbits => {
    const directory = {}
    orbits.forEach(data => {
        const [orbiteeName, orbiterName] = data
        let orbitee = directory[orbiteeName]
        let orbiter = directory[orbiterName]

        if (orbitee === undefined) {
            orbitee = new Orbit(orbiteeName)
            directory[orbiteeName] = orbitee
        }
        if (orbiter === undefined) {
            orbiter = new Orbit(orbiterName)
            directory[orbiterName] = orbiter
        }
        orbiter.parent = orbitee
    })
    return directory
}

export const orbitCount = directory => {
    const orbits = Object.values(directory)
    let count = 0
    orbits.forEach(orbit => {
        let obj = orbit
        while (obj.parent !== undefined) {
            obj = obj.parent
            count += 1
        }
    })
    return count
}
