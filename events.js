import {player} from './index.js';

document.addEventListener("keydown", keydown);
document.addEventListener("keyup", keydup);

function keydown(e) {
    if(e.code ==  "ArrowRight") player.rotate = player.rotateAmount;
    if(e.code ==  "ArrowLeft") player.rotate = -player.rotateAmount;
    if(e.code == 'Space') player.shoot();
}

function keydup(e) {
    if(e.code ==  "ArrowRight") player.rotate = 0
    if(e.code ==  "ArrowLeft") player.rotate = 0
}