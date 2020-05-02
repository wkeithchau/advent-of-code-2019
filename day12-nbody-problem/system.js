class System {
    moons = []
    velocity = []
    stepCount = 0

    setMoons = moons => {
        this.moons = moons.slice()
        for (let i = 0; i < moons.length; i += 1) {
            const arr = Array(3)
            arr.fill(0)
            this.velocity.push(arr)
        }
    }

    applyGravity = () => {
        this.moons.forEach((moon, moonIdx) => {
            let otherMoons = this.moons.slice()
            otherMoons.splice(moonIdx, 1)

            otherMoons.forEach(otherMoon => {
                moon.forEach((axis, axisIdx) => {
                    if (axis < otherMoon[axisIdx]) {
                        this.velocity[moonIdx][axisIdx] += 1
                    } else if (axis > otherMoon[axisIdx]) {
                        this.velocity[moonIdx][axisIdx] += -1
                    }
                })
            })
        })
    }

    applyVelocity = () => {
        this.moons.forEach((moon, moonIdx) => {
            moon.forEach((axis, axisIdx) => {
                this.moons[moonIdx][axisIdx] += this.velocity[moonIdx][axisIdx]
            })
        })
    }

    step = () => {
        this.applyGravity()
        this.applyVelocity()
        this.stepCount += 1
    }

    simulate = steps => {
        for (let i = 0; i < steps; i += 1) {
            this.step()
        }
    }

    potentialEnergy = () => {
        const potEnergy = []
        this.moons.forEach(moon => {
            let sum = 0
            moon.forEach(axis => {
                sum += Math.abs(axis)
            })
            potEnergy.push(sum)
        })
        return potEnergy
    }

    kineticEnergy = () => {
        const kinEnergy = []
        this.velocity.forEach(moon => {
            let sum = 0
            moon.forEach(axis => {
                sum += Math.abs(axis)
            })
            kinEnergy.push(sum)
        })
        return kinEnergy
    }

    totalEnergy = () => {
        const potential = this.potentialEnergy()
        const kinetic = this.kineticEnergy()
        let total = 0
        for (let i = 0; i < this.moons.length; i += 1) {
            const energy = potential[i] * kinetic[i]
            total += energy
        }
        return total
    }

    reset = () => {
        this.moons = []
        this.velocity = []
        this.stepCount = 0
    }
}

const system = new System()
export default system
