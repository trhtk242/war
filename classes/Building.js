
import Entity from "./Entity.js";
import sprites from "../sprites.js";
import Cannon from "./Cannon.js";
import { player } from "../game.js";

export default class Building extends Entity{
    constructor(x,y,type,cannon){
        let sprite = sprites['building'+type];
        let size = {
            w:150,
            h:75
        }
        switch (type) {
            case 2:
                size = {w:75,h:75}
                break;
            case 3:
                size = {w:75,h:75}
                break;
            case 4:
                size = {w:300,h:75}
                break;
            default:
                break;
        }

        super(x,y,size.w,size.h,sprite,0);

        this.destroyed = false;
        this.id = Building.array.length;

        this.hasCannon = cannon
        if(this.hasCannon) this.cannon = Cannon.create(this,player)
        else this.cannon = {delete:()=>{}}
    }

    delete(){
        setting.score += 2;
        this.destroyed = true;
        this.img.src = '../img/destroyed.png';
        
        if(setting.enemy !== 'khalid') return;
        this.cannon.delete();

        setTimeout(()=>{
            this.img.src = '../img/building.png';
            this.destroyed = false;

            this.hasCannon = !this.hasCannon;
            if(this.hasCannon) this.cannon = Cannon.create(this,player)
        },5000)
    }

    update(ctx){
        this.draw(ctx);
    }
}

Building.array = [];

Building.create = (x,y,type,cannon) => { 
    let newBuild = new Building(x,y,type,cannon);
    Building.array.push(newBuild);
}