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
      y: height * 0.5 + 15,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(0.5);

    const assetText = this.make.text({
      x: width * 0.5,
      y: height * 0.5 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    assetText.setOrigin(0.5);

    this.load.on('progress', (value) => {
      percentText.setText(`${parseInt(value * 100, 10)} %`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(150, 280, 300 * value, 30);
    });

    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
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
    this.load.spritesheet(
      'sprPlayer',
      './img/sprPlayer.png',
      {
        frameWidth: 16,
        frameHeight: 16,
      },
    );
  }

  init() {
    this.readyCount = 0;
  }

  ready() {
    this.readyCount += 1;
    if (this.readyCount === 2) {
      this.scene.start('Game');
    }
  }
}
