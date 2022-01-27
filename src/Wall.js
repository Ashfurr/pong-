class Wall{
    constructor(Tableau1,y) {
        this.scene= Tableau1
        this.wall=this.scene.physics.add.sprite(0, y, 'square').setOrigin(0.0)
        this.wall.setImmovable(true)
    }
}