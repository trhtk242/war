//This is the explosion class.
//The explosion can move and die
//The explosion class extends from the entity class.

import sprites from '../sprites.js';
import Entity from './Entity.js'

export default class Explosion extends Entity{
    constructor(x,y,width){
        super(x,y,width,width,sprites.explosion);
        this.id = Explosion.array.length;
        this.animation= 0;

        let audio = new Audio('../sound/explosion.mp3');
        audio.play();
        audio.volume = 0.01;
    }

    delete(){
        delete Explosion.array[this.id];
    }

    updateSprite(sprite){
        this.sx = sprite.x;
        this.sy = sprite.y;
        this.swidth = sprite.width;
        this.sheight = sprite.height;
    }

    update(ctx) {
        this.animation+=0.5;
        const currentFrame = Math.floor(this.animation);
        
        this.updateSprite(animations[currentFrame]);

        if(this.animation > 8){
            this.delete();
        }
        this.draw(ctx)   
    }
}
Explosion.array = [];

//This function creates explosions.
Explosion.create = (owner) =>{
    const x = owner.x + owner.width/4;
    const y = owner.y - owner.height/4;
    const newExplosion = new Explosion(
        x,y,
        (owner.width+owner.height)/2);

    Explosion.array.push(newExplosion)
}        

const animations = [
    {
        x:894,
        y:735,
        width:202,
        height:208,
    },{
        x:656,
        y:120,
        width:278,
        height: 264,
    },{
        x:1024,
        y:73,
        width:368,
        height: 367,
    },{
        x:568,
        y:464,
        width:282,
        height: 302,
    },{
        x:996,
        y:491,
        width:288,
        height: 278,
    },{
        x:1408,
        y:471,
        width:319,
        height: 303,
    },{
        x:344,
        y:789,
        width:328,
        height: 315,
    },{
        x:749,
        y:801,
        width:338,
        height: 319,
    },{
        x:1184,
        y:824,
        width:272,
        height: 266,
    }
]