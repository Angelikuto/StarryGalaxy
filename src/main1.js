let gameConfig = {
    type: Phaser.AUTO,
    width: 960,
    height: 540,
    backgroundColor: '#0000',
    parent: 'game',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: new Tableau1()
};
let game = new Phaser.Game(gameConfig);
