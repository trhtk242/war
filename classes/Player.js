import Entity from "./Entity.js";
import sprites from "../sprites.js";
import Bullet from './Bullet.js';
import Ball from "./Ball.js";
import Explosion from "./Explosion.js";
import { player } from '../game.js';

export default class Player extends Entity {
	constructor(x, y, id) {
		switch (id) {
			case 'noah':
				super(x, y, 50, 80, sprites.noah, 0)
				this.speed = 10
				this.bullets = 150;
				this.rotateAmount = 0.2
				this.hp = 4;
				this.rotateAmount = 0.1;

				this.propeller = new Entity(x, y, 70, 70, sprites.propeller, 0)
				break;
			case 'saar':
				super(x, y, 100, 100, sprites.saar, 0)
				this.speed = 8;
				this.bullets = 80;
				this.rotateAmount = 0.05
				this.hp = 4;
				break;
			case 'ido':
				super(x, y, 100, 100, sprites.ido, 0)
				this.speed = 8
				this.bullets = 40;
				this.rotateAmount = 0.2
				this.hp = 4;
				break;
			case 'boaz':
				super(x, y, 100, 100, sprites.boaz, 0)
				this.speed = 10;
				this.bullets = 60;
				this.rotateAmount = 0.05
				this.hp = 5;
				this.safe = false;
				break;
			case 'yehoka':
				super(x, y, 100, 100, sprites.yehoka, 0);
				this.speed = 8;
				this.bullets = 80;
				this.rotateAmount = 0.2;
				this.hp = 4;
				break;
			case 'winner':
				super(x, y, 60, 75, sprites.winner, 0);
				this.speed = 12;
				this.bullets = 1;
				this.cooldown = 100;
				this.rotateAmount = 0.2;
				this.hp = 4;
				break;
			default:
				super(x, y, 75, 75, sprites.giora, 0)
				this.speed = 10;
				this.bullets = 1;
				this.rotateAmount = 0.05
				this.hp = 1;
				break;
		}

		this.id = id;
		this.rotate = 0;
		this.type = 'player'
	}

	goTheWayWereFacing() {
		let x = this.x;
		let y = this.y;
		this.x += -this.speed * Math.sin(this.angle);
		this.y += this.speed * Math.cos(this.angle);

		if (this.outside()) {
			if(this.id === 'yehoka'){
				if(this.x <= 0) this.x = canvas.width - this.width
				if(this.x >= canvas.width) this.x = 0;

				if(this.y <= 0) this.y = canvas.height - this.height
				if(this.y >= canvas.height) this.y = 0;
			}else{
				this.x = x;
				this.y = y;
				this.angle += 0.5;
			}
		}
	}

	shoot() {
		if (this.bullets <= 0) return;
		switch (this.id) {
			case 'ido':
				this.bullets--;
				for (let i = -5; i < 5; i++) {
					Bullet.create(player, 20,
						this.angle + ((Math.PI * 2) / 10) * i)
				}
				break;
			case 'giora':
				for (let i = -5; i < 5; i++) {
					Bullet.create(player, 200,
						this.angle + ((Math.PI * 2) / 10) * i)
				}
				break;
			case 'boaz':
				this.safe = !this.safe;
				if (this.bullets <= 0) this.safe = false;
				break;
			case 'noah':
				Bullet.create(player, 100, this.angle + Math.PI);
				Bullet.create(player, 100, this.angle);
				this.bullets--;
				break;
			case 'yehoka':
				this.bullets--;
				Ball.create(player,100)
				break;
			case 'winner':
				if (this.cooldown <= 0) return;
				Bullet.create(player, 35, this.angle - 0.2);
				Bullet.create(player, 35, this.angle + 0.2);
				Bullet.create(player, 35, this.angle);
				this.cooldown -= 10;
				break;
			default:
				Bullet.create(player, 40);
				this.bullets--;
				break;
		}
	}

    barcooldown(){
        let x = canvas.width / 2  - 20  * setting.SCALE
        let y = 10 * setting.SCALE

        ctx.save();

        ctx.fillStyle = 'yellow'
        let width = 300*(this.cooldown/100)* setting.SCALE
        if(width < 0){
            width = 0
        }
        ctx.fillRect(x-150* setting.SCALE,y,width,20* setting.SCALE)

		ctx.lineWidth = 5;
        ctx.strokeStyle = 'black'
        ctx.strokeRect(x-150* setting.SCALE,y,300* setting.SCALE,20* setting.SCALE)

        ctx.restore();
    }

	update(ctx, canvas) {
		this.goTheWayWereFacing();

		ctx.save();

		ctx.font = `${30 * setting.SCALE}px serif`;
			for (let i = 0; i < this.hp; i++)
				ctx.fillText("❤️", canvas.width - (50 * i) * setting.SCALE, 30 * setting.SCALE)

		if(this.id == 'winner'){
			this.barcooldown();
			if(this.cooldown < 100) this.cooldown+=0.5;
		}else{
			ctx.fillText("🔥" + Math.ceil(this.bullets), canvas.width / 2  - 20  * setting.SCALE, 30 * setting.SCALE)
		
		}

		if (this.id == 'boaz') {
			if (this.safe) {
				ctx.fillText('אתה בטוח', canvas.width - 70 * setting.SCALE, 70 * setting.SCALE)
				this.bullets -= 1 / 33;
				if (this.bullets <= 0) this.safe = false;
				ctx.globalAlpha = 0.6;
			}
		} else if (this.id == 'noah') {
			this.propeller.angle += 0.2;
			this.propeller.x = -this.propeller.width / 2 + this.x + this.width / 2;
			this.propeller.y = -this.propeller.height / 2 + this.y + this.height / 2;
			this.propeller.draw(ctx);
		} else if(this.id == 'yehoka'){

		}

		this.angle += this.rotate;
		this.draw(ctx);


		ctx.restore();

	}

	die(ang) {
		if (this.id === 'boaz' && this.safe) {
			Bullet.create(player, 100, Math.PI + ang);
			return;
		} else {
			Explosion.create(this)
		}
		if (this.id != 'giora') this.hp--;
		if (this.hp <= 0) setting.lose = true;

	}
}