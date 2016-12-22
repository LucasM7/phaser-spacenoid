export class OverState extends Phaser.State{
    
    logo: Phaser.Sprite;
    play: Phaser.Sprite;

    preload(){
        this.game.load.image('over','assets/game-over.jpg');
        this.game.load.image('refresh','assets/refresh.png');
    }

    create(){
        this.logo = this.game.add.sprite(this.game.world.centerX + 70,this.game.world.centerY - 80,'over');
        this.logo.scale.set(0.2,0.2);
        this.logo.anchor.set(0.5,0.5);

        this.play = this.game.add.sprite(this.game.world.centerX + 70,this.game.world.centerY + 100,'refresh');
        this.play.scale.set(0.5,0.5);
        this.play.anchor.set(0.5,0.5);
        
        this.logo.inputEnabled = true;
        this.play.inputEnabled = true;
        
        this.play.events.onInputOver.add(() => {
            this.game.add.tween(this.play.scale).to({x: 0.8, y: 0.8}, 100, Phaser.Easing.Linear.None, true);
        });
        this.play.events.onInputOut.add(() => {
            this.game.add.tween(this.play.scale).to({x: 0.5, y: 0.5}, 100, Phaser.Easing.Linear.None, true);
        });
        this.play.events.onInputDown.add(() => {
            this.game.state.start('game');    
        });

        this.logo.events.onInputOver.add(() => {
            this.game.add.tween(this.logo).to({angle: 360}, 500, Phaser.Easing.Cubic.InOut, true);
        });
        
    }
    
}