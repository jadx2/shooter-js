import Phaser from 'phaser';
import BootScene from './Scenes/BootScene';
import PreloaderScene from './Scenes/PreloaderScene';
import TitleScene from './Scenes/TitleScene';
import GameScene from './Scenes/GameScene';
import GameOverScene from './Scenes/GameOverScene';
import LeaderboardScene from './Scenes/LeaderboardScene';
import './assets/styles/styles.css';

const config = {
  type: Phaser.WEBGL,
  width: 600,
  height: 800,
  parent: 'divId',
  dom: {
    createContainer: true,
  },
  backgroundColor: 'black',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
    },
  },
  scene: [
    BootScene,
    PreloaderScene,
    TitleScene,
    LeaderboardScene,
    GameScene,
    GameOverScene,
  ],
  pixelArt: true,
  roundPixels: true,
};

window.game = new Phaser.Game(config);
