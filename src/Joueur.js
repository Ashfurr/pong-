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
        this.playerpad=this.Tableau2.physics.add.sprite(x,300,'square2').setOrigin(0.0)
        this.playerpad.body.setSize(40,100)
        this.playerpad.setImmovable(true)
        this.playerpad.setVelocityY(0)


        this.$el = document.getElementById(scoreId);
        this.$score = this.$el.querySelector(".score")
        this.$name = this.$el.querySelector(".name")
        this.$name.textContent=name;
    }
    monte(){
        this.$boutonMonte.addClass("flash");
        this.playerpad.setVelocityY(-450)
    }
    descend(){
        this.$boutonDescend.addClass("flash");
        this.playerpad.setVelocityY(450)
    }
    bougepas(){
        this.$boutonMonte.add(this.$boutonDescend).removeClass("flash");
        this.playerpad.setVelocityY(0)
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