class Joueur  {
    get score() {
        return this._score;
    }

    set score(value) {
        this._score = value;
        this.$score.textContent=  this._score

    }
    constructor(name,scoreId,Tableau1,x) {

        this.Tableau2= Tableau1
        this._score = 0;
        this.name = name;
        this.htmlId = scoreId;
        this.playerpad=this.Tableau2.physics.add.sprite(x,310,'square2').setOrigin(0.0)
        this.playerpad.body.setSize(40,100)
        this.playerpad.setImmovable(true)
        this.playerpad.setVelocityY(0)
        let me=this
        this.Tableau2.physics.add.collider(this.playerpad, this.Tableau2.Mball.ball, function () {
            me.Tableau2.renvoie(me.playerpad)
        })


        this.$el = document.getElementById(scoreId);
        this.$score = this.$el.querySelector(".score")
        this.$name = this.$el.querySelector(".name")
        this.$name.textContent=name;
    }
    monte(){

        this.playerpad.setVelocityY(-450)
    }
    descend(){

        this.playerpad.setVelocityY(450)
    }
    bougepas(){
        this.playerpad.setVelocityY(0)
        console.log('pressed')
    }
    limite(){
        if(this.playerpad.y<=20){
            this.playerpad.y=20
        }
        if(this.playerpad.y>=600){
            this.playerpad.y=600
        }
    }
}