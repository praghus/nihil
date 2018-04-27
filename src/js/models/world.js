import { ENTITIES_TYPE, LAYERS, NON_COLLIDE_INDEX } from '../lib/constants'
import { canJumpThrough, createRectangleObject } from '../lib/helpers'

export default class World {
    constructor (data) {
        const { layers, height, properties, width, tilesets, tilewidth } = data
        const { gravity, surfaceLevel } = properties

        this.width = parseInt(width)
        this.height = parseInt(height)
        this.gravity = parseFloat(gravity)
        this.surface = parseInt(surfaceLevel)
        this.spriteSize = parseInt(tilewidth)
        this.spriteCols = parseInt(tilesets[0].columns)
        this.renderOrder = []
        this.objects = []
        this.lightmask = []
        this.data = []

        layers.map(({name, data, objects}) => {
            this.renderOrder.push(name)
            if (data) {
                this.data[name] = [...Array(width).keys()].map(() => Array(height))
                if (name === LAYERS.MAIN) {
                    this.lightmask = [...Array(width).keys()].map(() => Array(height))
                }
                let j = 0
                for (let y = 0; y < this.height; y++) {
                    for (let x = 0; x < this.width; x++) {
                        const tile = data[j]
                        this.data[name][x][y] = tile
                        if (name === LAYERS.MAIN && y >= this.surface) {
                            this.lightmask[x][y] = tile > 0
                                ? createRectangleObject(x, y, this.spriteSize, this.spriteSize)
                                : null
                        }
                        j++
                    }
                }
            }
            else if (objects) {
                this.objects = this.objects.concat(objects)
            }
        })
    }

    getPlayer () {
        return this.objects.find(({type}) => type === ENTITIES_TYPE.PLAYER)
    }

    getObjects () {
        // todo: make it better
        const byType = (a, b) => {
            if (
                a.type === ENTITIES_TYPE.ROCK ||
                a.type === ENTITIES_TYPE.SWITCH ||
                a.type === ENTITIES_TYPE.TRIGGER
            ) return 1
            if (a.type === ENTITIES_TYPE.ITEM) return -1
            if (a.type < b.type) return -1
            if (a.type > b.type) return 1
            return 0
        }
        return this.objects.sort(byType).filter(({type}) => type !== ENTITIES_TYPE.PLAYER)
    }

    inRange (x, y) {
        return x >= 0 && y >= 0 && x < this.width && y < this.height
    }

    get (l, x, y) {
        return this.inRange(x, y) && this.data[l][x][y]
    }

    put (l, x, y, value) {
        if (!this.inRange(x, y)) return false
        this.data[l][x][y] = value
    }

    tileData (x, y) {
        const type = this.get(LAYERS.MAIN, x, y)
        return {
            type,
            x: this.spriteSize * x,
            y: this.spriteSize * y,
            width: this.spriteSize,
            height: this.spriteSize,
            solid: this.isSolid(x, y),
            jumpThrough: canJumpThrough(type)
        }
    }

    clearTile (x, y, layer) {
        if (this.inRange(x, y)) {
            this.data[layer][x][y] = null
        }
    }

    isSolid (x, y) {
        return !this.inRange(x, y) || (
            this.data[LAYERS.MAIN][x][y] > NON_COLLIDE_INDEX ||
            canJumpThrough(this.data[LAYERS.MAIN][x][y])
        )
    }

    getLightmask (x, y) {
        return this.inRange(x, y) && this.lightmask[x][y]
    }
}
