

class Tableau1 extends Phaser.Scene {


    preload() {
        this.load.image('square', 'asset/carre.png')
        this.load.image('player', 'asset/player.png')
        this.load.image('circle', 'asset/cercle.png')
    }
    win(player) {
        this.ball.y=this.Hscreen/2
        this.ball.x=this.Wscreen/2
        this.ball.setVelocityX(600)
        this.ball.setVelocityY(0)
        if (player == this.player1) {
            this.score += 10;
            this.scoreText.setText('Score: ' + this.score)
        }
        if (player == this.player2) {
            this.score2 += 10;
            this.scoreText2.setText('Score: ' + this.score2)
        }
    }

    rebond(raquette){
        console.log(raquette.y)
        console.log(this.ball.y-this.player1.y)
        let relativity=this.ball.y-raquette.y
        let renvoie= (relativity/raquette.height)
        renvoie=renvoie*2-1
        this.ball.setVelocityY(this.ball.body.velocity.y+renvoie*500)

    }

    create() {
        this.Wscreen=1280
        this.Hscreen=720
        this.scoreText = this.add.text(100, 50, 'score: 0', { fontSize: '32px', fill: '#ffffff' });
        this.scoreText2 = this.add.text(1000, 50, 'score: 0', { fontSize: '32px', fill: '#ffffff' });
        this.wall1 = this.physics.add.sprite(512, 10, 'square')
        this.wall2 = this.physics.add.sprite(512, 710, 'square')
        this.wall1.setDisplaySize(screen.width,20)
        this.wall2.setDisplaySize(screen.width,20)
        this.player1 = this.physics.add.sprite(100, this.Hscreen/2-50, 'player').setOrigin(0.0)
        this.player1.setTintFill(0xFFFFFFFF)
        this.player2 = this.physics.add.sprite(1180, this.Hscreen/2-50, 'player').setOrigin(0.0)
        this.player2.setTintFill(0xFFFFFFFF)
        this.ball = this.physics.add.sprite(this.Wscreen/2, this.Hscreen/2, 'circle')
        this.ball.scale=0.05
        this.ball.setVelocityX(600)

        this.ball.setBounce(1, 1)
        this.ball.setTintFill(0xF00020)
        this.physics.add.collider(this.wall2, this.ball)
        this.physics.add.collider(this.wall1, this.ball)
        let me =this
        this.physics.add.collider(this.player1, this.ball,function() {
            me.rebond(me.player1)
        })
        this.physics.add.collider(this.player2, this.ball,function() {
            me.rebond(me.player2)
        })

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
                        break;
                }
            })

        }

        update()
        {

            this.player1.y += this.player1Speed
            this.player2.y += this.player2Speed
            if (this.player1.y+this.player1.height>700){
                this.player1.y=600
            }
            if (this.player2.y+this.player2.height>700){
                this.player2.y=600
            }
            if (this.player1.y<20){
                this.player1.y=20
            }
            if (this.player2.y<20){
                this.player2.y=20
            }


            if(this.ball.x>1280){
                this.win(this.player1);

            }
            if(this.ball.x<-10){
                this.win(this.player2);
            }
        }

    }

