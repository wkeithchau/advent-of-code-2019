export const crossDistance = cross => {
    return Math.abs(cross.x) + Math.abs(cross.y)
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
            crosses.push(cross)
        })
    })

    return crosses
}

export const closestCross = crosses => {
    const nonZeroCrosses = crosses.filter(cross => cross.distance !== 0)
    const distances = nonZeroCrosses.map(cross => cross.distance)
    const shortestDistance = Math.min(...distances)
    const closestCross = crosses.find(
        cross => cross.distance === shortestDistance
    )
    return closestCross
}
