import Phaser from 'phaser';
import ScrollingBackground from './Entities/ScrollingBackground';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super({ key: 'Title' });
  }

  create() {
    this.title = this.add.text(
      this.game.config.width * 0.5,
      270,
      'SPACE EAGLES',
      {
        fontFamily: 'monospace',
        fontSize: 48,
        fontStyle: 'bold',
        color: '#ffffff',
        align: 'center',
      },
    );
    this.title.setOrigin(0.5);
    this.sfx = {
      btnOver: this.sound.add('sndBtnOver'),
      btnDown: this.sound.add('sndBtnDown'),
    };
    this.btnPlay = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.45,
      'sprBtnPlay',
    );
    this.btnPlay.setInteractive();
    this.btnPlay.on(
      'pointerover',
      () => {
        this.btnPlay.setTexture('sprBtnPlayHover');
        this.sfx.btnOver.play();
      },
      this,
    );
    this.btnPlay.on('pointerout', () => {
      this.btnPlay.setTexture('sprBtnPlay');
    });
    this.btnPlay.on(
      'pointerdown',
      () => {
        this.btnPlay.setTexture('sprBtnPlayDown');
        this.sfx.btnDown.play();
      },
      this,
    );
    this.btnPlay.on(
      'pointerup',
      () => {
        this.btnPlay.setTexture('sprBtnPlay');
        this.scene.start('Game');
      },
      this,
    );

    this.btnLeaderboard = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'sprBtnLeaderboard',
    );
    this.btnLeaderboard.setInteractive();

    this.btnLeaderboard.on('pointerover', () => {
      this.btnLeaderboard.setTexture(
        'sprBtnLeaderboardHover',
      );
      this.sfx.btnOver.play();
    });

    this.btnLeaderboard.on('pointerout', () => {
      this.btnLeaderboard.setTexture('sprBtnLeaderboard');
    });

    this.btnLeaderboard.on('pointerdown', () => {
      this.btnLeaderboard.setTexture(
        'sprBtnLeaderboardDown',
      );
      this.sfx.btnDown.play();
    });

    this.btnLeaderboard.on('pointerup', () => {
      this.scene.start('Leaderboard');
    });

    this.backgrounds = [];
    for (let i = 0; i < 5; i += 1) {
      const keys = ['sprBg0', 'sprBg1'];
      const key = keys[Phaser.Math.Between(0, keys.length - 1)];
      const bg = new ScrollingBackground(this, key, i * 10);
      this.backgrounds.push(bg);
    }
    const bg = this.add.sprite(0, 0, 'sprBg2');
    bg.setDepth(-10);
  }

  update() {
    for (let i = 0; i < this.backgrounds.length; i += 1) {
      this.backgrounds[i].update();
    }
  }
}
