import Phaser from 'phaser';
import Player from './Entities/Player';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'Game' });
  }

  create() {
    this.keyUp = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.UP,
    );
    this.keyDown = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.DOWN,
    );
    this.keyLeft = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.LEFT,
    );
    this.keyRight = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.RIGHT,
    );
    this.keySpace = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE,
    );
    this.anims.create({
      key: 'sprPlayer',
      frames: this.anims.generateFrameNumbers('sprPlayer'),
      frameRate: 16,
      repeat: -1,
    });
    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'sprPlayer',
    );
  }

  update() {
    this.player.update();

    if (this.keyUp.isDown) {
      this.player.moveUp();
    } else if (this.keyDown.isDown) {
      this.player.moveDown();
    }

    if (this.keyLeft.isDown) {
      this.player.moveLeft();
    } else if (this.keyRight.isDown) {
      this.player.moveRight();
    }
  }
}
