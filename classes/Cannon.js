import sprites from "../sprites.js";
import Bullet from "./Bullet.js";
import Entity from './Entity.js';
import {player} from '../index.js';

export default class Cannon extends Entity {
    constructor(building,target){
        let x = building.x + building.width/4;
        let y = building.y + building.height/4;

        super(x,y,30,60,sprites.cannon,0)
        this.id = Cannon.array.length;
        
        this.target = target;

        this.cooldown = Math.randomBetween(150,200);;
        this.type = 'cannon';
    }

    delete(){
        setting.score+=2;
        delete Cannon.array[this.id];
    }

    desireAng() {
        let diffX = player.x - this.x;
        let diffY =  player.y - this.y;

        return Math.atan2(diffY,diffX) - Math.PI/2
    }
    
    update(ctx){
        this.cooldown --;
        
        this.angle = this.desireAng();

        if(this.cooldown === 0){
            for (let i = 0; i < 3; i++) {
                setTimeout(()=>Bullet.create(this,20),100*i)
                
            }
            this.cooldown = Math.randomBetween(150,200);
        }

        ctx.save();
        this.draw(ctx);
        ctx.restore();
    }

}

Cannon.array = [];
Cannon.create = (building,target) => {
    let can = new Cannon(building,target);
    Cannon.array.push(can);
    return can;
}