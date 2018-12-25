import ActiveElement from '../models/active-element'
import { clearInRange } from '../../lib/helpers'
import { ENTITIES_TYPE } from '../../lib/entities'
import { INPUTS, LAYERS } from '../../lib/constants'

export default class Trigger extends ActiveElement {
    constructor (obj, scene) {
        super(obj, scene)
        this.solid = false
        this.visible = false
    }

    collide (element) {
        const { camera, elements, input, player, overlay, world } = this._scene
        const activator = this.getProperty('activator')
        const follow = this.getProperty('follow')
        const hint = this.getProperty('hint')
        const offsetX = this.getProperty('offsetX')
        const offsetY = this.getProperty('offsetY')
        const related = this.getProperty('related')
        const anchor_hint = this.getProperty('anchor_hint')

        const triggered = !this.activated && (input[INPUTS.INPUT_ACTION] || activator === ENTITIES_TYPE.PLAYER)
        if (element.type === ENTITIES_TYPE.PLAYER && !this.dead) {
            if (triggered) {
                if (player.canUse(activator)) {
                    const item = player.useItem(activator)
                    this.activated = true
                    this.hideMessage()
                    player.hideHint()
                    if (related) {
                        const rel = elements.getById(related)
                        if (follow) {
                            camera.setFollow(rel)
                            this._scene.startTimeout({
                                name: 'wait_for_camera',
                                duration: 300
                            }, () => {
                                rel.activated = true
                                rel.trigger = this
                                rel.activator = item
                                this._scene.startTimeout({
                                    name: 'wait_for_player',
                                    duration: 500
                                }, () => {
                                    overlay.fadeIn()
                                    camera.setFollow(player)
                                })
                            })
                        }
                        else {
                            rel.activated = true
                            rel.trigger = this
                            rel.activator = item
                        }
                    }
                }
                else {
                    const item = elements.getByProperties('id', activator)
                    if (item) {
                        anchor_hint
                            ? this.showHint(item)
                            : player.showHint(item)
                    }
                    this.hideMessage()
                }
            }
            else if (hint && !player.hintTimeout) {
                const [x, y] = [
                    offsetX ? this.x + parseFloat(offsetX) * world.spriteSize : this.x,
                    offsetY ? this.y + parseFloat(offsetY) * world.spriteSize : this.y
                ]
                this.showMessage(hint, x, y)
            }
        }
    }

    update () {
        if (this.activated) {
            const { camera, elements, overlay, world } = this._scene
            const clear = this.getProperty('clear')
            const fade = this.getProperty('fade')
            const modify = this.getProperty('modify')
            const produce = this.getProperty('produce')
            const produce_name = this.getProperty('produce_name')
            const shake = this.getProperty('shake')

            if (produce) {
                this.addItem(produce, produce_name, this.x + 16, this.y)
            }
            if (modify) {
                const matrix = JSON.parse(modify)
                if (matrix.length) {
                    matrix.map(
                        ([x, y, id]) => world.put(LAYERS.MAIN, x, y, id)
                    )
                }
            }
            if (clear) {
                clearInRange(elements, this)
                this.clearTiles(clear)
            }
            shake && camera.shake()
            fade && overlay.fadeIn()
            this.dead = true
        }
    }

    clearTiles (layer) {
        const { world } = this._scene
        const { spriteSize } = world
        for (let x = 0; x < Math.round(this.width / spriteSize); x++) {
            for (let y = 0; y < Math.round(this.height / spriteSize); y++) {
                world.clearTile(
                    Math.round((this.x + (x * spriteSize)) / spriteSize),
                    Math.round((this.y + (y * spriteSize)) / spriteSize),
                    layer
                )
            }
        }
    }
}