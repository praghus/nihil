import '../../lib/illuminated'
import Scene from '../scene'
import levelData from '../../../assets/levels/map.json'
import {
    ASSETS, COLORS, FONTS, INPUTS, LAYERS, LIGHTS, NON_COLLIDE_INDEX,
    SPECIAL_TILES_INDEX
} from '../../lib/constants'
import { Camera, Elements, World } from '../index'

const { DarkMask, Lighting, Vec2, RectangleObject } = window.illuminated

export default class GameScene extends Scene {
    constructor (game) {
        super(game)
        this.dynamicLights = true
        this.lightmask = []
        this.world = new World(levelData)
        this.elements = new Elements(this.world.getObjects(), this)
        this.player = this.elements.create(this.world.getPlayer())
        this.camera = new Camera(this)
        this.camera.setFollow(this.player)
        this.addLightmaskElement = this.addLightmaskElement.bind(this)
    }

    update (nextProps) {
        super.update(nextProps)
        const { delta, ticker } = this
        if (delta > ticker.interval) {
            this.elements.update()
            this.player.update()
            this.camera.update()
            this.countFPS()
        }
    }

    draw (ctx) {
        const { player, viewport, world } = this
        const { resolutionX, resolutionY, scale } = viewport
        const { renderOrder } = world
        const castingShadows = this.dynamicLights && (this.camera.underground || player.inDark > 0)

        ctx.imageSmoothingEnabled = false
        ctx.save()
        ctx.scale(scale, scale)
        ctx.clearRect(0, 0, resolutionX, resolutionY)

        this.renderStaticBackground(ctx)

        renderOrder.map((layer) => {
            if (layer === LAYERS.OBJECTS) {
                this.renderObjects(ctx)
            }
            else {
                layer === LAYERS.FOREGROUND2 && castingShadows
                    ? this.renderLightingEffect(ctx)
                    : this.renderLayer(ctx, layer)
            }
        })

        this.renderHUD(ctx)

        if (this.blackOverlay > 0) {
            ctx.globalAlpha = this.blackOverlay
            ctx.fillStyle = COLORS.BLACK
            ctx.fillRect(0, 0, resolutionX, resolutionY)
            this.blackOverlay -= 0.01
        }
        ctx.restore()
    }

    renderStaticBackground (ctx) {
        const { assets, player, viewport } = this
        const { resolutionX, resolutionY } = viewport
        const fogBorder = 600
        if (!this.camera.underground && player.inDark === 0) {
            const cameraX = this.camera.x + 3300
            ctx.fillStyle = COLORS.BLUE_SKY
            ctx.fillRect(0, 0, resolutionX, resolutionY)
            if (cameraX < 0) {
                ctx.drawImage(assets[ASSETS.MOUNTAINS], cameraX / 15, 275 + (this.camera.y / 2))
                ctx.drawImage(assets[ASSETS.FAR_FOREST], cameraX / 10, 100 + (this.camera.y / 2))
                ctx.drawImage(assets[ASSETS.FOREST], cameraX / 5, this.camera.y / 2)

                if (this.camera.y > -fogBorder) {
                    ctx.save()
                    ctx.globalAlpha = ((fogBorder + this.camera.y) / fogBorder).toFixed(2) * 2
                    ctx.fillRect(0, 0, resolutionX, resolutionY)
                    ctx.restore()
                }
            }
            else {
                ctx.drawImage(assets[ASSETS.SKY], 0, 0, resolutionX, resolutionY)
            }
        }
    }

