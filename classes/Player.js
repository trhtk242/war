import Entity from "./Entity.js";
import sprites from "../sprites.js";
import Bullet from './Bullet.js';
import Explosion from "./Explosion.js";
import {player} from '../index.js';

export default class Player extends Entity {
	constructor(x, y, name) {
		if (name === 'noah') {
			super(x, y, 75, 75, sprites.noah,0)
			this.speed = 12
			this.bullets = 150;
			this.hp = 5;
			this.rotateAmount = 0.1
		} else if (name === 'saar') {
			super(x, y, 100, 100, sprites.saar,0)
			this.speed = 8;
			this.bullets = 40;
			this.rotateAmount = 0.05
			this.hp = 5;
		} else if (name === 'ido') {
			super(x, y, 100, 100, sprites.ido,0)
			this.speed = 8
			this.bullets = 40;
			this.rotateAmount = 0.2
			this.hp = 5;
		} else if (name === 'roi') {
			super(x, y, 100, 100, sprites.roi,0)
			this.speed = 10;
			this.bullets = 60;
			this.rotateAmount = 0.05
			this.hp = 6;
			this.safe = false;
		} else {
			super(x, y, 75, 75, sprites.cheater,0)
			this.speed = 10;
			this.bullets = 1;
			this.rotateAmount = 0.05
			this.hp = 1;
		}

		this.name = name;
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
		switch (this.name) {
			case 'ido':
				this.bullets--;
			case 'cheater':
				for (let i = -5; i < 5; i++) {
					Bullet.create(player,
						this.angle + ((Math.PI * 2) / 10) * i)
				}
				break;
			case 'roi':
				this.safe = !this.safe;
				if (this.bullets <= 0) this.safe = false;
				break;
			case 'noah':
				Bullet.create(player,this.angle + 0.2);
				Bullet.create(player,this.angle - 0.2);
				this.bullets--;
				break;
			default:
				Bullet.create(player);
				this.bullets--;
				break;
		}
	}

	update(ctx, canvas) {
		this.goTheWayWereFacing();

		ctx.save();

		ctx.font = "40px serif";
		for (let i = 0; i < this.hp; i++)
			ctx.fillText("❤️", canvas.width - 50 * i, 70)
		ctx.fillText("⚡" + Math.ceil(this.bullets), canvas.width - 70, 120)

		if (this.name == 'roi')
			if (this.safe) {
				ctx.fillText('אתה בטוח', canvas.width - 70, 30)
				this.bullets -= 1 / 33;
				if (this.bullets <= 0) this.safe = false;
			}

		this.angle += this.rotate;
		this.draw(ctx);
		ctx.restore();

	}

	die(ang) {
		if (this.name === 'roi' && this.safe) {
			Bullet.create(player, Math.PI + ang);
			return;
		} else {
			Explosion.create(this)
		}
		if (this.name != 'cheater') this.hp--;
		if (this.hp <= 0) setting.lose = true;

	}
}