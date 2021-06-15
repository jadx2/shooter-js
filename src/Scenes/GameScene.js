import Phaser from 'phaser';
import Player from './Entities/Player';
import GunShip from './Entities/GunShip';
import ChaserShip from './Entities/ChaserShip';
import CarrierShip from './Entities/CarrierShip';
import ScrollingBackground from './Entities/ScrollingBackground';

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
      frameRate: 20,
      repeat: -1,
    });
    this.anims.create({
      key: 'sprEnemy0',
      frames: this.anims.generateFrameNumbers('sprEnemy0'),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'sprEnemy2',
      frames: this.anims.generateFrameNumbers('sprEnemy2'),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'sprExplosion',
      frames: this.anims.generateFrameNumbers(
        'sprExplosion',
      ),
      frameRate: 11,
      repeat: 0,
    });
    this.sfx = {
      explosions: [
        this.sound.add('sndExplode0'),
        this.sound.add('sndExplode1'),
      ],
      laser: this.sound.add('sndLaser'),
    };
    this.backgrounds = [];
    for (let i = 0; i < 5; i += 1) {
      const bg = new ScrollingBackground(
        this,
        'sprBg0',
        i * 9,
      );
      this.backgrounds.push(bg);
    }
    const bg = this.add.sprite(0, 0, 'sprBg2');
    bg.setDepth(-10);

    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'sprPlayer',
    );
    this.player.setScale(1.3);
    this.enemies = this.add.group();
    this.enemyLasers = this.add.group();
    this.playerLasers = this.add.group();
    this.time.addEvent({
      delay: 1000,
      callback() {
        let enemy = null;

        if (Phaser.Math.Between(0, 10) >= 3) {
          enemy = new GunShip(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0,
          );
          enemy.setScale(1.3);
        } else if (Phaser.Math.Between(0, 10) >= 5) {
          if (
            this.getEnemiesByType('ChaserShip').length < 5
          ) {
            enemy = new ChaserShip(
              this,
              Phaser.Math.Between(
                0,
                this.game.config.width,
              ),
              0,
            );
          }
        } else {
          enemy = new CarrierShip(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0,
          );
          enemy.setScale(2);
        }

        if (enemy !== null) {
          this.enemies.add(enemy);
        }
      },
      callbackScope: this,
      loop: true,
    });
    this.physics.add.collider(
      this.playerLasers,
      this.enemies,
      (playerLaser, enemy) => {
        if (enemy) {
          if (enemy.onDestroy !== undefined) {
            enemy.onDestroy();
          }

          enemy.explode(true);
          playerLaser.destroy();
        }
      },
    );
    this.physics.add.overlap(
      this.player,
      this.enemies,
      (player, enemy) => {
        if (
          !player.getData('isDead')
          && !enemy.getData('isDead')
        ) {
          player.explode(false);
          player.onDestroy();
          enemy.explode(true);
        }
      },
    );
    this.physics.add.overlap(
      this.player,
      this.enemyLasers,
      (player, laser) => {
        if (
          !player.getData('isDead')
          && !laser.getData('isDead')
        ) {
          player.explode(false);
          player.onDestroy();
          laser.destroy();
        }
      },
    );
  }

  getEnemiesByType(type) {
    const arr = [];
    for (
      let i = 0;
      i < this.enemies.getChildren().length;
      i += 1
    ) {
      const enemy = this.enemies.getChildren()[i];
      if (enemy.getData('type') === type) {
        arr.push(enemy);
      }
    }
    return arr;
  }

  update() {
    for (let i = 0; i < this.backgrounds.length; i += 1) {
      this.backgrounds[i].update();
    }

    if (!this.player.getData('isDead')) {
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

      if (this.keySpace.isDown) {
        this.player.setData('isShooting', true);
      } else {
        this.player.setData(
          'timerShootTick',
          this.player.getData('timerShootDelay') - 1,
        );
        this.player.setData('isShooting', false);
      }
    }

    for (
      let i = 0;
      i < this.enemies.getChildren().length;
      i += 1
    ) {
      const enemy = this.enemies.getChildren()[i];
      enemy.update();
      if (
        enemy.x < -enemy.displayWidth
        || enemy.x
          > this.game.config.width + enemy.displayWidth
        || enemy.y < -enemy.displayHeight * 4
        || enemy.y
          > this.game.config.height + enemy.displayHeight
      ) {
        if (enemy) {
          if (enemy.onDestroy !== undefined) {
            enemy.onDestroy();
          }
          enemy.destroy();
        }
      }
    }
    for (
      let i = 0;
      i < this.enemyLasers.getChildren().length;
      i += 1
    ) {
      const laser = this.enemyLasers.getChildren()[i];
      laser.update();

      if (
        laser.x < -laser.displayWidth
        || laser.x
          > this.game.config.width + laser.displayWidth
        || laser.y < -laser.displayHeight * 4
        || laser.y
          > this.game.config.height + laser.displayHeight
      ) {
        if (laser) {
          laser.destroy();
        }
      }
    }

    for (
      let i = 0;
      i < this.playerLasers.getChildren().length;
      i += 1
    ) {
      const laser = this.playerLasers.getChildren()[i];
      laser.update();

      if (
        laser.x < -laser.displayWidth
        || laser.x
          > this.game.config.width + laser.displayWidth
        || laser.y < -laser.displayHeight * 4
        || laser.y
          > this.game.config.height + laser.displayHeight
      ) {
        if (laser) {
          laser.destroy();
        }
      }
    }
  }
}
