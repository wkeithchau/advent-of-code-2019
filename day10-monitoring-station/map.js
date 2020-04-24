import { symbol } from './constants'

export const findAsteroids = map => {
    const asteroids = []
    map.forEach((row, y) => {
        row.forEach((val, x) => {
            if (val === symbol.asteroid) {
                asteroids.push([x, y])
            }
        })
    })
    return asteroids
}

export const getAngle = (xDiff, yDiff) => {
    let angle = String(Math.abs(yDiff / xDiff))
    let xSign = '+'
    let ySign = '+'
    if (xDiff < 0) {
        xSign = '-'
    }
    if (yDiff < 0) {
        ySign = '-'
    }
    angle += xSign + ySign
    return angle
}

export const surveyAsteroids = asteroids => {
    const data = []
    asteroids.forEach(asteroid => {
        let angles = []
        asteroids.forEach(nearByAsteroid => {
            const x = asteroid[0] - nearByAsteroid[0]
            const y = asteroid[1] - nearByAsteroid[1]
            const angle = getAngle(x, y)

            angles.push(angle)
        })
        angles = angles.filter(
            (val, idx) => idx === angles.indexOf(val) && val !== 'NaN++'
        )
        const asteroidData = {
            x: asteroid[0],
            y: asteroid[1],
            data: angles,
            count: angles.length,
        }
        data.push(asteroidData)
    })
    return data
}

export const bestLocation = map => {
    const asteroids = findAsteroids(map)
    const data = surveyAsteroids(asteroids)
    const asteroidCounts = data.map(val => val.count)
    const maxAsteroids = Math.max(...asteroidCounts)
    const index = asteroidCounts.indexOf(maxAsteroids)
    const asteroid = data[index]
    return asteroid
}
