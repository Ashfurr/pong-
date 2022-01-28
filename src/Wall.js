class Wall{
    constructor(Tableau1,y) {
        this.scene= Tableau1
        this.wall=this.scene.physics.add.sprite(0, y, 'square').setOrigin(0.0)
        this.wall.setImmovable(true)
        let me =this
        this.scene.physics.add.collider(this.wall, this.scene.Mball.ball, function () {
            me.scene.particlescolli()
        })
    }

}