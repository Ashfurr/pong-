

class Tableau1 extends Phaser.Scene {


    preload() {
        this.load.image('square', 'asset/carre.png')
        this.load.image('square2', 'asset/carre2.png')
        this.load.image('circle', 'asset/cercle.png')
        this.load.image('white', 'asset/white.png')
        this.load.image('effect', 'asset/effect.png')
        this.load.audio('music', ['asset/music.mp3'])
        this.load.atlas('flares', 'asset/flares.png', 'asset/flares.json');

    }
    particlescolli(){
        let particles = this.add.particles('white');

        particles.createEmitter({
            alpha: { start: 1, end: 0 },
            scale: { start: 1, end: 2},
            //tint: { start: 0xff945e, end: 0xff945e },
            speed: 20,
            rotate: { min: -180, max: 180 },
            lifespan: { min: 1000, max: 1010},
            blendMode: 'ADD',
            frequency: 110,
            maxParticles: 1,
            x: this.ball.x,
            y: this.ball.y
        });
        let particles2 = this.add.particles('effect');

        particles2.createEmitter({
            alpha: { start: 1, end: 0 },
            scale: { start: 0.2, end: 0.7},
            //tint: { start: 0xff945e, end: 0xff945e },
            speed: 200,
            rotate: { min: -180, max: 180 },
            lifespan: { min: 1000, max: 1010},
            blendMode: 'ADD',
            frequency: 200,
            maxParticles: 5,
            x: this.ball.x,
            y: this.ball.y,

        });
    }
    reset() {
        this.ball.y = this.Hscreen/2
        this.ball.x = this.Wscreen/2
        this.ball.setVelocityX(Math.random()>0.5?-200:200)
        this.ball.setVelocityY(0)
        this.player1.y=this.Hscreen/2-50
        this.player2.y=this.Hscreen/2-50
    }
    resetScore(){
        this.joueurDroite.score=0
        this.joueurGauche.score=0
        this.reset()
    }
 win(player){
   player.score ++;
       this.reset()
   }

 renvoie(player){

         this.rando=this.ball.y-player.y
         this.coeff=this.rando/100
         this.coeff=this.coeff*10-5
         this.ball.setVelocityY(this.ball.body.velocity.y+this.coeff*50)
     if (-2500<this.ball.body.x<2500) {
         this.ball.setVelocityX(this.ball.body.velocity.x * 1.05 ^ 2)
         console.log(this.ball.body.velocity.x)
     }
        this.particlescolli()

 }
 startF(){
        this.text.destroy()
     this.musicBg.mute=false
     this.musicBg.play()
     this.start=1
     if (this.start==1) {
         this.joueurGauche = new Joueur('Player 1', 'joueurGauche')
         this.joueurDroite = new Joueur('Player 2', 'joueurDroite')
         let me = this
         this.wall1 = this.physics.add.sprite(0, 0, 'square').setOrigin(0.0)
         this.wall2 = this.physics.add.sprite(0, 700, 'square').setOrigin(0.0)

         this.player1 = this.physics.add.sprite(100, this.Hscreen / 2 - 50, 'square2').setOrigin(0, 0)
         this.player1.setTintFill(0xab77a3)

         this.player2 = this.physics.add.sprite(1180, this.Hscreen / 2 - 50, 'square2').setOrigin(0, 0)
         this.player2.setTintFill(0xab77a3)

         this.ball = this.physics.add.sprite(this.Wscreen / 2, this.Hscreen / 2, 'circle')
         this.ball.scale = 0.05
         this.ball.setVelocityX(Math.random() > 0.5 ? -200 : 200)
         this.ball.setBounce(1, 1)
         this.ball.visible = false
         this.physics.add.collider(this.wall2, this.ball, function () {
             me.particlescolli()
         })
         this.physics.add.collider(this.wall1, this.ball, function () {
             me.particlescolli()
         })
         this.physics.add.collider(this.player1, this.ball, function () {
             me.renvoie(me.player1)
         })
         this.physics.add.collider(this.player2, this.ball, function () {
             me.renvoie(me.player2)
         })
         this.wall2.setImmovable(true)
         this.wall1.setImmovable(true)
         this.player1.setImmovable(true)
         this.player2.setImmovable(true)
         this.player1Speed = 0
         this.player2Speed = 0
         this.score = 0
         let particles2 = this.add.particles('flares');
         let particle = particles2.createEmitter({
             alpha: {start: 1, end: 0},
             frame: {frames: ['red', 'green', 'blue'], cycle: true},
             scale: {start: 0.4, end: 0.1},
             //tint: { start: 0xff945e, end: 0xff945e },
             blendMode: 'ADD',
             frequency: 10,
             x: me.ball.x,
             y: this.ball.y
         });
         particle.startFollow(this.ball)

     }

 }

    create() {
        this.initKeyboard()
        this.start=0
        this.Wscreen = 1280
        this.Hscreen = 720
        this.musicBg=this.sound.add('music')
        this.musicBg.mute=true
        this.musicBg.volume=0.2
        this.text=this.add.text(this.Wscreen/2-300, 350, 'Press Space To Start').setOrigin(0,0).setFontSize(50)

    }

        initKeyboard(){
            let me = this
            this.input.keyboard.on('keydown', function (kevent) {
                switch (kevent.keyCode) {
                    case Phaser.Input.Keyboard.KeyCodes.S:
                            me.player1.setVelocityY(-450)
                        break;
                    case Phaser.Input.Keyboard.KeyCodes.X:
                        me.player1.setVelocityY(450)
                        break;
                    case Phaser.Input.Keyboard.KeyCodes.J:
                        me.player2.setVelocityY(-450)
                        break;
                    case Phaser.Input.Keyboard.KeyCodes.N:
                        me.player2.setVelocityY(450)
                        break;

                }
            });
            this.input.keyboard.on('keyup', function (kevent) {
                switch (kevent.keyCode) {
                    case Phaser.Input.Keyboard.KeyCodes.S:
                        me.player1.setVelocityY(0)
                        break;
                    case Phaser.Input.Keyboard.KeyCodes.X:
                        me.player1.setVelocityY(0)
                        break;
                    case Phaser.Input.Keyboard.KeyCodes.J:
                        me.player2.setVelocityY(0)
                        break;
                    case Phaser.Input.Keyboard.KeyCodes.N:
                        me.player2.setVelocityY(0)
                        break;
                    case Phaser.Input.Keyboard.KeyCodes.R:
                        me.resetScore()
                        break;
                    case Phaser.Input.Keyboard.KeyCodes.SPACE:
                        if(me.start==0) {
                            me.startF()
                            console.log('space')
                            break;
                        }
                }
            })

        }

        update(){
        if(this.start==1){

            if(this.player1.y<=20){
                this.player1.y=20

            }
            if(this.player1.y>=600){
                this.player1.y=600

            }
            if(this.player2.y<=20){
                this.player2.y=20

            }
            if(this.player2.y>=600){
                this.player2.y=600

            }
            this.player1.y += this.player1Speed
            this.player2.y += this.player2Speed
            if(this.ball.x>1280){
                this.win(this.joueurGauche)
            }
            if(this.ball.x<-10){
                this.win(this.joueurDroite)
            }
        }}
    }

