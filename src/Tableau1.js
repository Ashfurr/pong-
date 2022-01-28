

class Tableau1 extends Phaser.Scene {


    preload() {
        this.load.image('square', 'asset/carre.png')
        this.load.image('square2', 'asset/carre2.png')
        this.load.image('circle', 'asset/cercle.png')
        this.load.image('white', 'asset/white.png')
        this.load.image('effect', 'asset/effect.png')
        this.load.image('bonus', 'asset/bonus.png')
        this.load.audio('music', ['asset/music.mp3'])
        this.load.audio('pad_01', ['asset/pad_01.mp3'])
        this.load.atlas('flares', 'asset/flares.png', 'asset/flares.json');

    }

    /**
     * des petites particles pour faire jolie
     */
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

    /**
     * reset uniquement les assets
     */
    reset() {
        this.Mball.ball.y = this.Hscreen/2
        this.Mball.ball.x = this.Wscreen/2
        this.Mball.ball.setVelocityX(Math.random()>0.5?-200:200)
        this.Mball.ball.setVelocityY(0)
        this.joueurDroite.playerpad.y=this.Hscreen/2-50
        this.joueurGauche.playerpad.y=this.Hscreen/2-50
        this.lock=0
    }

    /**
     * Reset le jeu entierement
     */
    resetScore(){
        this.joueurDroite.score=0
        this.joueurGauche.score=0
        this.reset()
    }

    /**
     * on acrémente le score
     * @param player
     */
 win(player){
   player.score ++;
       this.reset()
   }
bonusFonction(){
    this.bonus= new Bonus(this)
}
    /**
     * calcul pour déterminer un coefficiant en fonction de la position ou frappe la balle sur la raquette
     * @param player
     */
 renvoie(player){
        this.padS.play()
        if(player.x==80){
            this.detect=1
        }
        if(player.x==1180){
            this.detect=0
        }


         this.rando=this.Mball.ball.y-player.y
         this.coeff=this.rando/100
         this.coeff=this.coeff*10-5
         this.Mball.ball.setVelocityY(this.Mball.ball.body.velocity.y+this.coeff*50)
             if (this.lock==0) {
         this.Mball.ball.setVelocityX(this.Mball.ball.body.velocity.x * 1.05)
     }
        this.particlescolli()
 }

    /**
     * sorte de créate mais différé, comme une seconde scène
     */
 startF(){
        this.lock=0
        this.text.destroy()
        this.musicBg.mute=false
     if (this.start==1) {
         this.Mball = new Ball(this)
         this.joueurGauche = new Joueur('Player 1', 'joueurGauche',this,80)
         this.joueurDroite = new Joueur('Player 2', 'joueurDroite',this,1180)
         this.wallUp= new Wall(this,0)
         this.wallDown= new Wall(this,700)
         this.bonus= new Bonus(this)
         this.score = 0
     }
 }
    create() {
        this.detect=0
        this.start=0
        this.Wscreen = 1280
        this.Hscreen = 720
        this.musicBg=this.sound.add('music')
        this.padS=this.sound.add('pad_01')
        this.padS.volume=0.1
        this.musicBg.mute=true
        this.musicBg.play()
        this.musicBg.volume=0.2
        this.text=this.add.text(this.Wscreen/2-300, 350, 'Press Space To Start').setOrigin(0,0).setFontSize(50)
        this.controle=new Controle(this)
    }
        update(){
            /**
             * acceleration de la balle par rebond que l'on bloque sinon la balle finis par traverser les hitbox
             */
        if(this.start==1){
            this.Mball.limiteB()
            this.joueurGauche.limite()
            this.joueurDroite.limite()
            if(this.Mball.ball.x>1280){
                this.win(this.joueurGauche)
            }
            if(this.Mball.ball.x<-10){
                this.win(this.joueurDroite)
            }

        }}
    }

