import sprites from "../sprites.js";
import Bullet from "./Bullet.js";
import Entity from './Entity.js';
import {player} from '../game.js';

export default class Bazooka extends Entity {
    constructor(x,y,target,cooldown){
        super(x,y,30,40,sprites.bazooka, Math.randomBetween(0,Math.PI))
        this.id = Bazooka.array.length;
        
        this.target = target;
        this.maxCooldwon = cooldown;
        this.cooldown = cooldown;
        this.type = 'bazooka';
    }

    delete(){
        setting.score++;
        delete Bazooka.array[this.id];
    }

    desireAng() {
        let diffX = player.x - this.x;
        let diffY =  player.y - this.y;

        return Math.atan2(diffY,diffX) - Math.PI/2
    }
    
    update(ctx){
        // this.angle = Math.atan2( this.target.x - this.y, this.target.x - this.x ) + Math.PI//* ( 180 / Math.PI )
        this.cooldown --;
        
        this.angle = this.desireAng();

        if(this.cooldown === 0){
            Bullet.create(this,35);
            this.cooldown = this.maxCooldwon;
        }
        ctx.save();

        this.draw(ctx);

        ctx.restore();
    }

}

Bazooka.array = [];
Bazooka.create = (x,y,target,cooldown = 100) => {
    let bazook = new Bazooka(x,y,target,cooldown);
    Bazooka.array.push(bazook);
    return bazook;
}