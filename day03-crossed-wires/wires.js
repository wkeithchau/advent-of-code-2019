import { orientation } from './constants'

export const crossDistance = cross => {
    return Math.abs(cross.x) + Math.abs(cross.y)
}

export const crossSteps = (cross, segments) => {
    const stepDistances = []
    segments.forEach(segment => {
        let point
        if (
            segment.direction === orientation.left ||
            segment.direction === orientation.right
        ) {
            point = cross.x
        } else if (
            segment.direction === orientation.up ||
            segment.direction === orientation.down
        ) {
            point = cross.y
        }
        const steps = segment.steps(point)
        if (steps !== undefined) {
            stepDistances.push(steps)
        }
    })

    if (stepDistances.length === 0) {
        return
    }

    const totalSteps = stepDistances.reduce((total, value) => total + value)
    return totalSteps
}

export const findCrosses = (wire1, wire2) => {
    const crosses = []

    wire2.segments.forEach(segment => {
        const segments = wire1.segments.filter(
            wire1Seg =>
                ((segment.x1 <= wire1Seg.x1 && segment.x2 >= wire1Seg.x2) ||
                    (wire1Seg.x1 <= segment.x1 && wire1Seg.x2 >= segment.x2)) &&
                ((segment.y1 <= wire1Seg.y1 && segment.y2 >= wire1Seg.y2) ||
                    (wire1Seg.y1 <= segment.y1 && wire1Seg.y2 >= segment.y2))
        )
        segments.forEach(seg => {
            let cross
            if (seg.x2 - seg.x1 === 0) {
                cross = { x: seg.x1, y: segment.y1 }
            } else {
                cross = { x: segment.x1, y: seg.y1 }
            }
            cross.distance = crossDistance(cross)
            const steps = crossSteps(cross, [seg, segment])
            if (steps !== undefined) {
                cross.steps = steps
            }
            crosses.push(cross)
        })
    })

    return crosses
}

export const closestCross = (crosses, type = 'distance') => {
    const nonZeroCrosses = crosses.filter(cross => cross[type] !== 0)
    const values = nonZeroCrosses.map(cross => cross[type])
    const minValue = Math.min(...values)
    const closestCross = crosses.find(cross => cross[type] === minValue)
    return closestCross
}
