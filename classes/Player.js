import Entity from "./Entity.js";
import sprites from "../sprites.js";
import Bullet from './Bullet.js';

export default class Player extends Entity{
    constructor(x,y,name) {
        if(name === 'noah'){
            super(x,y,75,75,sprites.noah)
            this.speed = 12
            this.bullets = 180;
            this.hp = 5;
            this.rotateAmount = 0.05
        }else if(name === 'saar'){
            super(x,y,100,100,sprites.saar)
            this.speed = 8;
            this.bullets = 40;
            this.rotateAmount = 0.05
            this.hp = 5;
        }else if(name === 'ido'){
            super(x,y,100,100,sprites.ido)
            this.speed = 8
            this.bullets = 40;
            this.rotateAmount = 0.2
            this.hp = 5;
        }else if(name === 'roi'){
            super(x,y,100,100,sprites.roi)
            this.speed = 10;
            this.bullets = 60;
            this.rotateAmount = 0.05
            this.hp = 6;
            this.safe = false;
        }else{
            super(x,y,75,75,sprites.cheater)
            this.speed = 10;
            this.bullets = 1;
            this.rotateAmount = 0.05
            this.hp = 1;
        }
        
        this.name =name;
        this.angle = 0;
        this.rotate = 0;
        this.type = 'player'
    }

    goTheWayWereFacing() {
        let x = this.x;
        let y = this.y;
        this.x += -this.speed * Math.sin(this.angle);
        this.y += this.speed * Math.cos(this.angle);

        if(this.outside()){
            this.x = x;
            this.y = y;
            this.angle += 0.5;
        }
    }

    shoot(){
        if(this.bullets <= 0) return; 
        switch (this.name) {
            case 'ido':
            case 'cheater':
                for (let i = -5; i < 5; i++) {
                    Bullet.create(Player.player,
                        this.angle + ((Math.PI*2)/10)*i)
                }
                this.bullets--;
                break;
            case 'roi':
                this.safe = !this.safe;
                if(this.bullets <= 0) this.safe = false;
                break;
            default:
                Bullet.create(Player.player);
                this.bullets--;
                break;
        }
    }

    update(ctx,canvas){
        this.goTheWayWereFacing();
        
        ctx.save();

        ctx.font = "40px serif";
        for(let i = 0;i<this.hp;i++)
            ctx.fillText("❤️", canvas.width - 100 - 50*i,70)
        ctx.fillText("🔥" + Math.ceil(this.bullets), canvas.width - 150,120)
        
        if(this.name == 'roi')
            if(this.safe){
            ctx.fillText('אתה בטוח',canvas.width - 170,30)
            this.bullets -= 1/33;
            if(this.bullets <= 0) this.safe = false;
        }
        
        ctx.translate(this.x + this.width/2, this.y + this.height/2);
        ctx.rotate(this.angle);
        ctx.translate(-this.x - this.width/2, -this.y - this.height/2);
        this.draw(ctx);
        ctx.restore();

        this.angle += this.rotate;
    }

    die(ang){
        if(this.name === 'roi')
            if(this.safe){
                Bullet.create(Player.player,Math.PI + ang);
                return;
            }
        if(this.name != 'cheater') this.hp--;
        if(this.hp <= 0) setting.lose = true;
        
    }
}

Player.playe = {};