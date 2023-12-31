//The first class, whick all classes are extended from it.
import {player} from '../game.js';
export default class Entity{
    constructor(x,y,width,height,sprite,angle){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;


        this.sx = sprite.x;
        this.sy = sprite.y;
        this.swidth = sprite.width;
        this.sheight = sprite.height;

        this.img = new Image();
        this.img.src = sprite.img;

        this.angle = angle;
    }

    draw(ctx){
        ctx.save();
        let x = this.x//-player.x
        let y =this.y//-player.y

        // x+=canvas.width/2
        // y+=canvas.height/2

        // x-=this.width/2
        // y-=this.height/2

        ctx.translate((x + this.width / 2)*setting.SCALE, (y + this.height / 2)*setting.SCALE);
		ctx.rotate(this.angle);
		ctx.translate((-x - this.width / 2)*setting.SCALE,( -y - this.height / 2)*setting.SCALE);

        ctx.drawImage(
            this.img,
            this.sx,    this.sy,
            this.swidth,this.sheight,
            x*setting.SCALE,     y*setting.SCALE,
            this.width*setting.SCALE, this.height*setting.SCALE)

        ctx.restore();
    }

    collision(obj){
        return (this.x < obj.x + obj.width &&
            this.x + this.width > obj.x &&
            this.y < obj.y + obj.height &&
            this.y + this.height > obj.y) 
                 
    }

    outside(){
        return (
            this.x < -10 || this.y < -10 ||
            this.x + this.width>= canvas.width||
            this.y +this.height >= canvas.height )
    }

    distance(obj){
        return Math.sqrt((this.y-obj.y)**2+(this.x-obj.x)**2)
    }

}