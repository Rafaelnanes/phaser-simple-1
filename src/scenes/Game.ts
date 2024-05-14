import Phaser from "phaser";
import TextureKeys from "~/consts/TextureKeys";
import SceneKeys from "~/consts/SceneKeys";
import AnimationKeys from "~/consts/AnimationKeys";
import RocketMouse from "~/game/RocketMouse";

export default class Game extends Phaser.Scene {

    // create the background class property
    private background!: Phaser.GameObjects.TileSprite;
    private mouseHole!: Phaser.GameObjects.Image;
    private window1!: Phaser.GameObjects.Image;
    private window2!: Phaser.GameObjects.Image;

    constructor() {
        super(SceneKeys.Game);
    }

    preload() {

    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;

        this.background = this.add.tileSprite(0, 0, width, height, TextureKeys.Background)
            .setOrigin(0)
            .setScrollFactor(0, 0)

        this.mouseHole = this.add.image(
            Phaser.Math.Between(900, 1500),
            501,
            TextureKeys.MouseHole
        );

        this.window1 = this.add.image(
            Phaser.Math.Between(900, 1300),
            200,
            TextureKeys.Window1
        )

        this.window2 = this.add.image(
            Phaser.Math.Between(1600, 2000),
            200,
            TextureKeys.Window2
        )

        const mouseActor = this.createMouseActor(width, height);
        this.addWorldPhysics(height);
        this.followCamera(mouseActor, height);

    }


    update(t: number, dt: number) {
        // scroll the background
        this.background.setTilePosition(this.cameras.main.scrollX)
        this.wrapMouseHole();
        this.wrapWindows();
    }

    private addWorldPhysics(height: number) {
        this.physics.world.setBounds(
            0, 0, // x, y
            Number.MAX_SAFE_INTEGER, height - 30
        );
    }

    private followCamera(mouseActor: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody, height: number) {
        this.cameras.main.startFollow(mouseActor);
        this.cameras.main.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height);
    }

    private createMouseActor(width: number, height: number) {
        const mouseActor = new RocketMouse(this, width * 0.5, height - 30);
        this.add.existing(mouseActor);

        const body = mouseActor.body as Phaser.Physics.Arcade.Body;
        body.setCollideWorldBounds(true);
        body.setVelocityX(200);

        return mouseActor;
    }

    private wrapMouseHole() {
        const scrollX = this.cameras.main.scrollX
        const rightEdge = scrollX + this.scale.width

        if (this.mouseHole.x + this.mouseHole.width < scrollX) {
            this.mouseHole.x = Phaser.Math.Between(
                rightEdge + 100,
                rightEdge + 1000
            )
        }
    }

    private wrapWindows() {
        const scrollX = this.cameras.main.scrollX
        const rightEdge = scrollX + this.scale.width
        // multiply by 2 to add some more padding
        let width = this.window1.width * 2
        if (this.window1.x + width < scrollX) {
            this.window1.x = Phaser.Math.Between(
                rightEdge + width,
                rightEdge + width + 800
            )
        }

        width = this.window2.width
        if (this.window2.x + width < scrollX) {
            this.window2.x = Phaser.Math.Between(
                this.window1.x + width,
                this.window1.x + width + 800)
        }
    }

}