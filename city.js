import Building from "./classes/Building.js"
// map of 12x5
let cities = {
    abdul:[
        [4,0,0,1,0,0,2,3,2,0,0,0],
        [0,0,0,1,0,0,3,3,0,1,0,0],
        [0,3,0,1,0,0,0,0,0,4,0,0],
        [0,3,0,0,0,0,0,4,0,0,0,2],
        [0,0,0,0,0,1,0,1,0,1,0,0],
        [0,0,0,0,0,0,0,1,0,1,0,0],
    ],
    khalid :[
        [13,0,0,0,0,11,0,1,0,1,0,0],
        [0,0,0,0,0,0,0,0,14,0,0,3],
        [0,13,0,0,0,0,0,0,0,0,0,2],
        [0,0,0,0,0,0,0,0,0,3,4,0],
        [4,0,0,0,0,1,0,1,0,0,0,0],
        [12,0,2,3,0,0,2,3,12,0,0,0],
    ]
}

export default function createCity(){
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 12; j++) {
            const element = cities[name.enemy][i][j];
            if(element !== 0){
                if(name.enemy === 'khalid' && element > 10)
                    Building.create(j*100,i*100,element-10,true)
                
                else Building.create(j*100,i*100,element,false)
                
            }
        }
    }
    
    setting.theme.muted = false
    if(setting.sound)setting.theme.play();
    setting.theme.volume = 0.015;
}