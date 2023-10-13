
import Entity from "./Entity.js";
import sprites from "../sprites.js";

export default class Building extends Entity{
    constructor(x,y,type){
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
    }

    delete(){
        this.destroyed = true;
        this.img.src = '../img/destroyed.png';
    }

    update(ctx){
        this.draw(ctx);
    }
}

Building.array = [];

Building.create = (x,y,type) => { 
    let newBuild = new Building(x,y,type);
    Building.array.push(newBuild)
}