import Phaser from "phaser";

export default class Game extends Phaser.Scene {

    static readonly BACKGROUND = "background";
    static readonly ROCKET_MOUSE_ANIM_KEY = "rocket-mouse";
    static readonly ROCKET_MOUSE_RUN_ANIM_KEY = "rocket-mouse-run";

    constructor() {
        super("game");
    }

    preload() {
        this.load.image(Game.BACKGROUND, "house/background/bg_repeat_340x640.png")
        this.load.atlas(
            Game.ROCKET_MOUSE_ANIM_KEY,
            "characters/rocket-mouse.png",
            "characters/rocket-mouse.json")
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;

        this.add.tileSprite(0, 0, width, height, Game.BACKGROUND)
            .setOrigin(0);

        this.anims.create({
            key: Game.ROCKET_MOUSE_RUN_ANIM_KEY, // name of this animation
            // helper to generate frames
            frames: this.anims.generateFrameNames(Game.ROCKET_MOUSE_ANIM_KEY, {
                start: 1,
                end: 4,
                prefix: 'rocketmouse_run',//json files lines
                zeroPad: 2,
                suffix: '.png'
            }),
            frameRate: 10,
            repeat: -1 // -1 to loop forever
        })


        this.add.sprite(
            width * 0.5,
            height * 0.5,
            Game.ROCKET_MOUSE_ANIM_KEY,
            "rocketmouse_fly01.png"
        ).play(Game.ROCKET_MOUSE_RUN_ANIM_KEY)


    }

}