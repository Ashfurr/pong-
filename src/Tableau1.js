

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
            x: this.Mball.ball.x,
            y: this.Mball.ball.y
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
            x: this.Mball.ball.x,
            y: this.Mball.ball.y,

        });
    }
    reset() {
        this.Mball.ball.y = this.Hscreen/2
        this.Mball.ball.x = this.Wscreen/2
        this.Mball.ball.setVelocityX(Math.random()>0.5?-200:200)
        this.Mball.ball.setVelocityY(0)
        this.joueurDroite.playerpad.y=this.Hscreen/2-50
        this.joueurGauche.playerpad.y=this.Hscreen/2-50
        this.lock=0
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

         this.rando=this.Mball.ball.y-player.y
         this.coeff=this.rando/100
         this.coeff=this.coeff*10-5
     this.Mball.ball.setVelocityY(this.Mball.ball.body.velocity.y+this.coeff*50)
     if (this.lock==0) {
         this.Mball.ball.setVelocityX(this.Mball.ball.body.velocity.x * 1.5)
     }

     this.particlescolli()
 }
 startF(){
        this.lock=0
        this.text.destroy()
     this.musicBg.mute=false
     this.start=1
     if (this.start==1) {
         this.joueurGauche = new Joueur('Player 1', 'joueurGauche',this,80)
         this.joueurDroite = new Joueur('Player 2', 'joueurDroite',this,1180)
         this.Mball = new Ball(this, 'Mball')
         let me = this
         this.wall1 = this.physics.add.sprite(0, 0, 'square').setOrigin(0.0)
         this.wall2 = this.physics.add.sprite(0, 700, 'square').setOrigin(0.0)
         this.physics.add.collider(this.Mball.ball, this.Mball.ball, function () {
             me.particlescolli()
         })
         this.physics.add.collider(this.wall1, this.Mball.ball, function () {
             me.particlescolli()
         })
         this.physics.add.collider(this.joueurGauche.playerpad, this.Mball.ball, function () {
             me.renvoie(me.joueurGauche.playerpad)
         })
         this.physics.add.collider(this.joueurDroite.playerpad, this.Mball.ball, function () {
             me.renvoie(me.joueurDroite.playerpad)
         })
         this.wall2.setImmovable(true)
         this.wall1.setImmovable(true)
         this.score = 0


     }

 }

    create() {
        this.initKeyboard()
        this.start=0
        this.Wscreen = 1280
        this.Hscreen = 720
        this.musicBg=this.sound.add('music')
        this.musicBg.mute=true
        this.musicBg.play()
        this.musicBg.volume=0.2
        this.text=this.add.text(this.Wscreen/2-300, 350, 'Press Space To Start').setOrigin(0,0).setFontSize(50)

    }

        initKeyboard(){
            let me = this
            this.input.keyboard.on('keydown', function (kevent) {
                switch (kevent.keyCode) {
                    case Phaser.Input.Keyboard.KeyCodes.S:
                            me.joueurGauche.playerpad.setVelocityY(-450)
                        break;
                    case Phaser.Input.Keyboard.KeyCodes.X:
                        me.joueurGauche.playerpad.setVelocityY(450)
                        break;
                    case Phaser.Input.Keyboard.KeyCodes.J:
                        me.joueurDroite.playerpad.setVelocityY(-450)
                        break;
                    case Phaser.Input.Keyboard.KeyCodes.N:
                        me.joueurDroite.playerpad.setVelocityY(450)
                        break;

                }
            });
            this.input.keyboard.on('keyup', function (kevent) {
                switch (kevent.keyCode) {
                    case Phaser.Input.Keyboard.KeyCodes.S:
                        me.joueurGauche.playerpad.setVelocityY(0)
                        break;
                    case Phaser.Input.Keyboard.KeyCodes.X:
                        me.joueurGauche.playerpad.setVelocityY(0)
                        break;
                    case Phaser.Input.Keyboard.KeyCodes.J:
                        me.joueurDroite.playerpad.setVelocityY(0)
                        break;
                    case Phaser.Input.Keyboard.KeyCodes.N:
                        me.joueurDroite.playerpad.setVelocityY(0)
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
            if(Math.abs(this.Mball.ball.body.velocity.x>1800)){
                this.lock=1
            }
            if(this.joueurGauche.playerpad.y<=20){
                this.joueurGauche.playerpad.y=20

            }
            if(this.joueurGauche.playerpad.y>=600){
                this.joueurGauche.playerpad.y=600

            }
            if(this.joueurDroite.playerpad.y<=20){
                this.joueurDroite.playerpad.y=20

            }
            if(this.joueurDroite.playerpad.y>=600){
                this.joueurDroite.playerpad.y=600

            }
            if(this.Mball.ball.x>1280){
                this.win(this.joueurGauche)
            }
            if(this.Mball.ball.x<-10){
                this.win(this.joueurDroite)
            }
        }}
    }

