import { GameEntity } from '../models'

export default class Camera extends GameEntity {
    constructor (obj, scene) {
        super(obj, scene)
        this.solid = false
    }

    update () {
        const { follow } = this.scene.camera
        const followMidX = follow.x + follow.width / 2
        const followMidY = follow.y + follow.height / 2
        if (
            followMidX > this.x &&
            followMidX < this.x + this.width &&
            followMidY > this.y &&
            followMidY < this.y + this.height
        ) {
            this.setCameraViewport()
        }
    }

    setCameraViewport () {
        const { id, x, y, width, height } = this
        if (this.scene.getProperty('currentCameraId') !== id) {
            this.scene.camera.setBounds(x, y, width, height)
            this.scene.setProperty('currentCameraId', id)
        }
    }
}
