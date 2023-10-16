import Entity from "./Entity.js";
import sprites from "../sprites.js";
import Cannon from "./Cannon.js";
import Bazooka from "./Bazooka.js";

export default class Ship extends Entity {
    constructor(x,y,width,height,type,target){
        let sprite = sprites['ship'+type]
        super(x,y,width,height,sprite,Math.PI + 0.3)

        this.desireX = Math.randomBetween(0,canvas.width-50);
        this.desireY =Math.randomBetween(0,canvas.height-50);

        this.type = type;
        this.target = target
        this.id = Ship.array.length;
        if(this.type == 1){
            this.speed = 3;
            this.cannon = Cannon.create(this,target)
        }else{
            this.speed = 5;
            this.bazooka = Bazooka.create(this.x,this.y,target,30)
        }

        this.sound = new Audio('../sound/boat.mp3');
        this.sound.volume = 0.1;
        if(setting.sound) this.sound.play();
    }

    desireAng(x,y) {
        let diffX = x - this.x;
        let diffY =  y - this.y;

        return Math.atan2(diffY,diffX) - Math.PI/2
    }

    goTheWayWereFacing() {
        // const ang = this.angle;
        // const x = this.x;
        // const y = this.y;  

        this.angle = this.desireAng(this.desireX,this.desireY) + Math.PI;
        this.x += this.speed * Math.sin(this.angle);
        this.y += -this.speed * Math.cos(this.angle);
    }
    
    delete(){
        this.sound.pause(); 
        if(this.type == 1) {
            this.cannon.delete()
            setting.score += 4;
        }else{
            setting.score += 2;
            this.bazooka.delete();
        }
        delete Ship.array[this.id];
    }

    update(ctx){
        this.goTheWayWereFacing();
        if(this.type == 2){
            this.bazooka.x = -this.bazooka.width / 2 + this.x + this.width / 2;
            this.bazooka.y = -this.bazooka.height / 2 + this.y + this.height / 2;    
        }else{
            this.cannon.angle = this.angle + Math.PI;
            this.cannon.x = -this.cannon.width / 2 + this.x + this.width / 2;
            this.cannon.y = -this.cannon.height / 2 + this.y + this.height / 2;    
        }

        if(this.distance({x:this.desireX,y:this.desireY}) < 50){
            this.desireX = Math.randomBetween(0,canvas.width-50);
            this.desireY =Math.randomBetween(0,canvas.height-50);    
        }

        ctx.save();
        this.draw(ctx);
        ctx.restore();
    }

}

Ship.array = [];

Ship.create = (x,y,type,target) => {
    let ship = new Ship(x,y,45,90,type,target);
    Ship.array.push(ship);
}

Ship.deleteAll = () => {
    Ship.array.forEach(ship =>{
        ship.sound.pause();
    })
    Ship.array = [];
}