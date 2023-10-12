//The first class,all classes are extended from it.
export default class Entity{
    constructor(x,y,width,height,sprite){
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
    }

    draw(ctx){
        ctx.save();
 
        ctx.drawImage(
            this.img,
            this.sx,    this.sy,
            this.swidth,this.sheight,
            this.x,     this.y,
            this.width, this.height)

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