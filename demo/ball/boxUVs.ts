const defaultUvs = [
    // Front
    0.0, 0.0, 0.25, 0.0, 1.0 * 0.25, 1.0*0.25, 0.0, 1.0 * 0.25,
    // Back
    0.0, 0.0, 1.0 * 0.25, 0.0, 1.0 * 0.25, 1.0 * 0.25, 0.0, 1.0 * 0.25,
    // Top
    0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
    // Bottom
    0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
    // Right
    0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
    // Left
    0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
]

export const getBoxUVs = (numTilesX : number, numTilesY : number) =>{
    const arr = [0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,]

    const tileX = 1 / numTilesX
    const bottom = arr.map((_,i) => i%2 ? arr[i] * 0.25 + 0.25 : arr[i] * tileX + 5* tileX)
    const top = bottom.map((_,i) => i%2 ? bottom[i] + 0.25 : bottom[i])
    const side = bottom.map((_,i) => i%2 ? bottom[i] + 0.5 : bottom[i])
    return new Float32Array([
        // Front
        ...side,
        // Back
        ...side,
        // Top
        ...top,
        // Bottom
        ...bottom,
        // Right
        ...side,
        // Left
        ...side,
    ])
}