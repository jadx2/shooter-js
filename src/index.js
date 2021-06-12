import Phaser from 'phaser';
import BootScene from './Scenes/BootScene';
import PreloaderScene from './Scenes/PreloaderScene';
import TitleScene from './Scenes/TitleScene';
import GameScene from './Scenes/GameScene';
import './assets/styles/styles.css';

const config = {
  type: Phaser.WEBGL,
  width: 600,
  height: 800,
  backgroundColor: 'black',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
    },
  },
  scene: [BootScene, PreloaderScene, TitleScene, GameScene],
  pixelArt: true,
  roundPixels: true,
};

window.game = new Phaser.Game(config);
