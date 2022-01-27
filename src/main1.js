let gameOptions = {
        circleColors: [0xff0099, 0xf3f315, 0x83f52c, 0x630dd0]}
let gameConfig = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        min: {
            width: 800,
            height: 600
        },
        max: {
            width: 1280,
            height: 720,
        }
    },
    backgroundColor: '#000000',
    audio: {
        disableWebAudio: true
    },
    parent: 'game',
    physics: {
        default: 'arcade',
        arcade: {
            debug:true
        }
    },
    scene: new Tableau1()
};
let game = new Phaser.Game(gameConfig);
