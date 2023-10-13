import Building from "./classes/Building.js"
// map of 12x5
let city = [
    [4,0,0,1,0,0,2,3,2,0,0,0],
    [0,0,0,1,0,0,3,3,0,1,0,0],
    [0,3,0,1,0,0,0,0,0,4,0,0],
    [0,3,0,0,0,0,0,4,0,0,0,2],
    [0,0,0,0,0,1,0,1,0,1,0,0],
    [0,0,0,0,0,0,0,1,0,1,0,0],
]

export default function createCity(){
    for (let i = 0; i < city.length; i++) {
        for (let j = 0; j < 12; j++) {
            const element = city[i][j];
            if(element !== 0)
                Building.create(j*100,i*100,element)
        }
    }

    setting.theme.play();
    setting.theme.volume = 0.015;
}