import {player} from './game.js';
import Controller from './classes/Controller.js'

document.addEventListener("keydown", keydown);
document.addEventListener("keyup", keydup);

if(canvas.width < 900){
		
	setting.controllers[0] = new Controller(canvas.width - 70 * setting.SCALE, canvas.height - 70 * setting.SCALE, 40,'right');	
	setting.controllers[1] = new Controller(70 * setting.SCALE, canvas.height - 70 * setting.SCALE,40,'shoot');
	
	setting.controllers[2] = new Controller(canvas.width - 210 * setting.SCALE, canvas.height - 70 * setting.SCALE, 40,'left');
}

canvas.ontouchstart = (e) => {
	let x = e.touches[0].clientX;	
	let y = e.touches[0].clientY;

	setting.controllers.forEach(con => con.click(x,y))
}

canvas.ontouchend = (e) => {

	let x = e.changedTouches[0].clientX;	
	let y = e.changedTouches[0].clientY;

	setting.controllers.forEach(con => con.onstopclick(x,y))
}

function keydown(e) {
    if(e.code ==  "ArrowRight") player.rotate = player.rotateAmount;
    if(e.code ==  "ArrowLeft") player.rotate = -player.rotateAmount;
    if(e.code == 'Space') player.shoot();
}

function keydup(e) {
    if(e.code ==  "ArrowRight") player.rotate = 0
    if(e.code ==  "ArrowLeft") player.rotate = 0
}