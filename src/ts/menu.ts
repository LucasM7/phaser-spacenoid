export class MenuState extends Phaser.State{
    preload(){
        this.game.load.image('logo','assets/menu.png');
        this.game.load.image('play','assets/play.png');
    }

    create(){
        let logo = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,'logo');
        logo.scale.set(0.5,0.5);
        logo.anchor.set(0.5,0.5);

        let play = this.game.add.sprite(this.game.world.centerX + 10,this.game.world.centerY + 125,'play');
        play.scale.set(0.5,0.5);
        play.anchor.set(0.5,0.5);
        play.inputEnabled = true;
        
        play.events.onInputOver.add(() => {
            this.game.add.tween(play.scale).to({x: 0.8, y: 0.8}, 100, Phaser.Easing.Linear.None, true);
        });
        play.events.onInputOut.add(() => {
            this.game.add.tween(play.scale).to({x: 0.5, y: 0.5}, 100, Phaser.Easing.Linear.None, true);
        });
        play.events.onInputDown.add(() => {
            this.game.state.start('game');    
        });
    }
}