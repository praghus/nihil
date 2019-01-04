import Overlay from '../models/overlay'
import { Scene } from 'tmx-platformer-lib'
import { isMobileDevice } from '../../lib/helpers'
import { ASSETS, COLORS, INPUTS, SCENES } from '../../lib/constants'

export default class IntroScene extends Scene {
    constructor (game) {
        super(game)
        this.overlay = new Overlay(this)
        this.loaded = true
    }

    onUpdate () {
        if (this.fetchInput(INPUTS.INPUT_ACTION) || this.fetchInput(INPUTS.INPUT_UP)) {
            this.setScene(SCENES.GAME)
        }
    }

    render () {
        const { assets, ctx, overlay, viewport } = this
        const { resolutionX, resolutionY } = viewport

        ctx.fillStyle = COLORS.BLUE_SKY
        ctx.fillRect(0, 0, resolutionX, resolutionY)
        ctx.drawImage(assets['bg6'], 0, 0)
        ctx.drawImage(assets[ASSETS.MOUNTAINS], -495, -30)
        ctx.drawImage(assets[ASSETS.LOGO], Math.ceil(resolutionX / 2) - 66, Math.ceil(resolutionY / 2) - 45)

        overlay.displayText(isMobileDevice()
            ? '    TAP TO BEGIN    '
            : 'PRESS SPACE TO BEGIN',
        Math.ceil(resolutionX / 2) - 50, resolutionY - 10)
    }
}
