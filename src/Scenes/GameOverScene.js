import Phaser from 'phaser';
import ScrollingBackground from './Entities/ScrollingBackground';
import setScore from './api/setScore';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOver' });
  }

  init(data) {
    this.score = data.score;
  }

  create() {
    this.add.text(16, 16, `Score: ${this.score}`, {
      fontSize: '24px',
      fill: '#fff',
    });
    this.title = this.add.text(
      this.game.config.width * 0.5,
      270,
      'GAME OVER',
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
    const input = document.createElement('input');
    input.id = 'input';
    input.type = 'text';
    input.autocomplete = 'off';
    input.placeholder = 'Enter your name';
    this.add.dom(
      this.game.config.width * 0.5,
      this.game.config.height * 0.4,
      input,
    );

    this.btnSaveScore = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.45,
      'sprBtnSave',
    );
    this.btnSaveScore.setInteractive();

    this.btnSaveScore.on(
      'pointerover',
      () => {
        this.btnSaveScore.setTexture('sprBtnSaveHover');
        this.sfx.btnOver.play();
      },
      this,
    );

    this.btnSaveScore.on('pointerout', () => {
      this.btnSaveScore.setTexture('sprBtnSave');
    });
    this.btnSaveScore.on(
      'pointerdown',
      () => {
        this.btnSaveScore.setTexture('sprBtnSaveDown');
        this.sfx.btnDown.play();
      },
      this,
    );
    this.btnSaveScore.on('pointerup', () => {
      this.btnSaveScore.setTexture('sprBtnSave');
      const player = document.querySelector('#input');
      setScore(player.value, this.score).then(
        this.scene.start('Title'),
      );
    });

    this.btnRestart = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'sprBtnRestart',
    );

    this.btnRestart.setInteractive();

    this.btnRestart.on(
      'pointerover',
      () => {
        this.btnRestart.setTexture('sprBtnRestartHover');
        this.sfx.btnOver.play();
      },
      this,
    );

    this.btnRestart.on('pointerout', () => {
      this.btnRestart.setTexture('sprBtnRestart');
    });

    this.btnRestart.on(
      'pointerdown',
      () => {
        this.btnRestart.setTexture('sprBtnRestartDown');
        this.sfx.btnDown.play();
      },
      this,
    );

    this.btnRestart.on(
      'pointerup',
      () => {
        this.btnRestart.setTexture('sprBtnRestart');
        this.scene.start('Game');
      },
      this,
    );

    this.btnLeaderboard = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.55,
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

    // this.btnLeaderboard.on('pointerup', () => {
    //   this.scene.start('SceneLeaderboard');
    // });
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
