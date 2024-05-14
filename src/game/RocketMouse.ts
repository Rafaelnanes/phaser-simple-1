import AnimationKeys from "~/consts/AnimationKeys"
import TextureKeys from "~/consts/TextureKeys"

export default class RocketMouse extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)

        // create the Rocket Mouse sprite
        const mouse = scene.add.sprite(0, 0, TextureKeys.RocketMouse)
            .setOrigin(0.5, 1)
            .play(AnimationKeys.RocketMouseRun)

        // add as child of
        this.add(mouse)

        // add a physics body
        scene.physics.add.existing(this)

        // adjust physics body size and offset
        const body = this.body as Phaser.Physics.Arcade.Body
        body.setSize(mouse.width, mouse.height)
        body.setOffset(mouse.width * -0.5, -mouse.height)
    }

}