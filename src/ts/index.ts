import {GameState} from './game';
import {MenuState} from './menu';
import {OverState} from './game-over';

class SimpleGame extends Phaser.State{

  constructor() {
    super();
    let config: Phaser.IGameConfig = {
      width: 650,
      height: 545,
      renderer: Phaser.AUTO,
      parent: '',
      state: this,
      forceSetTimeOut: false
    };
    this.game = new Phaser.Game(config);
  }

  preload() {
    this.game.state.add('game', GameState);
    this.game.state.add('menu', MenuState);
    this.game.state.add('game-over', OverState);
  }

  create() {
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.pageAlignVertically = true;
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.refresh();
    this.game.state.start('menu');
  }
}
let game = new SimpleGame();