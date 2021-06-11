import Phaser from 'phaser';
import './assets/styles/styles.css';

const config = {
  type: Phaser.WEBGL,
  width: 480,
  height: 640,
  backgroundColor: 'black',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
    },
  },
  scene: [],
  pixelArt: true,
  roundPixels: true,
};

// eslint-disable-next-line no-unused-vars
const game = new Phaser.Game(config);
