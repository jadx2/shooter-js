import Phaser from 'phaser';
import ScrollingBackground from './Entities/ScrollingBackground';
import getScore from './api/getScore';

export default class LeaderboardScene extends Phaser.Scene {
  constructor() {
    super({ key: 'Leaderboard' });
  }

  create() {
    this.title = this.add.text(
      this.game.config.width * 0.5,
      270,
      'LEADERBOARD',
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

    getScore()
      .then((data) => {
        const entry = data.result.sort(
          (a, b) => b.score - a.score,
        );
        let value = 350;
        for (let i = 0; i < 6; i += 1) {
          this.add.text(
            this.game.config.width * 0.36,
            value,
            `${i + 1}. ${entry[
              i
            ].user.toUpperCase()}..............${
              entry[i].score
            }`,
            {
              fontFamily: 'monospace',
              fontSize: 20,
              fontStyle: 'bold',
              color: '#ffffff',
              align: 'center',
            },
          );
          value += 40;
        }
      })
      .catch((err) => err);

    this.btnMenu = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.8,
      'sprBtnMenu',
    );
    this.btnMenu.setInteractive();

    this.btnMenu.on('pointerover', () => {
      this.btnMenu.setTexture('sprBtnMenuHover');
      this.sfx.btnOver.play();
    });

    this.btnMenu.on('pointerout', () => {
      this.btnMenu.setTexture('sprBtnMenu');
    });

    this.btnMenu.on('pointerdown', () => {
      this.btnMenu.setTexture('sprBtnMenuDown');
      this.sfx.btnDown.play();
    });

    this.btnMenu.on('pointerup', () => {
      this.btnMenu.setTexture('sprBtnMenu');
      this.scene.start('Title');
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
