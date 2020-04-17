import { expect } from 'chai'

import Orbit from './orbit'

describe('Orbit Class', function() {
    describe('Constructor', function() {
        it('Sets orbit name', function() {
            const name = 'ABC'
            const orbit = new Orbit(name)
            const orbitName = orbit.name
            expect(orbitName).to.equal(name)
        })

        it('Sets orbit parent', function() {
            const parent = new Orbit('parent')
            const orbit = new Orbit('child', parent)
            const orbitee = orbit.parent
            expect(parent).to.equal(orbitee)
        })
    })
})
