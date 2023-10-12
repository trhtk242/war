import Player from "./classes/Player.js";

document.addEventListener("keydown", keydown);
document.addEventListener("keyup", keydup);

function keydown(e) {
    if(e.code ==  "ArrowRight") Player.player.rotate = Player.player.rotateAmount;
    if(e.code ==  "ArrowLeft") Player.player.rotate = -Player.player.rotateAmount;
    if(e.code == 'Space') Player.player.shoot();
}

function keydup(e) {
    if(e.code ==  "ArrowRight") Player.player.rotate = 0
    if(e.code ==  "ArrowLeft") Player.player.rotate = 0
}