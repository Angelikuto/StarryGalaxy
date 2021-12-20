
class Tableau1 extends Phaser.Scene {

    preload() {
        this.load.image('etoile', 'asset/etoile.png')
        this.load.image('asteroide', 'asset/asteroide.png')
        this.load.image('grogu1', 'asset/groguxmando.png')
        this.load.image('planete1', 'asset/planete1.png')
        this.load.image('planete2', 'asset/planete2.png')
        this.load.image('planete3', 'asset/planete3.png')
        this.load.audio('musique',['asset/manda.mp3'])

    }

    getFrames(prefix, length) {
        let frames = [];
        for (let i = 1; i <= length; i++) {
            frames.push({key: prefix + i});
        }
        return frames;
    }

    aleaStars() {
        this.etoile = this.add.image(960, Phaser.Math.Between(0, 540), 'etoile')
        this.asteroide = this.add.image(960, Phaser.Math.Between(0, 540), 'asteroide')
    }
    tweensStar() {
    }

    fallGrogu() {
        this.tweens.add({
            targets: [this.grogu1],
            props: {
                x: {value: '+=600', duration: 4000, ease: 'Power2'},
                y: {value: '500', duration: 3000, ease: 'Bounce.easeOut'}
            },
            delay: 1000
        });

    }

    circlePlanete() {
        {
            this.planete1 = this.add.image(200, 250, 'planete1');
        }
    }
    circlePlanete2() {
        {
             this.planete2 = this.add.image(600, 300, 'planete2');
        }
    }
    alphaStar(){
        this.tweens.add({
            targets: [this.etoile,this.asteroide],
            alpha: 0,
            yoyo: true,
            loop: -1
        });
    }
    alphaPlanete(){
        if(this.alphaP==0) {

            this.tweens.add({
                targets: [this.planete1, this.planete2],
                alpha: 0,
                yoyo: false,
            });
            this.alphaP=1
        }
        else if (this.alphaP==1){
            this.tweens.add({
                targets: [this.planete1, this.planete2],
                alpha: 1,
                yoyo: false,
            });
            this.alphaP=0
        }
}
    timerStar(){
        this.time.addEvent({
            delay:900,
            callback: () => {
                this.aleaStars()
            },
            repeat: -1,
        })
    }
    create () {

        //initialise ce qui se passe avec le clavier
        this.initKeyboard();
        this.tweensStar();
        this.timerStar();
        this.alphaP=0;
        this.grogu1=this.add.image(-30,0,'grogu1')
        this.speed=0;
        this.musique=this.sound.add('musique')
    }
    initKeyboard(){
        let me=this;
        this.input.keyboard.on('keydown', function(kevent)
        {
            switch (kevent.keyCode)
            {
                case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                    me.speed=5
                    break;
                case Phaser.Input.Keyboard.KeyCodes.LEFT:
                    me.speed=-5
                    break;
                case Phaser.Input.Keyboard.KeyCodes.A:

                    me.alphaStar()
                    break;
                case Phaser.Input.Keyboard.KeyCodes.Z:
                    me.fallGrogu()
                    break;
                case Phaser.Input.Keyboard.KeyCodes.E:
                    me.circlePlanete()
                    break;
                case Phaser.Input.Keyboard.KeyCodes.R:
                    me.circlePlanete2()
                    break;
                case Phaser.Input.Keyboard.KeyCodes.T:
                    me.alphaPlanete()
                    break;
                case Phaser.Input.Keyboard.KeyCodes.Y:
                    me.musique.play()
                    break;

            }
        });
        this.input.keyboard.on('keyup', function(kevent)
        {
            switch (kevent.keyCode)
            {
                case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                case Phaser.Input.Keyboard.KeyCodes.LEFT:
                    break;
            }
        });
    }

    update(){
        let tweenStar = this.tweens.add({
            targets: [this.etoile,this.asteroide],
            x:-5,
            ease: 'Linear',
            duration: 5000,
            delay: 0,
            repeat: -1,
            yoyo: false,
        })
        this.grogu1.x+=this.speed
        if(this.grogu1.x>1000){
            this.grogu1.x=-40
        }
        if (this.grogu1.x<-40) {
            this.grogu1.x=1000
        }
    }


}
