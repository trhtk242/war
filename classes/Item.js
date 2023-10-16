import sprites from "../sprites.js";
import Entity from "./Entity.js";
import {player} from "../game.js";

export default class Item extends Entity{
    constructor(x,y,type){
        let sprite;
        if(type === 'bullet') sprite = sprites.bulletItem;
        else sprite = sprites.heartItem;

        super(x,y,30,30,sprite,0);

        this.type = type;
        this.id = Item.array.length;

    }

    delete(){
        let audio = new Audio('../sound/item.mp3');
        if(setting.sound) audio.play();
        audio.volume = 0.2;
        delete Item.array[this.id];
    }

    update(ctx){
        if(this.collision(player)){
            this.delete();
            if(this.type === 'bullet'){
                if(player.id == 'winner') player.cooldown = 100;
                else player.bullets += 10;
            }
            else if(this.type === 'heart')player.hp ++;
        }
        this.draw(ctx);
    }
}
Item.array = [];

Item.create = (type) => {
    let item = new Item(
        Math.randomBetween(0, canvas.width - 50),
        Math.randomBetween(0, canvas.height - 50), type)
    Item.array.push(item);
}