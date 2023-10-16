import sprites from "../sprites.js";
import Bullet from "./Bullet.js";
import Explosion from "./Explosion.js";

export default class Ball extends Bullet{
    constructor(x,y,ang,radius,type,spanlife) {
        super(x,y,ang,radius,radius,type,spanlife,sprites.ball);

        this.id = Ball.array.length;
        this.speed = 15;
        
    }

	goTheWayWereFacing() {
		let x = this.x;
		let y = this.y;
		this.x += -this.speed * Math.sin(this.angle);
		this.y += this.speed * Math.cos(this.angle);

		if (this.outside()) {
			this.x = x;
			this.y = y;
			this.angle += 0.5;
		}
	}

    delete (){
        // Explosion.create(this);
        // delete Ball.array[this.id];
    }

    update(ctx){
        super.update(ctx);

        // this.angle += 0.05;

        Bullet.array.forEach(bullet => {
            if(this.collision(bullet))
                bullet.delete();
        })
    }


}

Ball.array = [];
Ball.create = (owner,spanlife) => {
    let b = new Ball(
        owner.x + owner.width/2,
        owner.y + owner.height/2,
        owner.angle,40,owner.type,spanlife);
    Ball.array.push(b);
}