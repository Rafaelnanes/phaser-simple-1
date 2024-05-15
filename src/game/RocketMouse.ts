import AnimationKeys from "~/consts/AnimationKeys"
import TextureKeys from "~/consts/TextureKeys"

export default class RocketMouse extends Phaser.GameObjects.Container {

    private flames: Phaser.GameObjects.Sprite;
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)
        // get a CursorKeys instance
        this.cursors = scene.input.keyboard.createCursorKeys()

        // create the Rocket Mouse sprite
        const mouse = scene.add.sprite(0, 0, TextureKeys.RocketMouse)
            .setOrigin(0.5, 1)
            .play(AnimationKeys.RocketMouseRun)

        // create the flames and play the animation
        this.flames = scene.add.sprite(-63, -15, TextureKeys.RocketMouse)
            .play(AnimationKeys.RocketFlamesOn)
        this.enableJetpack(false);

        // add as child of
        this.add(this.flames)
        this.add(mouse)

        // add a physics body
        scene.physics.add.existing(this)

        // adjust physics body size and offset
        const body = this.body as Phaser.Physics.Arcade.Body
        body.setSize(mouse.width, mouse.height)
        body.setOffset(mouse.width * -0.5, -mouse.height)
    }

    preUpdate(): void {

        const body = this.body as Phaser.Physics.Arcade.Body
        // check is Space bar is down
        if (this.cursors.space?.isDown) {
            // set y acceleration to -600 if so
            body.setAccelerationY(-600)
            this.enableJetpack(true)
        }
        else {
            // turn off acceleration otherwise
            body.setAccelerationY(0)
            this.enableJetpack(false)
        }
    }

    private enableJetpack(enabled: boolean) {
        this.flames.setVisible(enabled);
    }

}