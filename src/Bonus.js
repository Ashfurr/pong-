class Bonus {
    constructor(Tableau1) {
        this.scene = Tableau1
        this.stars = this.scene.physics.add.sprite(Phaser.Math.Between(100, 1220), Phaser.Math.Between(80, 650), 'bonus')
        this.stars.setDisplaySize(80, 80)
        let me=this
        this.scene.physics.add.overlap(this.stars, this.scene.Mball.ball,function(){
            me.touchBonus()
        })
        this.newY=90
        this.scene.tweens.add({
            targets:[this.stars],
            angle:360,
            ease :'Linear',
            repeat:-1,
            duration:1000,
        })

    }

    touchBonus() {
        this.stars.destroy()
        if(this.scene.detect==1&this.scene.joueurGauche.playerpad.height<300 ){
            this.scene.joueurGauche.playerpad.setDisplaySize(20,this.scene.joueurGauche.playerpad.height+10)
            this.scene.joueurGauche.playerpad.height+=10
        }
        if(this.scene.detect==0&this.scene.joueurDroite.playerpad.height<300 ){
            this.scene.joueurDroite.playerpad.setDisplaySize(20,this.scene.joueurDroite.playerpad.height+10)
            this.scene.joueurDroite.playerpad.height+=10
        }
        this.scene.bonusFonction()

    }

}