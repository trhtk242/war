import Entity from "./Entity.js";
import sprites from "../sprites.js";
import Bazooka from "./Bazooka.js";
import Building from "./Building.js";

export default class Car extends Entity {
    constructor(x,y,width,height,type,target){
        let sprite = sprites['car'+type];
        super(x,y,width,height,sprite)

        this.desireX = Math.randomBetween(0,canvas.width-50);
        this.desireY =Math.randomBetween(0,canvas.height-50);

        this.id = Car.array.length;

        this.angle = Math.PI + 0.3;
        this.speed = 7;
        this.dead = false;
    }

    desireAng(x,y) {
        let diffX = x - this.x;
        let diffY =  y - this.y;

        return Math.atan2(diffY,diffX) - Math.PI/2
    }

    goTheWayWereFacing() {
        const ang = this.angle;
        const x = this.x;
        const y = this.y;  

        this.x += this.speed * Math.sin(this.angle);
        this.angle = this.desireAng(this.desireX,this.desireY) + Math.PI;
        this.y += -this.speed * Math.cos(this.angle);
        
        Building.array.forEach(building => {
            if(this.collision(building)){
                this.angle = ang + 0.01;
                this.x = x;this.y =y ;
                this.desireX = Math.randomBetween(0,canvas.width-50);
                this.desireY =Math.randomBetween(0,canvas.height-50);
        
            }
        })
    }
    
    delete(){
        delete Car.array[this.id];
        // this.dead = true;
        // this.sx = sprites.car0.x
        // this.sy = sprites.car0.y
        // this.swidth = sprites.car0.width
        // this.sheight = sprites.car0.height
    }

    update(ctx){
        if(!this.dead){
        this.goTheWayWereFacing();
        
        if(this.distance({x:this.desireX,y:this.desireY}) < 50)
            for (let i = -1; i < 2; i++) {
                Bazooka.create(
                    this.desireX + i*30, 
                    this.desireY + i*30,
                    this.target)  
                this.delete();
            }
        }
      

        ctx.save();
        ctx.translate(this.x + this.width/2, this.y + this.height/2);
        ctx.rotate(this.angle);
        ctx.translate(-this.x - this.width/2, -this.y - this.height/2);
        this.draw(ctx);
        ctx.restore();
    }

}

Car.array = [];

Car.create = (x,y,target) => {
    let car = new Car(x,y,30,60,1,target);
    Car.array.push(car);
}