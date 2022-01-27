class Ball  {
    constructor(Tableau1){
        this.scene= Tableau1
        this.ball=this.scene.physics.add.sprite(1280/2,  720/ 2, 'circle')
        this.ball.scale = 0.05
        this.ball.setVelocityX(Math.random() > 0.5 ? -200 : 200)
        this.ball.setBounce(1, 1)
        this.ball.visible = false
        let particles2 = this.scene.add.particles('flares');
        let particle = particles2.createEmitter({
            alpha: {start: 1, end: 0},
            frame: {frames: ['red', 'green', 'blue'], cycle: true},
            scale: {start: 0.4, end: 0.1},
            //tint: { start: 0xff945e, end: 0xff945e },
            blendMode: 'ADD',
            frequency: 10,
            x: this.ball.x,
            y: this.ball.y
        });
        particle.startFollow(this.ball)
    }
}