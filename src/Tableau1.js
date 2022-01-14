

class Tableau1 extends Phaser.Scene {


    preload() {
        this.load.image('square', 'asset/carre.png')
        this.load.image('circle', 'asset/cercle.png')
    }
    resetD() {
        this.score += 10
        this.scoreText.setText('Score: ' + this.score)
        this.ball.y = 360
        this.ball.x = 500
        let vitball=Phaser.Math.Between(200, 400)
    }
    resetG(){
        this.score2+=10
        this.scoreText2.setText('Score: '+ this.score2)
        this.ball.y=360
        this.ball.x=500
        let vitball=Phaser.Math.Between(200, 400)
    }

    create() {
        let vitball=Phaser.Math.Between(200, 400);
        this.scoreText = this.add.text(100, 50, 'score: 0', { fontSize: '32px', fill: '#000' });
        this.scoreText2 = this.add.text(1000, 50, 'score: 0', { fontSize: '32px', fill: '#000' });
        this.wall1 = this.physics.add.sprite(512, 10, 'square')
        this.wall2 = this.physics.add.sprite(512, 710, 'square')
        this.wall1.scaleY = 0.1
        this.wall1.scaleX = 3
        this.wall2.scaleY = 0.1
        this.wall2.scaleX = 3
        this.player1 = this.physics.add.sprite(100, 360, 'square')
        this.player1.scaleX = 0.02
        this.player1.scaleY = 0.5
        this.player1.setTintFill(0x00000)
        this.player2 = this.physics.add.sprite(1180, 360, 'square')
        this.player2.scaleX = 0.02
        this.player2.scaleY = 0.5
        this.player2.setTintFill(0x00000)
        this.ball = this.physics.add.sprite(500, 360, 'circle')
        this.ball.scale = 0.05
        this.ball.setVelocity(vitball, vitball*2)
        this.ball.setBounce(1, 1)
        this.ball.setTintFill(0xF00020)
        this.physics.add.collider(this.wall2, this.ball)
        this.physics.add.collider(this.wall1, this.ball)
        this.physics.add.collider(this.player1, this.ball)
        this.physics.add.collider(this.player2, this.ball)
        this.wall2.setImmovable(true)
        this.wall1.setImmovable(true)
        this.player1.setImmovable(true)
        this.player2.setImmovable(true)
        this.player1Speed = 0
        this.player2Speed = 0
        this.initKeyboard()
        this.score=0
        this.score2=0
    }

        initKeyboard(){
            let me = this
            this.input.keyboard.on('keydown', function (kevent) {
                switch (kevent.keyCode) {
                    case Phaser.Input.Keyboard.KeyCodes.S:
                            me.player1Speed = -10
                        break;
                    case Phaser.Input.Keyboard.KeyCodes.X:
                        me.player1Speed = 10
                        break;
                    case Phaser.Input.Keyboard.KeyCodes.J:
                        me.player2Speed = -10
                        break;
                    case Phaser.Input.Keyboard.KeyCodes.N:
                        me.player2Speed = 10
                        break;
                }
            });
            this.input.keyboard.on('keyup', function (kevent) {
                switch (kevent.keyCode) {
                    case Phaser.Input.Keyboard.KeyCodes.S:
                        me.player1Speed = 0
                        break;
                    case Phaser.Input.Keyboard.KeyCodes.X:
                        me.player1Speed = 0
                        break;
                    case Phaser.Input.Keyboard.KeyCodes.J:
                        me.player2Speed = 0
                        break;
                    case Phaser.Input.Keyboard.KeyCodes.N:
                        me.player2Speed = 0
                        break;
                    case Phaser.Input.Keyboard.KeyCodes.R:
                        me.reset()
                        break;
                }
            })

        }

        update()
        {
            if(this.player1.y<162){
                this.player1Speed=0
                this.player1.y=163
            }
            if(this.player1.y>558){
                this.player1Speed=0
                this.player1.y=557
            }
            if(this.player2.y<162){
                this.player2Speed=0
                this.player2.y=163
            }
            if(this.player2.y>558){
                this.player2Speed=0
                this.player2.y=557
            }
            this.player1.y += this.player1Speed
            this.player2.y += this.player2Speed
            if(this.ball.x>1280){
                this.resetD()
            }
            if(this.ball.x<-10){
                this.resetG()
            }
        }
    }

