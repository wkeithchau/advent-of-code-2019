class Segment {
    x1
    x2
    y1
    y2

    constructor(pointA, pointB, direction, steps) {
        this.x1 = pointA.x
        this.x2 = pointB.x
        this.y1 = pointA.y
        this.y2 = pointB.y
        this.direction = direction
        this.inital = steps
    }
}

export default Segment
