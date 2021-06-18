import Phaser from 'phaser';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super({ key: 'Preloader' });
  }

  preload() {
    const { width, height } = this.game.config;

    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(140, 270, 320, 50);

    const loadingText = this.make.text({
      x: width * 0.5,
      y: height * 0.5 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#fff',
      },
    });
    loadingText.setOrigin(0.5);

    const percentText = this.make.text({
      x: width * 0.5,
      y: height * 0.5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(0.5);

    this.load.on('progress', (value) => {
      percentText.setText(`${parseInt(value * 100, 10)} %`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(150, 280, 300 * value, 30);
    });

    this.load.on('complete', () => {
      this.ready();
    });

    this.timedEvent = this.time.delayedCall(
      3000,
      this.ready,
      [],
      this,
    );

    // Load Assets
    this.load.image('sprBg0', './img/sprBg0.png');
    this.load.image('sprBg1', './img/sprBg1.png');
    this.load.image('sprBg2', './img/sprBg2.png');
    this.load.image('sprBtnPlay', './img/sprBtnPlay.png');
    this.load.image(
      'sprBtnPlayHover',
      './img/sprBtnPlayHover.png',
    );
    this.load.image(
      'sprBtnPlayDown',
      './img/sprBtnPlayDown.png',
    );
    this.load.image(
      'sprBtnLeaderboard',
      './img/sprBtnLeaderboard.png',
    );
    this.load.image('sprBtnSave', './img/sprBtnSave.png');
    this.load.image(
      'sprBtnSaveHover',
      './img/sprBtnSaveHover.png',
    );
    this.load.image(
      'sprBtnSaveDown',
      './img/sprBtnSaveDown.png',
    );
    this.load.image(
      'sprBtnLeaderboardHover',
      './img/sprBtnLeaderboardHover.png',
    );
    this.load.image(
      'sprBtnLeaderboardDown',
      './img/sprBtnLeaderboardDown.png',
    );
    this.load.image(
      'sprBtnRestart',
      './img/sprBtnRestart.png',
    );
    this.load.image(
      'sprBtnRestartHover',
      './img/sprBtnRestartHover.png',
    );
    this.load.image(
      'sprBtnRestartDown',
      './img/sprBtnRestartDown.png',
    );
    this.load.image('sprBtnMenu', './img/sprBtnMenu.png');
    this.load.image(
      'sprBtnMenuHover',
      './img/sprBtnMenuHover.png',
    );
    this.load.image(
      'sprBtnMenuDown',
      './img/sprBtnMenuDown.png',
    );

    this.load.audio(
      'sndBtnOver',
      './sounds/sndBtnOver.wav',
    );
    this.load.audio(
      'sndBtnDown',
      './sounds/sndBtnDown.wav',
    );
    this.load.spritesheet(
      'sprExplosion',
      './img/sprExplosion.png',
      {
        frameWidth: 180,
        frameHeight: 180,
      },
    );
    this.load.spritesheet(
      'sprEnemy0',
      './img/sprEnemy0.png',
      {
        frameWidth: 32,
        frameHeight: 32,
      },
    );
    this.load.image('sprEnemy1', './img/sprEnemy1.png');
    this.load.spritesheet(
      'sprEnemy2',
      './img/sprEnemy2.png',
      {
        frameWidth: 32,
        frameHeight: 32,
      },
    );
    this.load.image(
      'sprLaserEnemy0',
      './img/sprLaserEnemy0.png',
    );
    this.load.image(
      'sprLaserPlayer',
      './img/sprLaserPlayer.png',
    );
    this.load.spritesheet(
      'sprPlayer',
      './img/sprPlayer.png',
      {
        frameWidth: 32,
        frameHeight: 32,
      },
    );
    this.load.audio(
      'sndExplode0',
      './sounds/sndExplode0.wav',
    );
    this.load.audio(
      'sndExplode1',
      './sounds/sndExplode1.wav',
    );
    this.load.audio('sndLaser', './sounds/sndLaser.wav');
  }

  init() {
    this.readyCount = 0;
  }

  ready() {
    this.readyCount += 1;
    if (this.readyCount === 2) {
      this.scene.start('Title');
    }
  }
}