    renderLayer (ctx, layer) {
        const { assets, viewport, world } = this
        const { resolutionX, resolutionY } = viewport
        const { spriteCols, spriteSize } = world

        const shouldCreateLightmask = this.dynamicLights && layer === LAYERS.MAIN

        let y = Math.floor(this.camera.y % spriteSize)
        let _y = Math.floor(-this.camera.y / spriteSize)

        if (shouldCreateLightmask) {
            this.lightmask = []
        }

        while (y < resolutionY) {
            let x = Math.floor(this.camera.x % spriteSize)
            let _x = Math.floor(-this.camera.x / spriteSize)
            while (x < resolutionX) {
                const tile = world.get(layer, _x, _y)
                if (tile > 0) {
                    if (shouldCreateLightmask && tile > NON_COLLIDE_INDEX && tile < SPECIAL_TILES_INDEX) {
                        this.addLightmaskElement(x, y, spriteSize, spriteSize)
                    }
                    ctx.drawImage(assets[ASSETS.TILES],
                        ((tile - 1) % spriteCols) * spriteSize,
                        (Math.ceil(tile / spriteCols) - 1) * spriteSize,
                        spriteSize, spriteSize, x, y,
                        spriteSize, spriteSize)
                }
                x += spriteSize
                _x++
            }
            y += spriteSize
            _y++
        }
    }

    renderObjects (ctx) {
        const { elements } = this
        const { objects } = elements
        // todo: render elements in order
        objects.forEach((obj) => obj.draw(ctx))
        this.player.draw(ctx)
    }

    renderLightingEffect (ctx) {
        const { elements, player, viewport } = this
        const { resolutionX, resolutionY } = viewport
        const light = elements.getLight(LIGHTS.PLAYER_LIGHT)

        light.position = new Vec2(
            player.x + (player.width / 2) + this.camera.x,
            player.y + (player.height / 2) + this.camera.y
        )

        const lighting = new Lighting({light: light, objects: this.lightmask})
        const darkmask = new DarkMask({lights: [light]})

        lighting.compute(resolutionX, resolutionY)
        darkmask.compute(resolutionX, resolutionY)

        ctx.save()
        ctx.globalCompositeOperation = 'lighter'
        lighting.render(ctx)
        ctx.globalCompositeOperation = 'source-over'
        darkmask.render(ctx)
        ctx.restore()
    }

    renderHUD (ctx) {
        const { camera, assets, debug, fps, player, viewport } = this
        const { resolutionX, resolutionY } = viewport
        const { energy, lives, items } = player
        const font = FONTS.FONT_SMALL
        const fpsIndicator = `FPS:${Math.round(fps)}`

        // FPS meter
        this.fontPrint(ctx, fpsIndicator, resolutionX - (5 + fpsIndicator.length * 5), 5, font)

        // Camera position in debug mode
        if (debug) {
            this.fontPrint(ctx, `camera\nx:${Math.floor(camera.x)}\ny:${Math.floor(camera.y)}`, 4, 32, font)
        }

        // energy
        ctx.save()
        ctx.fillStyle = COLORS.DARK_GREY
        ctx.fillRect(17, 4, 52, 5)
        ctx.fillStyle = COLORS.BLACK
        ctx.fillRect(18, 5, 50, 3)
        ctx.fillStyle = COLORS.DARK_RED
        ctx.fillRect(18, 5, energy / 2, 3)
        ctx.fillStyle = COLORS.LIGHT_RED
        ctx.fillRect(18, 6, energy / 2, 1)
        ctx.restore()

        // lives
        ctx.drawImage(assets[ASSETS.HEART], 0, 0)
        this.fontPrint(ctx, `x${lives}`, 17, 10, font)

        // items
        const align = (resolutionX - 60)
        ctx.drawImage(assets[ASSETS.FRAMES], align, resolutionY - 26)
        items.map((item, index) => {
            if (item && item.properties) {
                this.fontPrint(ctx, item.name, 4, (resolutionY - 20) + index * 9, font)
                ctx.drawImage(
                    assets[ASSETS.ITEMS],
                    item.animation.x, item.animation.y,
                    item.width, item.height,
                    align + 12 + (index * 25), resolutionY - 22,
                    item.width, item.height
                )
            }
        })
    }

    /**
     * illuminated.js
     */
    addLightmaskElement (x, y, width, height) {
        this.lightmask.push(new RectangleObject({
            topleft: new Vec2(x, y),
            bottomright: new Vec2(x + width, y + height)
        }))
    }
}
