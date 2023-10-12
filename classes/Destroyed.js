import sprites from "../sprites"
import Building from "./Building"

export default class Destroyed extends Building{
    constructor(building) {
        super(building.x,building.y,building.type)
        this.sprite = sprites.destroyed;
    }
}
Destroyed.array = [];
Destroyed.create = building => {
    let destroyed = new Destroyed(building);
    Destroyed.array.push(destroyed);
}