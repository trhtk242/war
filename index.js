import Building from "./classes/Building.js";
import Bullet from "./classes/Bullet.js";
import Player from "./classes/Player.js";
import createCity from "./city.js";
import Explosion from "./classes/Explosion.js";
import Car from "./classes/Car.js";
import Bazooka from "./classes/Bazooka.js";
const opening = document.getElementById('opening-screen')
const button = document.getElementById('btn-start')

button.onclick = () => {
    opening.hidden = true;
    canvas.hidden = false;
    setup();
}

function setup(){
    setting.lose = false;

    Player.player = new Player(0,0,name.player)
    Bazooka.array = [];
    Building.array = [];
    Bullet.array = [];
    Car.array = [];

    setting.frame = 0;
    createCity();
}
setup();

const loop = setInterval(()=>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if(setting.frame%100 == 0)
        Bazooka.create(
            Math.randomBetween(0,canvas.width-50),
            Math.randomBetween(0,canvas.height-50),Player.player)

    if(setting.frame%430 == 0)
        Car.create(
            Math.randomBetween(-100,0),
            Math.randomBetween(canvas.height-50, canvas.height,),Player.player)
    

    Building.array.forEach(building => {building.update(ctx);})
    Car.array.forEach(building => {building.update(ctx);})
    Bazooka.array.forEach(baz => {baz.update(ctx);})
    Bullet.array.forEach(bullet => {bullet.update(ctx);});
    Explosion.array.forEach(explosion => {explosion.update(ctx);});
    Target.array.forEach(target => {target.update(ctx);});

    Player.player.update(ctx,canvas);
    setting.frame++;

    ctx.font = "40px serif";
    ctx.fillText("⌚" + Math.floor(setting.frame/30), canvas.width - 150,170)
    
    if(setting.lose && canvas.hidden === false){
        if(!Building.array.find((build)=>{return !build.destroyed})) {
            Swal.fire({
                icon: 'success',
                title: '🏆ניצחון',
                text: " וואו שרדת הרבה זמן מאחורי קווי האויב " + Math.floor(setting.frame/30)+" שניות ",
            })
        }
        else {
            Swal.fire({
                icon: 'error',
                title: '😔הפסדת',
                text: 'אולי בפעם הבאה',
            })              
        }
        setup()
        opening.hidden = false;
        canvas.hidden = true;
        
    }

},setting.speedGame)