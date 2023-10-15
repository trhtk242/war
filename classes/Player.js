import Entity from "./Entity.js";
import sprites from "../sprites.js";
import Bullet from './Bullet.js';
import Explosion from "./Explosion.js";
import {player} from '../index.js';

export default class Player extends Entity {
	constructor(x, y, id) {
		switch (id) {
			case 'noah':
				super(x, y, 50, 80, sprites.noah,0)
				this.speed = 11
				this.bullets = 150;
				this.rotateAmount = 0.2
				this.hp = 4;
				this.rotateAmount = 0.1;
	
				this.propeller = new Entity(x,y,70,70,sprites.propeller,0) 	
				break;
			case 'saar':
				super(x, y, 100, 100, sprites.saar,0)
				this.speed = 8;
				this.bullets = 80;
				this.rotateAmount = 0.05
				this.hp = 4;
				break;
			case 'ido':
				super(x, y, 100, 100, sprites.ido,0)
				this.speed = 8
				this.bullets = 40;
				this.rotateAmount = 0.2
				this.hp = 4;
				break;
			case 'roi':
				super(x, y, 100, 100, sprites.roi,0)
				this.speed = 10;
				this.bullets = 60;
				this.rotateAmount = 0.05
				this.hp = 5;
				this.safe = false;
			break;
			case 'yedidya':
				super(x,y,100,100,sprites.yedidya,0);
				this.speed = 10;
				this.bullets = 40;
				this.rotateAmount = 0.05;
				this.hp = 3;
				break;
			default:
				super(x, y, 75, 75, sprites.giora,0)
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
			this.x = x;
			this.y = y;
			this.angle += 0.5;
		}
	}

	shoot() {
		if (this.bullets <= 0) return;
		switch (this.id) {
			case 'ido':
				this.bullets--;
				for (let i = -5; i < 5; i++) {
					Bullet.create(player,20,
						this.angle + ((Math.PI * 2) / 10) * i)
				}
				break;
			case 'giora':
				for (let i = -5; i < 5; i++) {
					Bullet.create(player,200,
						this.angle + ((Math.PI * 2) / 10) * i)
				}
				break;
			case 'roi':
				this.safe = !this.safe;
				if (this.bullets <= 0) this.safe = false;
				break;
			case 'noah':
				Bullet.create(player,100,this.angle + 0.2);
				Bullet.create(player,100,this.angle - 0.2);
				this.bullets--;
				break;
			default:
				Bullet.create(player,20);
				this.bullets--;
				break;
		}
	}

	update(ctx, canvas) {
		this.goTheWayWereFacing();

		ctx.save();

		ctx.font = `${40 * setting.SCALE}px serif`;
		for (let i = 0; i < this.hp; i++)
		ctx.fillText("❤️", canvas.width - (50 * i) * setting.SCALE, 70 * setting.SCALE)
		ctx.fillText("🔥" + Math.ceil(this.bullets), canvas.width - 70 * setting.SCALE, 120 * setting.SCALE)

		if (this.id == 'roi') {
			if (this.safe) {
				ctx.globalAlpha = 0.6;
				ctx.fillText('אתה בטוח', canvas.width - 70 * setting.SCALE, 30 * setting.SCALE)
				this.bullets -= 1 / 33;
				if (this.bullets <= 0) this.safe = false;
			}
		}else if(this.id == 'noah'){
			this.propeller.angle += 0.2;
			this.propeller.x = -this.propeller.width /2 + this.x + this.width / 2;
			this.propeller.y = -this.propeller.height /2 + this.y + this.height / 2;
			this.propeller.draw(ctx);
		}

		this.angle += this.rotate;
		this.draw(ctx);
		ctx.restore();

	}

	die(ang) {
		if (this.id === 'roi' && this.safe) {
			Bullet.create(player,100, Math.PI + ang);
			return;
		} else {
			Explosion.create(this)
		}
		if (this.id != 'giora') this.hp--;
		if (this.hp <= 0) setting.lose = true;

	}
}