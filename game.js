import Building from "./classes/Building.js";
import Bullet from "./classes/Bullet.js";
import Player from "./classes/Player.js";
import createCity from "./city.js";
import Explosion from "./classes/Explosion.js";
import Car from "./classes/Car.js";
import Bazooka from "./classes/Bazooka.js";
import Item from "./classes/Item.js";
import Ball from "./classes/Ball.js";
import Cannon from "./classes/Cannon.js";
import Ship from "./classes/Ship.js";

let player;

function setup() {
	setting.lose = false;
	setting.score = 0;
	setting.hard = 0;

	player = new Player(0, 0, setting.player)
	Bazooka.array = [];
	Building.array = [];
	Bullet.array = [];
	Cannon.array = [];
	Ball.array = [];
	Item.array = [];
	Car.deleteAll();
	Ship.deleteAll();
	
	setting.frame = 0;
	createCity();
}
setup();

function loop(){
	// if ((innerWidth - 20) != canvas.width) ctx.filter = "blur(4px)";
	if (canvas.hidden) return;

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	if (setting.frame % 70 == 0 && setting.enemy == 'abdul')
		Bazooka.create(
			Math.randomBetween(0, canvas.width - 200),
			Math.randomBetween(0, canvas.height - 200), player)

	if (setting.frame % 300 == 0 && setting.enemy == 'aisha'){
		Ship.create(
			Math.randomBetween(0, canvas.width - 200),
			Math.randomBetween(0, canvas.height - 200),2, player)
		Ship.create(
			Math.randomBetween(0, canvas.width - 200),
			Math.randomBetween(0, canvas.height - 200),2, player)
		
	}

			
	if (setting.frame % 200 == 0 && setting.enemy == 'aisha')
		Ship.create(
			Math.randomBetween(0, canvas.width - 200),
			Math.randomBetween(0, canvas.height - 200),1, player)

	if (setting.frame % 350 == 0 && setting.enemy != 'aisha')
		Car.create(
			Math.randomBetween(-100, 0),
			Math.randomBetween(canvas.height - 50, canvas.height,), player)

	if (setting.frame % 500 == 0)
		Item.create((Math.randomBetween(0, 1) === 0) ? 'heart' : 'bullet')

	Building.array.forEach(building => { building.update(ctx); })
	Item.array.forEach(it => { it.update(ctx); });
	Ball.array.forEach(bullet => { bullet.update(ctx); });
	Bullet.array.forEach(bullet => { bullet.update(ctx); });
	Ship.array.forEach(ship => { ship.update(ctx); })
	Cannon.array.forEach(can => { can.update(ctx); })
	Car.array.forEach(building => { building.update(ctx); })
	Bazooka.array.forEach(baz => { baz.update(ctx); })
	Explosion.array.forEach(explosion => { explosion.update(ctx); });

	player.update(ctx, canvas);
	setting.frame++;

	ctx.font = `bold ${30 * setting.SCALE}px serif`;
	ctx.fillStyle = "#00008B";
	ctx.fillText(" הניקוד שלך: " + setting.score, 250 * setting.SCALE, 30 * setting.SCALE)

	setting.controllers.forEach(con => con.draw(ctx))

	if (setting.lose) {
		setting.theme.pause();
		setting.theme.currentTime = 0;

		Swal.fire({
			icon: 'success',
			title: 'כל הכבוד',
			text: "השגת " + setting.score + ' נקודות',
			allowEnterKey: false,
			confirmButtonText: 'סבבה'
		})


		setup()
		setting.theme.pause();
		setting.theme.currentTime = 0;
		document.getElementById('opening-screen').hidden = false;
		canvas.hidden = true;
	}
}


export {loop,setup,player}