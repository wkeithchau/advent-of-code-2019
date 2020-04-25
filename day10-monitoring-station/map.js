import { quadrantSign, symbol } from './constants'

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

export const getQuad = angle => {
    const quadSign = angle.slice(angle.length - 2)
    let quad
    if (quadSign === quadrantSign.one) {
        quad = 1
    } else if (quadSign === quadrantSign.two) {
        quad = 2
    } else if (quadSign === quadrantSign.three) {
        quad = 3
    } else if (quadSign === quadrantSign.four) {
        quad = 4
    }
    return quad
}

export const surveyAsteroids = asteroids => {
    const data = []
    asteroids.forEach(asteroid => {
        let angles = []
        asteroids.forEach(nearByAsteroid => {
            const x = nearByAsteroid[0] - asteroid[0]
            const y = nearByAsteroid[1] - asteroid[1]
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

const surveyAsteroidsInFull = asteroids => {
    const data = []
    asteroids.forEach(asteroid => {
        let angles = []
        const fullData = []
        asteroids.forEach(nearByAsteroid => {
            const x = nearByAsteroid[0] - asteroid[0]
            const y = nearByAsteroid[1] - asteroid[1]
            let angle = getAngle(x, y)
            angles.push(angle)
            if (angle !== 'NaN++') {
                // Gathering more data
                const quad = getQuad(angle)
                angle = Number(angle.slice(0, angle.length - 2))
                const distance = Math.abs(x) + Math.abs(y)
                const data = {
                    x: nearByAsteroid[0],
                    y: nearByAsteroid[1],
                    angle: angle,
                    quadrant: quad,
                    distance: distance,
                }
                fullData.push(data)
            }
        })
        angles = angles.filter(
            (val, idx) => idx === angles.indexOf(val) && val !== 'NaN++'
        )
        const asteroidData = {
            x: asteroid[0],
            y: asteroid[1],
            data: angles,
            fullData: fullData,
            count: angles.length,
        }
        data.push(asteroidData)
    })
    return data
}

export const bestLocation = (map, full = false) => {
    let surveyFn = surveyAsteroids
    if (full === true) {
        surveyFn = surveyAsteroidsInFull
    }
    const asteroids = findAsteroids(map)
    const data = surveyFn(asteroids)
    const asteroidCounts = data.map(val => val.count)
    const maxAsteroids = Math.max(...asteroidCounts)
    const index = asteroidCounts.indexOf(maxAsteroids)
    const asteroid = data[index]
    return asteroid
}

const clockWiseOrder = (val1, val2) => {
    let result = 0
    if (val1.quadrant < val2.quadrant) {
        result = -1
    } else if (val1.quadrant > val2.quadrant) {
        result = 1
    } else if (val1.angle < val2.angle) {
        if (val1.quadrant === 1 || val1.quadrant === 3) {
            result = 1
        } else {
            result = -1
        }
    } else if (val1.angle > val2.angle) {
        if (val1.quadrant === 1 || val1.quadrant === 3) {
            result = -1
        } else {
            result = 1
        }
    } else if (val1.distance < val2.distance) {
        result = -1
    } else if (val1.distance > val2.distance) {
        result = 1
    }
    return result
}

export const vapOrder = location => {
    const data = location.fullData
    const clockWiseAsteroids = data.sort(clockWiseOrder)
    const vap = []
    const asteroidCount = clockWiseAsteroids.length
    let markedAngles = []
    while (vap.length !== asteroidCount) {
        const nextValids = clockWiseAsteroids.filter(asteroid => {
            const matches = markedAngles.filter(
                val =>
                    val.angle === asteroid.angle &&
                    val.quadrant === asteroid.quadrant
            )
            return matches.length === 0
        })
        let nextAsteroid
        if (nextValids.length === 0) {
            nextAsteroid = clockWiseAsteroids.shift()
            markedAngles = []
        } else {
            const index = clockWiseAsteroids.indexOf(nextValids[0])
            nextAsteroid = clockWiseAsteroids.splice(index, 1)[0]
        }
        vap.push(nextAsteroid)
        markedAngles.push(nextAsteroid)
    }
    return vap
}
