export class GameState extends Phaser.State {
  
  speedBall: number = 200;
  speedBlock: number = 300;
  map: Phaser.Tilemap;
  layer: Phaser.TilemapLayer;
  bar: Phaser.Sprite;
  ball: Phaser.Sprite;
  cursors: Phaser.CursorKeys;
  isRun: boolean;
  blocks: Phaser.Group;
  block: Phaser.Sprite;
  score: number = 0;
  life: Phaser.Group;
  
  isCollided(speed: number){
   
      if(this.ball.position.x + this.ball.width >= 448)
        this.ball.body.velocity.x = -speed;

      if(this.ball.position.y <= 32)
        this.ball.body.velocity.y = speed; 

      if(this.ball.position.x <= 32)
        this.ball.body.velocity.x = speed;
      
      
      if(this.ball.position.y > 545){
        this.ball.destroy();
        this.game.state.start('game-over');
      }
  }

  createBlocks(blocks: Phaser.Group){
    for(let x=42;x<=428;x+=40){
      for(let y=42;y<=256;y+=20){
        console.log(x + "-" + y);
        let b = this.game.add.sprite(x,y,'blocos',Math.floor(Math.random() * 4), blocks);
        this.game.physics.arcade.enableBody(b);
      }
    }
  }

  createLifes(lifes: Phaser.Group){
    for(let x=500; x<=640; x+=70){
      if(x!= 640){
        let b = this.game.add.sprite(x,200,'barra');
        b.scale.set(0.4,0.4);
        lifes.add(b);
      }else{
        let b = this.game.add.sprite(535,220,'barra');
        b.scale.set(0.4,0.4);
        lifes.add(b);
      }
    }
  }
  
  preload() {
    this.game.load.image('logo', 'assets/phaser2.png');
    this.game.load.tilemap('mapa','assets/mapa.json',null,Phaser.Tilemap.TILED_JSON);
    this.game.load.image('tile1','assets/Terrenos.png');
    this.game.load.image('tile2','assets/fundo.png');
    this.game.load.spritesheet('barra','assets/barra.png',150,30);
    this.game.load.spritesheet('bola','assets/bola.png',15,15);
    this.game.load.spritesheet('blocos','assets/blocos.png',40,20);
  }

  create() {
    this.map = this.game.add.tilemap('mapa');
    
    //adicionando os tilesets utilizados para formar o mapa
    this.map.addTilesetImage('Terrenos','tile1');
    this.map.addTilesetImage('fundo','tile2');
    this.map.setCollision(12);

    this.layer = this.map.createLayer('Camada de Tiles 1');
    this.layer.resizeWorld();

    this.bar = this.game.add.sprite(220 - 27, this.game.world.height - 20,'barra');
    this.bar.scale.set(0.6,0.6);

    this.ball = this.game.add.sprite(230, this.game.world.height - 35,'bola');

    this.blocks = this.game.add.group();
    this.createBlocks(this.blocks);  
    
    this.life = this.game.add.group();
    this.createLifes(this.life);

    this.cursors = this.game.input.keyboard.createCursorKeys();
  
    this.game.physics.arcade.enableBody(this.bar);
    this.game.physics.arcade.enableBody(this.ball);
    
    this.bar.body.immovable = true;
    
    let style = { font: 'bold 28px Arial', fill: '#fff', boundsAlignH: 'center', boundsAlignV: 'middle' };
    let text = this.game.add.text(15, 8, 'Score', style);
    text.setTextBounds(510, 10, 15, 8);
}

  update(){
    
    this.bar.body.velocity.set(0,0);
 
    
    if(this.cursors.left.isDown){
      this.bar.body.velocity.x = -this.speedBlock;
    }

    if(this.cursors.right.isDown){
      this.bar.body.velocity.x = this.speedBlock;
    }
    
    
    if(this.input.keyboard.isDown(Phaser.KeyCode.SPACEBAR)){
      this.ball.body.velocity.x = this.speedBall;
      this.ball.body.velocity.y = -this.speedBall;
      this.isRun = true;
    }
    
    if(this.isRun){
      this.isCollided(this.speedBall);
      
      this.game.physics.arcade.collide(this.bar,this.layer);
      this.game.physics.arcade.collide(this.bar,this.ball, (bar, ball) => {
          ball.body.velocity.y = -this.speedBall;
      });
      
      this.game.physics.arcade.collide(this.ball, this.blocks, (ball, block) => {
          ball.body.velocity.y = this.speedBall;
          block.destroy();
          this.speedBall += 2;

      });
    
    }
  }

  reset(){
    this.game.debug.inputInfo(500,300);
    
  }
  
}