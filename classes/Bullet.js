import sprites from "../sprites.js";
import Building from "./Building.js";
import Entity from "./Entity.js";
import Explosion from "./Explosion.js";
import Car from "./Car.js";
import {player} from '../index.js';
import Bazooka from "./Bazooka.js";

export default class Bullet extends Entity{
    constructor(x,y,angle,width,height,type,spanlife) {
        let sprite = (type === 'player') ? sprites.bulletGood : sprites.bullet
        super(x,y,width,height,sprite,angle);

        this.speed = 12;
        this.id = Bullet.array.length;
        this.type = type;
        this.spanlife = spanlife;
    }

    goTheWayWereFacing() {
        this.x += -this.speed * Math.sin(this.angle);
        this.y += this.speed * Math.cos(this.angle);
    }

    delete(){
        delete Bullet.array[this.id]
    }

    desireAng(obj) {
        let diffX = obj.x - this.x;
        let diffY = obj.y - this.y;

        return Math.atan2(diffY,diffX) - Math.PI/2
    }

    update(ctx){
        this.spanlife-=1;
        if(this.spanlife <= 0) {
            this.delete();
            return
        }

        switch (this.type) {
            case 'player':
                let nearest = {x:10000,y:10000}
                Building.array.forEach(building =>{
                    if(building.destroyed) return;
                    if(this.collision(building) ){
                        Explosion.create(building);
                        this.delete();
                        building.delete();
                    }
                    if(this.distance(nearest) > this.distance(building) &&(player.id === 'saar'|| player.id === 'giora')){
                        this.angle = this.desireAng(building) 
                        nearest = building;
                    }
                })
                Bazooka.array.forEach(baz =>{
                    if(this.collision(baz)){
                        Explosion.create(this);
                        this.delete();
                        baz.delete();
                    }
                    if(this.distance(nearest) > this.distance(baz) &&(player.id === 'saar'|| player.id === 'giora')){
                        this.angle = this.desireAng(baz) 
                        nearest = baz;
                    }
                })
                Car.array.forEach(car =>{
                    if(this.collision(car)){
                        Explosion.create(this);
                        this.delete();
                        car.delete();
                    }
                    if(this.distance(nearest) > this.distance(car) && (player.id === 'saar' || player.id === 'giora')){
                        this.angle = this.desireAng(car) 
                        nearest = car;
                    }
                })
                break;
            case 'bazooka':
            case 'cannon':
                if(this.collision(player)){
                    player.die(this.angle)
                    this.delete();
                }
                break;
            default:
                break;
        }

        this.goTheWayWereFacing();
        ctx.save();
        this.draw(ctx);
        ctx.restore();

        if(this.outside()) this.delete();
    }
}
Bullet.array = [];
Bullet.create = (owner,spanlife,ang = owner.angle) => {
    let bullet = new Bullet(
        owner.x + owner.width/2,
        owner.y + owner.height/2,
        ang,
        10,30,
        owner.type,spanlife)
    Bullet.array.push(bullet);
}