import { pixel } from './constants'

export const getLayers = (image, pixelDim = pixel) => {
    const imageDimension = pixelDim.width * pixelDim.height
    const layers = []
    const rawImage = image.slice()
    while (rawImage.length !== 0) {
        const layer = rawImage.splice(0, imageDimension)
        layers.push(layer)
    }
    return layers
}

export const findFewestZero = (image, pixelDim) => {
    const layers = getLayers(image, pixelDim)
    const zeroes = []
    layers.forEach(layer => {
        const zero = layer.filter(val => val === 0)
        zeroes.push(zero.length)
    })
    const minZeroes = Math.min(...zeroes)
    const index = zeroes.indexOf(minZeroes)
    const zeroLayer = layers[index]
    return zeroLayer
}
